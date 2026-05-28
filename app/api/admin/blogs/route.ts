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

interface BlogsRow extends RowDataPacket {
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

        const [rows] = await connection.query<BlogsRow[]>(
            `SELECT id, title_ind, title_eng
            FROM blogs
            WHERE title_ind LIKE ? OR title_eng LIKE ?
            ORDER BY ${sortBy} ${sortOrder}
            LIMIT ? OFFSET ?`,
            [`%${search}%`, `%${search}%`, limit, offset]
        );

        const [totalRows] = await connection.query<CountRow[]>(
            `SELECT COUNT(*) as total
            FROM blogs
            WHERE title_ind LIKE ? OR title_eng LIKE ?`,
            [`%${search}%`, `%${search}%`]
        );

        const total = totalRows[0].total;
        const totalPages = Math.ceil(total / limit);

        return NextResponse.json({
            success: true,
            data: rows,
            pagination: { total, totalPages },
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

        const errors: ErrorResponse = {};
        if (!title_ind?.trim()) errors.title_ind = "Judul Indonesia wajib diisi";
        if (!title_eng?.trim()) errors.title_eng = "Judul English wajib diisi";
        if (!description_ind?.trim()) errors.description_ind = "Deskripsi Indonesia wajib diisi";
        if (!description_eng?.trim()) errors.description_eng = "Deskripsi English wajib diisi";
        if (!slug?.trim()) errors.slug = "Slug wajib diisi";
        if (!thumbnailFile) errors.thumbnail = "Thumbnail wajib diupload";

        if (Object.keys(errors).length > 0) {
            return NextResponse.json(
                { success: false, message: "Validasi gagal", errors },
                { status: 400 }
            );
        }

        const bytes = await thumbnailFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `blog-${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 8)}.webp`;
        const uploadDir = path.join(process.cwd(), "public/images/upload/blogs");
        await mkdir(uploadDir, { recursive: true });
        await sharp(buffer).webp({ quality: 80 }).toFile(path.join(uploadDir, filename));

        await connection.beginTransaction();

        const [result] = await connection.query(
            `INSERT INTO blogs (title_ind, title_eng, description_ind, description_eng, thumbnail, slug, created_by, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
            [title_ind, title_eng, description_ind, description_eng, `/images/upload/blogs/${filename}`, slug, createdBy]
        );

        await connection.commit();

        const blogId = (result as unknown as { insertId: number }).insertId;

        return NextResponse.json(
            {
                success: true,
                message: "Blog berhasil ditambahkan",
                data: { id: blogId },
            },
            { status: 201 }
        );
    } catch (error) {
        await connection.rollback();
        console.error("[CREATE_BLOG_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Terjadi kesalahan server" },
            { status: 500 }
        );
    } finally {
        connection.release();
    }
}