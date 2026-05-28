import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbWeb from "@/lib/db-web";
import sharp from "sharp";
import { mkdir } from "fs/promises";
import path from "path";
import { RowDataPacket } from "mysql2";

interface SessionUser {
    name: string;
    email: string;
}

interface ErrorResponse {
    [key: string]: string;
}

interface EventRow extends RowDataPacket {
    id: number;
    title_ind: string;
    title_eng: string;
}

interface CountRow extends RowDataPacket {
    total: number;
}

/* ======================================================
    GET DATA
====================================================== */
export async function GET(request: NextRequest) {
    const connection = await dbWeb.getConnection();

    try {
        const searchParams = request.nextUrl.searchParams;
        const page = Number(searchParams.get("page") || 1);
        const limit = Number(searchParams.get("limit") || 10);
        const search = searchParams.get("search") || "";
        const offset = (page - 1) * limit;
        const sortBy = searchParams.get("sortBy") || "id";
        const sortOrder = searchParams.get("sortOrder") || "DESC";

        const [rows] = await connection.query<EventRow[]>(
            `SELECT id, title_ind, title_eng
            FROM event
            WHERE title_ind LIKE ? OR title_eng LIKE ?
            ORDER BY ${sortBy} ${sortOrder}
            LIMIT ? OFFSET ?`,
            [`%${search}%`, `%${search}%`, limit, offset]
        );

        const [totalRows] = await connection.query<CountRow[]>(
            `SELECT COUNT(*) as total
            FROM event
            WHERE title_ind LIKE ? OR title_eng LIKE ?`,
            [`%${search}%`, `%${search}%`]
        );

        const total = totalRows[0].total;

        return NextResponse.json({
            success: true,
            data: rows,
            pagination: { total, totalPages: Math.ceil(total / limit) },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch data" },
            { status: 500 }
        );
    } finally {
        connection.release();
    }
}

export async function POST(request: NextRequest) {
    const connection = await dbWeb.getConnection();

    try {
        const cookieStore = await cookies();
        const session = cookieStore.get(
            process.env.COOKIE_NAME || "admin_session_tembi"
        );

        let createdBy = "system";
        if (session?.value) {
            const user = JSON.parse(session.value) as SessionUser;
            createdBy = user.name;
        }

        const formData = await request.formData();
        const title_ind = formData.get("title_ind") as string;
        const title_eng = formData.get("title_eng") as string;
        const description_ind = formData.get("description_ind") as string;
        const description_eng = formData.get("description_eng") as string;
        const slug = formData.get("slug") as string;
        const thumbnailFile = formData.get("thumbnail") as File;
        const hosted_by = formData.get("hosted_by") as string;
        const date_event = formData.get("date_event") as string;
        const time_event = formData.get("time_event") as string;

        console.log("📝 [CREATE EVENT] Data received:");
        console.log("- Title IND:", title_ind?.substring(0, 50));
        console.log("- Title ENG:", title_eng?.substring(0, 50));
        console.log("- Description IND length:", description_ind?.length);
        console.log("- Description ENG length:", description_eng?.length);
        console.log("- Has base64 images in IND:", description_ind?.includes("data:image"));
        console.log("- Has base64 images in ENG:", description_eng?.includes("data:image"));

        const errors: ErrorResponse = {};
        if (!title_ind?.trim()) errors.title_ind = "Judul Indonesia wajib diisi";
        if (!title_eng?.trim()) errors.title_eng = "Judul English wajib diisi";
        if (!description_ind?.trim()) errors.description_ind = "Deskripsi Indonesia wajib diisi";
        if (!description_eng?.trim()) errors.description_eng = "Deskripsi English wajib diisi";
        if (!slug?.trim()) errors.slug = "Slug wajib diisi";
        if (!thumbnailFile) errors.thumbnail = "Thumbnail wajib diupload";
        if (!hosted_by?.trim()) errors.hosted_by = "Hosted by wajib diisi";
        if (!date_event?.trim()) errors.date_event = "Tanggal wajib diisi";
        if (!time_event?.trim()) errors.time_event = "Waktu wajib diisi";

        if (Object.keys(errors).length > 0) {
            return NextResponse.json(
                { success: false, message: "Validasi gagal", errors },
                { status: 400 }
            );
        }

        const descIndSize = new Blob([description_ind]).size;
        const descEngSize = new Blob([description_eng]).size;

        console.log("📊 [SIZE CHECK]:");
        console.log("- Description IND size:", (descIndSize / 1024).toFixed(2), "KB");
        console.log("- Description ENG size:", (descEngSize / 1024).toFixed(2), "KB");
        console.log("- Total size:", ((descIndSize + descEngSize) / 1024).toFixed(2), "KB");

        if (descIndSize > 5 * 1024 * 1024) console.warn("⚠️ Description IND sangat besar!");
        if (descEngSize > 5 * 1024 * 1024) console.warn("⚠️ Description ENG sangat besar!");

        const bytes = await thumbnailFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `event-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.webp`;
        const uploadDir = path.join(process.cwd(), "public/images/upload/event");
        await mkdir(uploadDir, { recursive: true });
        await sharp(buffer).webp({ quality: 80 }).toFile(path.join(uploadDir, filename));

        console.log("[THUMBNAIL] Uploaded:", filename);

        await connection.beginTransaction();

        const [result] = await connection.query(
            `INSERT INTO event (
                title_ind, title_eng,
                description_ind, description_eng,
                thumbnail, slug, created_by, created_at,
                hosted_by, date_event, time_event
            ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?)`,
            [title_ind, title_eng, description_ind, description_eng, `/images/upload/event/${filename}`, slug, createdBy, hosted_by, date_event, time_event]
        );

        await connection.commit();

        const eventId = (result as unknown as { insertId: number }).insertId;

        console.log("[SUCCESS] Event created with ID:", eventId);

        return NextResponse.json(
            {
                success: true,
                message: "Event berhasil ditambahkan",
                data: {
                    id: eventId,
                    hasImagesInDescription: description_ind?.includes("data:image") || description_eng?.includes("data:image"),
                },
            },
            { status: 201 }
        );
    } catch (error) {
        await connection.rollback();
        console.error("[CREATE_EVENT_ERROR]", error);

        if (error instanceof Error) {
            if (error.message.includes("Packet too large")) {
                return NextResponse.json(
                    { success: false, message: "Data terlalu besar. Kurangi jumlah atau ukuran gambar." },
                    { status: 413 }
                );
            }
            if (error.message.includes("Data too long")) {
                return NextResponse.json(
                    { success: false, message: "Deskripsi terlalu panjang. Gunakan LONGTEXT untuk kolom database." },
                    { status: 413 }
                );
            }
        }

        return NextResponse.json(
            { success: false, message: "Terjadi kesalahan server" },
            { status: 500 }
        );
    } finally {
        connection.release();
    }
}