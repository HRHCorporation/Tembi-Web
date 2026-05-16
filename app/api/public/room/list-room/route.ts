import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { RowDataPacket } from "mysql2";

interface RoomFacility {
    id: number;
    name_ind: string;
    name_eng: string;
    icon: string;
}

interface RoomRow extends RowDataPacket {
    id: number;
    title_ind: string;
    title_eng: string;
    description_ind: string;
    description_eng: string;
    number_guest: number;
    spacious_room: number;
    slug: string;
    imagebanner: string;
    facilities: string | RoomFacility[] | null;
    tiers_name: string;
    gallery_count: number;
}

/* ======================================================
    GET DATA - Fetch recommended rooms
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
                room.number_guest,
                room.spacious_room,
                room.slug,
                room_gallery_banner.image as imagebanner,
                mstr_tiers_room.name_id as tiers_name,
                COALESCE(gallery_counts.total_gallery, 0) as gallery_count,
                (
                    SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'id', mf.id,
                            'name_ind', mf.name_ind,
                            'name_eng', mf.name_eng,
                            'icon', mf.icon
                        )
                    )
                    FROM (
                        SELECT mstr_fasilities.id, mstr_fasilities.name_ind, mstr_fasilities.name_eng, mstr_fasilities.icon
                        FROM room_facilities
                        JOIN mstr_fasilities ON mstr_fasilities.id = room_facilities.facilities_id
                        WHERE room_facilities.room_id = room.id
                        LIMIT 2
                    ) as mf
                ) as facilities
            FROM room
            LEFT JOIN room_gallery as room_gallery_banner
                ON room_gallery_banner.room_id = room.id 
                AND room_gallery_banner.is_banner = 1
            LEFT JOIN (
                SELECT room_id, COUNT(*) as total_gallery
                FROM room_gallery
                GROUP BY room_id
            ) as gallery_counts
                ON gallery_counts.room_id = room.id
            JOIN mstr_tiers_room
                ON mstr_tiers_room.id = room.tiers_id
            WHERE room.is_recomendation = 0
            ORDER BY room.created_at DESC
        `;

        const params: (number | string)[] = [];

        const [rows] = await dbWeb.query<RoomRow[]>(query, params);

        // Parse JSON facilities untuk setiap row
        const processedRows = rows.map(row => {
            let facilities: RoomFacility[] = [];
            
            if (row.facilities) {
                // Cek apakah sudah object atau masih string
                if (typeof row.facilities === 'string') {
                    try {
                        facilities = JSON.parse(row.facilities);
                    } catch (e) {
                        facilities = [];
                    }
                } else {
                    facilities = row.facilities as RoomFacility[];
                }
                
                // Filter null values
                if (Array.isArray(facilities)) {
                    facilities = facilities.filter(f => f && f.id !== null);
                }
            }
            
            return {
                id: row.id,
                title_ind: row.title_ind,
                title_eng: row.title_eng,
                description_ind: row.description_ind,
                description_eng: row.description_eng,
                number_guest: row.number_guest,
                spacious_room: row.spacious_room,
                slug: row.slug,
                imagebanner: row.imagebanner || '',
                tiers_name: row.tiers_name,
                gallery_count: row.gallery_count,
                facilities: facilities
            };
        });

        return NextResponse.json({
            success: true,
            data: processedRows,
        });

    } catch (error) {
        console.error('Error fetching recommended rooms:', error);
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