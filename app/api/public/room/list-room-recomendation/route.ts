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
                room_gallery.image as imagebanner,
                CONCAT('[',
                    COALESCE(
                        GROUP_CONCAT(
                            DISTINCT
                            JSON_OBJECT(
                                'id', mstr_fasilities.id,
                                'name_ind', mstr_fasilities.name_ind,
                                'name_eng', mstr_fasilities.name_eng,
                                'icon', mstr_fasilities.icon
                            )
                            ORDER BY mstr_fasilities.id
                            SEPARATOR ','
                        ),
                        ''
                    ),
                ']') as facilities
            FROM
                room
            LEFT JOIN room_gallery 
                ON room_gallery.room_id = room.id
                AND room_gallery.is_banner = 1
            LEFT JOIN room_facilities
                ON room_facilities.room_id = room.id
            LEFT JOIN mstr_fasilities
                ON mstr_fasilities.id = room_facilities.facilities_id
            WHERE
                room.is_recomendation = 1
            GROUP BY
                room.id,
                room.title_ind,
                room.title_eng,
                room.description_ind,
                room.description_eng,
                room.number_guest,
                room.spacious_room,
                room.slug,
                room_gallery.image
            ORDER BY
                room.created_at DESC;
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