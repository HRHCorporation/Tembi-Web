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
    GET DATA - Fetch latest 4 collections
====================================================== */
export async function GET(request: NextRequest) {
    const connection = await dbWeb.getConnection();
    try {
        const query = `
            SELECT 
                collection.id,
                collection.image,
                collection.name_ind,
                collection.name_eng,
                collection.description_ind,
                collection.description_eng
            FROM collection
            ORDER BY collection.created_at DESC
            LIMIT 4
        `;

        const [rows] = await connection.query<CollectionRow[]>(query);

        return NextResponse.json({
            success: true,
            data: rows,
        });

    } catch (error) {
        console.error('Error fetching collections:', error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch data",
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    } finally {
        connection.release();
    }
}