import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { RowDataPacket } from "mysql2";

interface BannerRow extends RowDataPacket {
    id: number;
    title_ind: string;
    title_eng: string;
    description_ind: number;
    description_eng: number;
    subtitle_ind: string;
    subtitle_eng: string;
    image: string;
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
                subtitle_ind,
                subtitle_eng,
                description_ind,
                description_eng
            FROM room_page_meta
            WHERE code = 6
        `;

        const params: (number | string)[] = [];

        query += ' ORDER BY created_at DESC';

        const [rows] = await connection.query<BannerRow[]>(query, params);

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
    } finally {
        connection.release();
    }
}