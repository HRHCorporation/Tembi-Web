import { NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { RowDataPacket } from "mysql2";

interface CateringserviceRow extends RowDataPacket {
    value: number;
    label: string;
}

export async function GET() {
    try {
        const [rows] = await dbWeb.query<CateringserviceRow[]>(
            `
            SELECT id AS value, name_ind AS label
            FROM mstr_type_catering_service
            ORDER BY name_ind ASC
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