import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";  // ← import tipe dari mysql2
import dbWeb from "@/lib/db-web";

// ← tipe untuk data kebijakan dari DB
interface PolicyRow extends RowDataPacket {
    id: number;
    name_ind: string;
    name_eng: string;
    icon: string;
    type: string;
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

        const [rows] = await dbWeb.query<PolicyRow[]>(  // ← ganti any
            `SELECT * FROM mstr_room_policies WHERE id = ? LIMIT 1`,
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
        const icon = formData.get("icon") as string;
        const type = formData.get("type") as string;

        const [rows] = await dbWeb.query<PolicyRow[]>(  // ← ganti any
            `SELECT * FROM mstr_room_policies WHERE id = ? LIMIT 1`,
            [Number(id)]
        );
        if (!rows.length) {
            return NextResponse.json(
                { success: false, message: "Data tidak ditemukan" },
                { status: 404 }
            );
        }

        await dbWeb.query(
            `UPDATE mstr_room_policies SET name_ind = ?, name_eng = ?, icon = ?, type = ?, updated_at = NOW() WHERE id = ?`,
            [name_ind, name_eng, icon, type, Number(id)]
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
        const [rows] = await dbWeb.query<PolicyRow[]>(  // ← ganti any
            `SELECT * FROM mstr_room_policies WHERE id = ? LIMIT 1`,
            [Number(id)]
        );
        if (!rows.length) {
            return NextResponse.json(
                { success: false, message: "Data tidak ditemukan" },
                { status: 404 }
            );
        }
        await dbWeb.query(
            `DELETE FROM mstr_room_policies WHERE id = ?`,
            [Number(id)]
        );
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("DELETE ERROR:", error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
