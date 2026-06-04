import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbWeb from "@/lib/db-web";
import { writeFile, mkdir, unlink } from "fs/promises";
import { join } from "path";
import path from "path";
import fs from "fs";
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
interface RouteContext {
    params: Promise<{ id: string }>;
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
        const description_menu_highlight_ind = formData.get("description_menu_highlight_ind") as string;
        const description_menu_highlight_eng = formData.get("description_menu_highlight_eng") as string;

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
            // Ambil image lama dari DB lalu hapus
            const [existingRows] = await connection.query(
                `SELECT image FROM food_packages WHERE id = ?`,
                [packageId]
            );
            const existing = existingRows as any[];
            if (existing.length > 0 && existing[0].image) {
                const oldImagePath = join(process.cwd(), "public", existing[0].image);
                try {
                    await unlink(oldImagePath);
                } catch {
                    // File tidak ada, skip saja
                }
            }

            const buffer = await imageFile.arrayBuffer();
            const webpBuffer = await sharp(Buffer.from(buffer))
                .webp({ quality: 80 })
                .toBuffer();

            const filename = `catering-${Date.now()}-${Math.random()
                .toString(36)
                .substring(2, 8)}.webp`;
            const filepath = join(process.cwd(), `public/images/upload/catering/${filename}`);
            dbPath = `/images/upload/catering/${filename}`;

            await mkdir(join(process.cwd(), "public/images/upload/catering"), { recursive: true });
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
                    description_card_ind = ?, description_card_eng = ?, slug = ?, 
                    description_menu_highlight_ind = ?, description_menu_highlight_eng = ?
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
                description_menu_highlight_ind,
                description_menu_highlight_eng
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

export async function DELETE(request: NextRequest, context: RouteContext) {
    const connection = await dbWeb.getConnection();

    try {
        const cookieStore = await cookies();
        const session = cookieStore.get(
            process.env.COOKIE_NAME || "admin_session_tembi"
        );

        if (!session?.value) {
            connection.release();
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { id } = await context.params;

        if (!id) {
            connection.release();
            return NextResponse.json(
                { success: false, message: "ID wajib diisi" },
                { status: 400 }
            );
        }

        // Ambil data image sebelum delete
        const [rows] = await connection.query(
            `SELECT image FROM food_packages WHERE id = ?`,
            [id]
        );

        const data = rows as any[];

        if (data.length === 0) {
            connection.release();
            return NextResponse.json(
                { success: false, message: "Data tidak ditemukan" },
                { status: 404 }
            );
        }

        const imagePath = data[0].image; // contoh: /images/upload/catering/catering-xxx.webp

        await connection.beginTransaction();

        try {
            // Delete food_packages_primary dulu (foreign key)
            await connection.query(
                `DELETE FROM food_packages_primary WHERE food_packages_id = ?`,
                [id]
            );

            // Delete food_packages
            await connection.query(
                `DELETE FROM food_packages WHERE id = ?`,
                [id]
            );

            await connection.commit();
            connection.release();

            // Hapus file image setelah transaksi berhasil
            if (imagePath) {
                const fullPath = path.join(process.cwd(), "public", imagePath);
                if (fs.existsSync(fullPath)) {
                    fs.unlinkSync(fullPath);
                }
            }

            return NextResponse.json({
                success: true,
                message: "Food package berhasil dihapus",
            });
        } catch (transactionError) {
            await connection.rollback();
            connection.release();
            throw transactionError;
        }
    } catch (error) {
        console.log(error);
        console.error("[DELETE_FOOD_PACKAGE_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Terjadi kesalahan server" },
            { status: 500 }
        );
    }
}