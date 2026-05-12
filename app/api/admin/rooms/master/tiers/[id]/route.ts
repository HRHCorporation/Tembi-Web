import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";  // ← import tipe dari mysql2
import dbWeb from "@/lib/db-web";

// ← tipe untuk data tiers room dari DB
interface TiersRoomRow extends RowDataPacket {
    id: number;
    name_id: string;
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

        const [rows] = await dbWeb.query<TiersRoomRow[]>(  // ← ganti any
            `SELECT * FROM mstr_tiers_room WHERE id = ? LIMIT 1`,
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
        const nameId = formData.get("name_id") as string;

        const [rows] = await dbWeb.query<TiersRoomRow[]>(  // ← ganti any
            `SELECT * FROM mstr_tiers_room WHERE id = ? LIMIT 1`,
            [Number(id)]
        );
        if (!rows.length) {
            return NextResponse.json(
                { success: false, message: "Data tidak ditemukan" },
                { status: 404 }
            );
        }

        await dbWeb.query(
            `UPDATE mstr_tiers_room SET name_id = ?, updated_at = NOW() WHERE id = ?`,
            [nameId, Number(id)]
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
        const [rows] = await dbWeb.query<TiersRoomRow[]>(  // ← ganti any
            `SELECT * FROM mstr_tiers_room WHERE id = ? LIMIT 1`,
            [Number(id)]
        );
        if (!rows.length) {
            return NextResponse.json(
                { success: false, message: "Data tidak ditemukan" },
                { status: 404 }
            );
        }
        await dbWeb.query(
            `DELETE FROM mstr_tiers_room WHERE id = ?`,
            [Number(id)]
        );
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("DELETE ERROR:", error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
