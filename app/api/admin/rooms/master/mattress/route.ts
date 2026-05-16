import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { cookies } from "next/headers";
import { RowDataPacket } from "mysql2";

// ← tipe untuk data mattress
interface MattressRow extends RowDataPacket {
    id: number;
    name_id: string;
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
        const [rows] = await dbWeb.query<MattressRow[]>(  // ← ganti any
            `
            SELECT id, name
            FROM mstr_mattress_room
            WHERE name LIKE ?
            ORDER BY ${sortBy} ${sortOrder}
            LIMIT ? OFFSET ?
            `,
            [`%${search}%`, limit, offset]
        );
        const [totalRows] = await dbWeb.query<CountRow[]>(  // ← ganti any
            `
            SELECT COUNT(*) as total
            FROM mstr_mattress_room
            WHERE name LIKE ?
            `,
            [`%${search}%`]
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
        const name = formData.get("name") as string;

        await dbWeb.query(
            `
            INSERT INTO mstr_mattress_room (name, created_by, created_at)
            VALUES (?, ?, NOW())
            `,
            [name, createdBy]
        );
        return NextResponse.json({ success: true, message: "Mattress berhasil ditambahkan" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Failed to create mattress" }, { status: 500 });
    }
}
