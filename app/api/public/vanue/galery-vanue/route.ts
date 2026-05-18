import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { RowDataPacket } from "mysql2";

interface GalleryRow extends RowDataPacket {
    id: number;
    vanue_id: number;
    image: string;
}

/* ======================================================
    GET DATA - Fetch venue galleries (max 6, min 1 per venue)
====================================================== */
export async function GET(request: NextRequest) {
    try {
        const query = `
            SELECT 
                id,
                vanue_id,
                image
            FROM (
                SELECT 
                    vg.id,
                    vg.vanue_id,
                    vg.image,
                    vg.created_at,
                    ROW_NUMBER() OVER (PARTITION BY vg.vanue_id ORDER BY vg.created_at DESC) as rn,
                    vc.total_venues
                FROM vanue_gallery vg
                CROSS JOIN (
                    SELECT COUNT(DISTINCT vanue_id) as total_venues
                    FROM vanue_gallery
                ) as vc
            ) as ranked
            WHERE 
                rn = 1  -- Ambil 1 per venue dulu
                OR (
                    -- Jika total venue < 6, ambil lebih dari 1 per venue
                    total_venues < 6 
                    AND rn <= CEIL(6.0 / total_venues)
                )
            ORDER BY vanue_id, created_at DESC
            LIMIT 6
        `;

        const params: (number | string)[] = [];

        const [rows] = await dbWeb.query<GalleryRow[]>(query, params);

        // Extract only images
        const images = rows.map(row => row.image);

        return NextResponse.json({
            success: true,
            data: images,
        });

    } catch (error) {
        console.error('Error fetching venue galleries:', error);
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