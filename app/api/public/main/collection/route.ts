import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { RowDataPacket } from "mysql2";

interface CollectionRow extends RowDataPacket {
    id: number;
    name_ind: string;
    name_eng: string;
    description_ind: string;
    description_eng: string;
    image: string;
}

/* ======================================================
    GET DATA - Fetch all carousels
====================================================== */
export async function GET(request: NextRequest) {
    try {
        let query = `
            SELECT 
                collection.id,
                collection.image,
                collection.name_ind,
                collection.name_eng,
                collection.description_ind,
                collection.description_eng
            FROM collection
        `;

        const params: (number | string)[] = [];

        query += ' ORDER BY collection.created_at DESC';

        const [rows] = await dbWeb.query<CollectionRow[]>(query, params);

        return NextResponse.json({
            success: true,
            data: rows,
        });

    } catch (error) {
        console.error('Error fetching carousels:', error);
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