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
        // ✅ Fetch banner
        const [banner] = await dbWeb.query(
            "SELECT * FROM room_page_meta WHERE id = ?",
            [packageId]
        );

        if (!Array.isArray(banner) || banner.length === 0) {
            return NextResponse.json(
                { success: false, message: "Data tidak ditemukan" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: {
                ...(banner[0] as Record<string, unknown>),
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
        const title_ind = formData.get("title_ind") as string;
        const title_eng = formData.get("title_eng") as string;
        const description_ind = formData.get("description_ind") as string;
        const description_eng = formData.get("description_eng") as string;

        const imageFile = formData.get("image") as File | null;

        // Validation
        const errors: ErrorResponse = {};

        if (!title_ind?.trim()) errors.name_ind = "Title Indonesia wajib diisi";
        if (!title_eng?.trim()) errors.name_eng = "Title English wajib diisi";
        if (!description_ind?.trim()) errors.description_ind = "Deskripsi Indonesia wajib diisi";
        if (!description_eng?.trim()) errors.description_eng = "Deskripsi English wajib diisi";

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
            const filename = `banner-${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 8)}.webp`;
            const filepath = join(process.cwd(), `public/images/upload/banner/${filename}`);
            dbPath = `/images/upload/banner/${filename}`;

            await mkdir(join(process.cwd(), "public/images/upload/banner"), { recursive: true });
            await writeFile(filepath, webpBuffer);
        }

        await connection.beginTransaction();

        try {
            // ✅ Build UPDATE query dinamis
            let updateQuery = `
                UPDATE room_page_meta SET
                    title_ind = ?, title_eng = ?,
                    description_ind = ?, description_eng = ?
            `;

            const updateParams: unknown[] = [
                title_ind,
                title_eng,
                description_ind,
                description_eng
            ];

            // ✅ Add image to UPDATE if new image uploaded
            if (dbPath) {
                updateQuery += `, image = ?`;
                updateParams.push(dbPath);
            }

            updateQuery += `, updated_by = ?, updated_at = NOW() WHERE id = ?`;
            updateParams.push(updatedBy, packageId);

            await connection.query(updateQuery, updateParams);


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