import { NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { RowDataPacket } from "mysql2";

interface VenueFacilityRow extends RowDataPacket {
    id: number;
    name_ind: string;
    name_eng: string;
}

export async function GET() {
    try {
        const [rows] = await dbWeb.query<VenueFacilityRow[]>(
            `
            SELECT id, name_ind, name_eng
            FROM mstr_vanue_facilities
            ORDER BY name_ind ASC
            `
        );

        // ✅ Map ke format MultiSelect (value sebagai number, bukan string)
        const mappedData = (Array.isArray(rows) ? rows : []).map((item) => ({
            value: item.id,
            label: item.name_ind,
        }));

        return NextResponse.json({ success: true, data: mappedData });
    } catch (error) {
        console.error("[GET_VENUE_FACILITIES_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch facilities" },
            { status: 500 }
        );
    }
}