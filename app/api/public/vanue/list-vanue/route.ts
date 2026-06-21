import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { RowDataPacket } from "mysql2";

interface VanueFacility {
    id: number;
    name_ind: string;
    name_eng: string;
    icon: string;
    is_add_ons: number;
}

interface VanueRow extends RowDataPacket {
    id: number;
    name_ind: string;
    name_eng: string;
    description_ind: string;
    description_eng: string;
    slug: string;
    imagebanner: string | null;
    capacity_ind: string | null;
    capacity_eng: string | null;
    facilities: string | VanueFacility[] | null;
}

/* ======================================================
    GET DATA - Fetch all venues with details
====================================================== */
export async function GET(request: NextRequest) {
    const connection = await dbWeb.getConnection();
    try {
        const query = `
            SELECT 
    vanue.id,
    vanue.name_ind,
    vanue.name_eng,
    vanue.description_ind,
    vanue.description_eng,
    vanue.slug,
    vanue_gallery.image as imagebanner,
    venue_keys.value_ind as capacity_ind,
    venue_keys.value_eng as capacity_eng,
    (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', f.id,
                'name_ind', f.name_ind,
                'name_eng', f.name_eng
            )
        )
        FROM (
            SELECT mf.id, mf.name_ind, mf.name_eng
            FROM vanue_facilities vf
            JOIN mstr_vanue_facilities mf ON mf.id = vf.mstr_vanue_facilities
            WHERE vf.vanue_id = vanue.id
            LIMIT 5
        ) f
    ) as facilities
FROM vanue
LEFT JOIN vanue_gallery 
    ON vanue_gallery.vanue_id = vanue.id 
    AND vanue_gallery.is_banner = 1
LEFT JOIN venue_keys 
    ON venue_keys.vanue_id = vanue.id 
    AND (venue_keys.label_ind LIKE '%capacity%' OR venue_keys.label_ind LIKE '%Capacity%')
ORDER BY vanue.created_at DESC
        `;

        const params: (number | string)[] = [];

        const [rows] = await connection.query<VanueRow[]>(query, params);

        // Parse JSON facilities untuk setiap row
        const processedRows = rows.map(row => {
            let facilities: VanueFacility[] = [];

            if (row.facilities) {
                // Cek apakah sudah object atau masih string
                if (typeof row.facilities === 'string') {
                    try {
                        facilities = JSON.parse(row.facilities);
                    } catch (e) {
                        facilities = [];
                    }
                } else {
                    facilities = row.facilities as VanueFacility[];
                }

                // Filter null values
                if (Array.isArray(facilities)) {
                    facilities = facilities.filter(f => f && f.id !== null);
                }
            }

            return {
                id: row.id,
                name_ind: row.name_ind,
                name_eng: row.name_eng,
                description_ind: row.description_ind,
                description_eng: row.description_eng,
                slug: row.slug,
                imagebanner: row.imagebanner || '',
                capacity_ind: row.capacity_ind || '',
                capacity_eng: row.capacity_eng || '',
                facilities: facilities
            };
        });

        return NextResponse.json({
            success: true,
            data: processedRows,
        });

    } catch (error) {
        console.error('Error fetching venues:', error);
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