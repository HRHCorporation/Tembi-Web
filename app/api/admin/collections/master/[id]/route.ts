import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";  // ← import tipe dari mysql2
import dbWeb from "@/lib/db-web";

// ← tipe untuk data fasilitas dari DB
interface CollectionRow extends RowDataPacket {
    id: number;
    name_ind: string;
    name_eng: string;
    created_at: Date;
    updated_at: Date;
}

// ← tipe untuk context params Next.js 15
interface RouteContext {
    params: Promise<{ id: string }>;
}

export async function GET(
    request: NextRequest,
    context: RouteContext  // ← ganti any
) {
    try {
        const { id } = await context.params;
        const numericId = Number(id);

        const [rows] = await dbWeb.query<CollectionRow[]>(  // ← ganti any
            `SELECT * FROM mstr_collection WHERE id = ? LIMIT 1`,
            [numericId]
        );
        if (!rows.length) {
            return NextResponse.json(
                { success: false, message: "Data tidak ditemukan" },
                { status: 404 }
            );
        }
        return NextResponse.json({
            success: true,
            data: rows[0],
        });
    } catch (error) {
        console.error("GET ERROR:", error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    context: RouteContext  // ← ganti any
) {
    try {
        const { id } = await context.params;
        const formData = await request.formData();
        const name_ind = formData.get("name_ind") as string;
        const name_eng = formData.get("name_eng") as string;

        const [rows] = await dbWeb.query<CollectionRow[]>(  // ← ganti any
            `SELECT * FROM mstr_collection WHERE id = ? LIMIT 1`,
            [Number(id)]
        );
        if (!rows.length) {
            return NextResponse.json(
                { success: false, message: "Data tidak ditemukan" },
                { status: 404 }
            );
        }

        await dbWeb.query(
            `UPDATE mstr_collection SET name_ind = ?, name_eng = ?, updated_at = NOW() WHERE id = ?`,
            [name_ind, name_eng, Number(id)]
        );
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("PUT ERROR:", error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    context: RouteContext  // ← ganti any
) {
    try {
        const { id } = await context.params;
        const [rows] = await dbWeb.query<CollectionRow[]>(  // ← ganti any
            `SELECT * FROM mstr_collection WHERE id = ? LIMIT 1`,
            [Number(id)]
        );
        if (!rows.length) {
            return NextResponse.json(
                { success: false, message: "Data tidak ditemukan" },
                { status: 404 }
            );
        }
        await dbWeb.query(
            `DELETE FROM mstr_collection WHERE id = ?`,
            [Number(id)]
        );
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("DELETE ERROR:", error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
