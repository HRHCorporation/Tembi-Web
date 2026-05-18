import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbWeb from "@/lib/db-web";
import sharp from "sharp";
import { mkdir } from "fs/promises";
import path from "path";
import { RowDataPacket } from "mysql2";



interface BannerRow extends RowDataPacket {
    id: number;
    title_ind: string;
    title_eng: string;
    name_page: string;
}

interface CountRow extends RowDataPacket {
    total: number;
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
        const [rows] = await dbWeb.query<BannerRow[]>(  // ← ganti any
            `
            SELECT room_page_meta.id, room_page_meta.title_ind, room_page_meta.title_eng, mstr_page.name as name_page
            FROM room_page_meta
            JOIN mstr_page ON room_page_meta.code = mstr_page.code
            WHERE title_ind LIKE ? OR title_eng LIKE ?
            ORDER BY ${sortBy} ${sortOrder}
            LIMIT ? OFFSET ?
            `,
            [`%${search}%`, `%${search}%`, limit, offset]
        );
        const [totalRows] = await dbWeb.query<CountRow[]>(  // ← ganti any
            `
            SELECT COUNT(*) as total
            FROM room_page_meta
            WHERE room_page_meta.title_ind LIKE ? OR room_page_meta.title_eng LIKE ?
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