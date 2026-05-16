import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbWeb from "@/lib/db-web";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import sharp from "sharp";

interface SessionUser {
    name: string;
    email: string;
}

interface FoodPackagePrimary {
    name_ind: string;
    name_eng: string;
    id?: number;
}

interface ErrorResponse {
    [key: string]: string;
}

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const packageId = Number(id);

    try {
        // ✅ Fetch food_packages
        const [packages] = await dbWeb.query(
            "SELECT * FROM food_packages WHERE id = ?",
            [packageId]
        );

        if (!Array.isArray(packages) || packages.length === 0) {
            return NextResponse.json(
                { success: false, message: "Data tidak ditemukan" },
                { status: 404 }
            );
        }

        // ✅ Fetch food_packages_primary
        const [primaryItems] = await dbWeb.query(
            "SELECT id, name_ind, name_eng FROM food_packages_primary WHERE food_packages_id = ?",
            [packageId]
        );

        return NextResponse.json({
            success: true,
            data: {
                ...(packages[0] as Record<string, unknown>),
                food_packages_primary: primaryItems || [],
            },
        });
    } catch (error) {
        console.error("[GET_FOOD_PACKAGE_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Gagal mengambil data" },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const packageId = Number(id);
    const connection = await dbWeb.getConnection();

    try {
        const cookieStore = await cookies();
        const session = cookieStore.get(
            process.env.COOKIE_NAME || "admin_session_tembi"
        );

        let updatedBy = "system";
        if (session?.value) {
            const user = JSON.parse(session.value) as SessionUser;
            updatedBy = user.name;
        }

        const formData = await req.formData();

        // Extract form data
        const type_catering_service_id = formData.get("type_catering_service_id") as string;
        const name_ind = formData.get("name_ind") as string;
        const name_eng = formData.get("name_eng") as string;
        const description_ind = formData.get("description_ind") as string;
        const description_eng = formData.get("description_eng") as string;
        const minimum_pax = parseInt(formData.get("minimum_pax") as string);
        const hours_service_min = parseInt(formData.get("hours_service_min") as string);
        const hours_service_max = parseInt(formData.get("hours_service_max") as string);
        const title_menu_ind = formData.get("title_menu_ind") as string;
        const title_menu_eng = formData.get("title_menu_eng") as string;
        const subtitle_menu_ind = formData.get("subtitle_menu_ind") as string;
        const subtitle_menu_eng = formData.get("subtitle_menu_eng") as string;
        const description_menu_ind = formData.get("description_menu_ind") as string;
        const description_menu_eng = formData.get("description_menu_eng") as string;
        const description_card_ind = formData.get("description_card_ind") as string;
        const description_card_eng = formData.get("description_card_eng") as string;
        const slug = formData.get("slug") as string;

        const imageFile = formData.get("image") as File | null;
        const foodPackagesPrimaryJson = formData.get("food_packages_primary") as string;
        const deletedPrimaryIdsJson = formData.get("deleted_primary_ids") as string;

        const foodPackagesPrimary = JSON.parse(foodPackagesPrimaryJson) as FoodPackagePrimary[];
        const deletedPrimaryIds = JSON.parse(deletedPrimaryIdsJson) as number[];

        // Validation
        const errors: ErrorResponse = {};

        if (!name_ind?.trim()) errors.name_ind = "Nama Indonesia wajib diisi";
        if (!name_eng?.trim()) errors.name_eng = "Nama English wajib diisi";
        if (!description_ind?.trim()) errors.description_ind = "Deskripsi Indonesia wajib diisi";
        if (!description_eng?.trim()) errors.description_eng = "Deskripsi English wajib diisi";
        if (!subtitle_menu_ind?.trim()) errors.subtitle_menu_ind = "Subtitle menu Indonesia wajib diisi";
        if (!subtitle_menu_eng?.trim()) errors.subtitle_menu_eng = "Subtitle menu English wajib diisi";

        if (Object.keys(errors).length > 0) {
            connection.release();
            return NextResponse.json(
                { success: false, message: "Validasi gagal", errors },
                { status: 400 }
            );
        }

        // ✅ Process new image if uploaded
        let dbPath: string | null = null;

        if (imageFile) {
            const buffer = await imageFile.arrayBuffer();

            // ✅ Convert ke WebP pakai sharp
            const webpBuffer = await sharp(Buffer.from(buffer))
                .webp({ quality: 80 })
                .toBuffer();

            // ✅ Filename dengan slug
            const filename = `${slug}-${Date.now()}.webp`;
            const filepath = join(process.cwd(), `public/images/upload/food/${filename}`);
            dbPath = `/images/upload/food/${filename}`;

            await mkdir(join(process.cwd(), "public/images/upload/food"), { recursive: true });
            await writeFile(filepath, webpBuffer);
        }

        await connection.beginTransaction();

        try {
            // ✅ Build UPDATE query dinamis
            let updateQuery = `
                UPDATE food_packages SET
                    type_catering_service_id = ?, name_ind = ?, name_eng = ?,
                    description_ind = ?, description_eng = ?, minimum_pax = ?,
                    hours_service_min = ?, hours_service_max = ?, title_menu_ind = ?,
                    title_menu_eng = ?, subtitle_menu_ind = ?, subtitle_menu_eng = ?,
                    description_menu_ind = ?, description_menu_eng = ?,
                    description_card_ind = ?, description_card_eng = ?, slug = ?
            `;

            const updateParams: unknown[] = [
                parseInt(type_catering_service_id),
                name_ind,
                name_eng,
                description_ind,
                description_eng,
                minimum_pax,
                hours_service_min,
                hours_service_max,
                title_menu_ind,
                title_menu_eng,
                subtitle_menu_ind,
                subtitle_menu_eng,
                description_menu_ind,
                description_menu_eng,
                description_card_ind,
                description_card_eng,
                slug,
            ];

            // ✅ Add image to UPDATE if new image uploaded
            if (dbPath) {
                updateQuery += `, image = ?`;
                updateParams.push(dbPath);
            }

            updateQuery += `, updated_by = ?, updated_at = NOW() WHERE id = ?`;
            updateParams.push(updatedBy, packageId);

            await connection.query(updateQuery, updateParams);

            // ✅ Delete removed primary items
            if (deletedPrimaryIds.length > 0) {
                await connection.query(
                    `DELETE FROM food_packages_primary WHERE id IN (${deletedPrimaryIds.map(() => "?").join(",")}) AND food_packages_id = ?`,
                    [...deletedPrimaryIds, packageId]
                );
            }

            // ✅ Insert new primary items (those without id)
            for (const primary of foodPackagesPrimary) {
                if (!primary.id) {
                    await connection.query(
                        `
                        INSERT INTO food_packages_primary (food_packages_id, name_ind, name_eng, created_by, created_at)
                        VALUES (?, ?, ?, ?, NOW())
                        `,
                        [packageId, primary.name_ind, primary.name_eng, updatedBy]
                    );
                }
            }

            await connection.commit();
            connection.release();

            return NextResponse.json({
                success: true,
                message: "Food package berhasil diperbarui",
                data: { id: packageId },
            });
        } catch (transactionError) {
            await connection.rollback();
            connection.release();
            throw transactionError;
        }
    } catch (error) {
        console.error("[UPDATE_FOOD_PACKAGE_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Terjadi kesalahan server" },
            { status: 500 }
        );
    }
}