import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { RowDataPacket } from "mysql2";

interface EventRow extends RowDataPacket {
    id: number;
    title_ind: string;
    title_eng: string;
    short_description_ind: string;
    short_description_eng: string;
    thumbnail: string;
    slug: string;
    event_date: string;
    location: string;
    capacity: number;
    price: number;
}

/* ======================================================
    GET DATA - Fetch all events
====================================================== */
export async function GET(request: NextRequest) {
    try {
        const query = `
            SELECT
                id,
                title_ind,
                title_eng,
                short_description_ind,
                short_description_eng,
                thumbnail,
                slug,
                event_date,
                location,
                capacity,
                price
            FROM events
            WHERE is_active = 1
            ORDER BY event_date ASC
        `;

        const params: (number | string)[] = [];

        const [rows] = await dbWeb.query<EventRow[]>(query, params);

        const processedRows = rows.map(row => ({
            id: row.id,
            title_ind: row.title_ind,
            title_eng: row.title_eng,
            shortDesc_ind: row.short_description_ind,
            shortDesc_eng: row.short_description_eng,
            imageUrl: row.thumbnail || '',
            slug: row.slug,
            date: row.event_date,
            location: row.location,
            capacity: row.capacity,
            price: row.price
        }));

        return NextResponse.json({
            success: true,
            data: processedRows,
        });

    } catch (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch data",
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
