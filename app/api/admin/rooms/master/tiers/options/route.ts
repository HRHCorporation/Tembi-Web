import { NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { RowDataPacket } from "mysql2";

interface TiersRow extends RowDataPacket {
    value: number;
    label: string;
}

export async function GET() {
    try {
        const [rows] = await dbWeb.query<TiersRow[]>(
            `
            SELECT id AS value, name_id AS label
            FROM mstr_tiers_room
            ORDER BY name_id ASC
            `
        );

        return NextResponse.json({ success: true, data: rows });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch options" },
            { status: 500 }
        );
    }
}