import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { RowDataPacket } from "mysql2";

interface RoomGallery {
    id: number;
    image: string;
    is_banner: number;
}

interface HouseRow extends RowDataPacket {
    id: number;
    title_ind: string;
    title_eng: string;
    description_ind: string;
    description_eng: string;
    is_recomendation: number;
    slug: string;
    galleries: string | RoomGallery[] | null;
}

/* ======================================================
    GET DATA - Fetch all rooms with galleries
====================================================== */
export async function GET(request: NextRequest) {
    try {
        const query = `
            SELECT 
                room.id,
                room.title_ind,
                room.title_eng,
                room.description_ind,
                room.description_eng,
                room.slug,
                room.is_recomendation,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', room_gallery.id,
                        'image', room_gallery.image,
                        'is_banner', room_gallery.is_banner
                    )
                ) as galleries
            FROM room
            LEFT JOIN room_gallery 
                ON room_gallery.room_id = room.id
            WHERE room.is_recomendation = 1
            GROUP BY 
                room.id,
                room.title_ind,
                room.title_eng,
                room.description_ind,
                room.description_eng,
                room.slug,
                room.is_recomendation
            ORDER BY room.created_at DESC
        `;

        const params: (number | string)[] = [];

        const [rows] = await dbWeb.query<HouseRow[]>(query, params);

        // Parse JSON galleries untuk setiap row
        const processedRows = rows.map(row => {
            let galleries: RoomGallery[] = [];
            
            if (row.galleries) {
                // Cek apakah sudah object atau masih string
                if (typeof row.galleries === 'string') {
                    galleries = JSON.parse(row.galleries);
                } else {
                    galleries = row.galleries as RoomGallery[];
                }
                
                // Filter null values (jika LEFT JOIN tidak match)
                galleries = galleries.filter(g => g.id !== null);
            }
            
            return {
                id: row.id,
                title_ind: row.title_ind,
                title_eng: row.title_eng,
                description_ind: row.description_ind,
                description_eng: row.description_eng,
                slug: row.slug,
                is_recomendation: row.is_recomendation,
                galleries: galleries
            };
        });

        return NextResponse.json({
            success: true,
            data: processedRows,
        });

    } catch (error) {
        console.error('Error fetching rooms:', error);
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