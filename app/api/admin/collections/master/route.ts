import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { cookies } from "next/headers";
import { RowDataPacket } from "mysql2";

// ← tipe untuk data fasilitas
interface CollectionRow extends RowDataPacket {
    id: number;
    name_id: string;
    name_eng: string;
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
            `SELECT id, name_ind, name_eng
            FROM mstr_collection
            WHERE name_ind LIKE ? OR name_eng LIKE ?
            ORDER BY ${sortBy} ${sortOrder}
            LIMIT ? OFFSET ?`,
            [`%${search}%`, `%${search}%`, limit, offset]
        );

        const [totalRows] = await connection.query<CountRow[]>(
            `SELECT COUNT(*) as total
            FROM mstr_collection
            WHERE name_ind LIKE ? OR name_eng LIKE ?`,
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
        const name_ind = formData.get("name_ind") as string;
        const name_eng = formData.get("name_eng") as string;

        await connection.beginTransaction();

        await connection.query(
            `INSERT INTO mstr_collection (name_ind, name_eng, created_by, created_at)
            VALUES (?, ?, ?, NOW())`,
            [name_ind, name_eng, createdBy]
        );

        await connection.commit();

        return NextResponse.json({
            success: true,
            message: "Collection berhasil ditambahkan",
        });
    } catch (error) {
        await connection.rollback();
        console.error(error);
        return NextResponse.json(
            { success: false, message: "Failed to create Collection" },
            { status: 500 }
        );
    } finally {
        connection.release();
    }
}