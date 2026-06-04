import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { RowDataPacket } from "mysql2";

interface CarouselRow extends RowDataPacket {
    id: number;
    title_ind: string;
    title_eng: string;
    is_active: number;
    image: string;
    created_by: string | null;
    created_at: string;
    updated_by: string | null;
    updated_at: string;
}

/* ======================================================
    GET DATA - Fetch all carousels
====================================================== */
export async function GET(request: NextRequest) {
    const connection = await dbWeb.getConnection();
    try {
        let query = `
            SELECT 
                id,
                image,
                title_ind,
                title_eng,
                is_active
            FROM carousels
            WHERE is_active = 1
        `;

        const params: (number | string)[] = [];

        query += ' ORDER BY created_at DESC';

        const [rows] = await connection.query<CarouselRow[]>(query, params);

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
    finally {
        connection.release();
    }
}