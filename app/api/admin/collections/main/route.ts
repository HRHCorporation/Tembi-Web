import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { cookies } from "next/headers";
import { RowDataPacket } from "mysql2";
import sharp from "sharp";
import { mkdir } from "fs/promises";
import path from "path";

interface SessionUser {
    name: string;
    email: string;
}

interface ErrorResponse {
    [key: string]: string;
}

// ← tipe untuk data fasilitas
interface CollectionRow extends RowDataPacket {
    id: number;
    name_ind: string;
    name_eng: string;
    mstr_collection_name: string;
}

interface CountRow extends RowDataPacket {
    total: number;
}

// ← tipe untuk session cookie
interface SessionUser {
    name: string;
    email: string;
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

        const [rows] = await connection.query<CollectionRow[]>(
            `SELECT collection.id, collection.name_ind, collection.name_eng, mstr_collection.name_ind as mstr_collection_name
            FROM collection
            LEFT JOIN mstr_collection ON mstr_collection.id = collection.mstr_collection_id
            WHERE collection.name_ind LIKE ? OR collection.name_eng LIKE ?
            ORDER BY ${sortBy} ${sortOrder}
            LIMIT ? OFFSET ?`,
            [`%${search}%`, `%${search}%`, limit, offset]
        );

        const [totalRows] = await connection.query<CountRow[]>(
            `SELECT COUNT(*) as total
            FROM collection
            WHERE collection.name_ind LIKE ? OR collection.name_eng LIKE ?`,
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
        const mstr_collection_id = formData.get("mstr_collection_id") as string;
        const name_ind = formData.get("name_ind") as string;
        const name_eng = formData.get("name_eng") as string;
        const description_ind = formData.get("description_ind") as string;
        const description_eng = formData.get("description_eng") as string;
        const imageFile = formData.get("image") as File;

        const errors: ErrorResponse = {};
        if (!mstr_collection_id) errors.mstr_collection_id = "Collection wajib dipilih";
        if (!name_ind?.trim()) errors.name_ind = "Nama Indonesia wajib diisi";
        if (!name_eng?.trim()) errors.name_eng = "Nama English wajib diisi";
        if (!description_ind?.trim()) errors.description_ind = "Deskripsi Indonesia wajib diisi";
        if (!description_eng?.trim()) errors.description_eng = "Deskripsi English wajib diisi";
        if (!imageFile) errors.image = "Image wajib diupload";

        if (Object.keys(errors).length > 0) {
            return NextResponse.json(
                { success: false, message: "Validasi gagal", errors },
                { status: 400 }
            );
        }

        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `collection-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.webp`;
        const uploadDir = path.join(process.cwd(), "public/images/upload/collection");
        await mkdir(uploadDir, { recursive: true });
        await sharp(buffer).webp({ quality: 80 }).toFile(path.join(uploadDir, filename));

        await connection.beginTransaction();

        const [result] = await connection.query(
            `INSERT INTO collection (mstr_collection_id, name_ind, name_eng, description_ind, description_eng, image, created_by, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
            [parseInt(mstr_collection_id), name_ind, name_eng, description_ind, description_eng, `/images/upload/collection/${filename}`, createdBy]
        );

        await connection.commit();

        const collectionId = (result as unknown as { insertId: number }).insertId;

        return NextResponse.json(
            {
                success: true,
                message: "Collection berhasil ditambahkan",
                data: { id: collectionId },
            },
            { status: 201 }
        );
    } catch (error) {
        await connection.rollback();
        console.error("[CREATE_COLLECTION_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Terjadi kesalahan server" },
            { status: 500 }
        );
    } finally {
        connection.release();
    }
}