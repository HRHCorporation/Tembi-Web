import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { cookies } from "next/headers";
import { RowDataPacket } from "mysql2";

// ← tipe untuk data fasilitas
interface FasilityRow extends RowDataPacket {
    id: number;
    name_id: string;
    name_eng: string;
    icon: string;
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
    try {
        const searchParams = request.nextUrl.searchParams;
        const page = Number(searchParams.get("page") || 1);
        const limit = Number(searchParams.get("limit") || 10);
        const search = searchParams.get("search") || "";
        const offset = (page - 1) * limit;
        const sortBy = searchParams.get("sortBy") || "id";
        const sortOrder = searchParams.get("sortOrder") || "DESC";
        const [rows] = await dbWeb.query<FasilityRow[]>(  // ← ganti any
            `
            SELECT id, name_ind, name_eng, icon
            FROM mstr_vanue_facilities
            WHERE name_ind LIKE ? OR name_eng LIKE ?
            ORDER BY ${sortBy} ${sortOrder}
            LIMIT ? OFFSET ?
            `,
            [`%${search}%`, `%${search}%`, limit, offset]
        );
        const [totalRows] = await dbWeb.query<CountRow[]>(  // ← ganti any
            `
            SELECT COUNT(*) as total
            FROM mstr_vanue_facilities
            WHERE name_ind LIKE ? OR name_eng LIKE ?
            `,
            [`%${search}%`, `%${search}%`]
        );
        const total = totalRows[0].total;
        const totalPages = Math.ceil(total / limit);
        return NextResponse.json({
            success: true,
            data: rows,
            pagination: {
                total,
                totalPages,
            },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Failed to fetch data" }, { status: 500 });
    }
}

/* ======================================================
    CREATE DATA
====================================================== */
export async function POST(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get(
            process.env.COOKIE_NAME || "admin_session_tembi"
        );

        let createdBy = "system";

        if (session?.value) {
            const user = JSON.parse(session.value) as SessionUser;  // ← ganti any
            createdBy = user.name;
        }
        
        const formData = await request.formData();
        const name_ind = formData.get("name_ind") as string;
        const name_eng = formData.get("name_eng") as string;
        const description_ind = formData.get("description_ind") as string;
        const description_eng = formData.get("description_eng") as string;
        const icon = formData.get("icon") as string;

        await dbWeb.query(
            `
            INSERT INTO mstr_vanue_facilities (name_ind, name_eng, description_ind, description_eng, icon, created_by, created_at)
            VALUES (?, ?, ?, ?, ?, ?, NOW())
            `,
            [name_ind, name_eng, description_ind, description_eng, icon, createdBy]
        );
        return NextResponse.json({ success: true, message: "Fasilitas berhasil ditambahkan" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Failed to create fasility" }, { status: 500 });
    }
}
