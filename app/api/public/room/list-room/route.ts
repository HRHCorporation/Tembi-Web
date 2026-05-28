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
    const connection = await dbWeb.getConnection();
    try {
        const query = `
            SELECT
                r.id,
                r.title_ind,
                r.title_eng,
                r.description_ind,
                r.description_eng,
                r.number_guest,
                r.spacious_room,
                r.slug,
                room_gallery_banner.image as imagebanner,
                mstr_tiers_room.name_id as tiers_name,
                COALESCE(gallery_counts.total_gallery, 0) as gallery_count,
                facilities_agg.facilities
            FROM
                room r
            LEFT JOIN room_gallery as room_gallery_banner
                ON
                room_gallery_banner.room_id = r.id
                AND room_gallery_banner.is_banner = 1
            LEFT JOIN (
                SELECT
                    room_id,
                    COUNT(*) as total_gallery
                FROM
                    room_gallery
                GROUP BY
                    room_id
            ) as gallery_counts
                ON
                gallery_counts.room_id = r.id
            JOIN mstr_tiers_room
                ON
                mstr_tiers_room.id = r.tiers_id
            LEFT JOIN (
                SELECT
                    rf.room_id,
                    CONCAT('[',
                        GROUP_CONCAT(
                            JSON_OBJECT(
                                'id', mf.id,
                                'name_ind', mf.name_ind,
                                'name_eng', mf.name_eng,
                                'icon', mf.icon
                            )
                            ORDER BY mf.id
                            SEPARATOR ','
                        ),
                    ']') as facilities
                FROM
                    (
                    SELECT
                        room_facilities.room_id,
                        room_facilities.facilities_id,
                        @rn := IF(@prev = room_facilities.room_id, @rn + 1, 1) AS rn,
                        @prev := room_facilities.room_id
                    FROM
                        room_facilities
                    CROSS JOIN (
                        SELECT
                            @rn := 0,
                            @prev := NULL) vars
                    ORDER BY
                        room_facilities.room_id,
                        room_facilities.facilities_id
                ) rf
                JOIN mstr_fasilities mf ON
                    mf.id = rf.facilities_id
                WHERE
                    rf.rn <= 2
                GROUP BY
                    rf.room_id
            ) as facilities_agg
                ON
                facilities_agg.room_id = r.id
            WHERE
                r.is_recomendation = 0
            ORDER BY
                r.created_at DESC;
        `;

        const params: (number | string)[] = [];

        const [rows] = await connection.query<RoomRow[]>(query, params);

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
    } finally {
        connection.release();
    }
}