import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { RowDataPacket } from "mysql2";

interface VanueFacility {
    id: number;
    name_ind: string;
    name_eng: string;
    icon: string;
}

interface VanueRow extends RowDataPacket {
    id: number;
    name_ind: string;
    name_eng: string;
    description_ind: string;
    description_eng: string;
    imagebanner: string;
    slug: string;
    facilities: string | VanueFacility[] | null; // Bisa string atau array
}

/* ======================================================
    GET DATA - Fetch all venues with facilities
====================================================== */
export async function GET(request: NextRequest) {
    const connection = await dbWeb.getConnection();
    try {
        const query = `
            SELECT 
                vanue.id,
                vanue_gallery.image as imagebanner,
                vanue.name_ind,
                vanue.name_eng,
                vanue.description_ind,
                vanue.description_eng,
                vanue.slug,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', mstr_vanue_facilities.id,
                        'name_ind', mstr_vanue_facilities.name_ind,
                        'name_eng', mstr_vanue_facilities.name_eng,
                        'icon', mstr_vanue_facilities.icon
                    )
                ) as facilities
            FROM vanue
            JOIN vanue_gallery 
                ON vanue_gallery.vanue_id = vanue.id 
                AND vanue_gallery.is_banner = 1
            LEFT JOIN vanue_facilities 
                ON vanue_facilities.vanue_id = vanue.id
            LEFT JOIN mstr_vanue_facilities 
                ON mstr_vanue_facilities.id = vanue_facilities.mstr_vanue_facilities
            GROUP BY 
                vanue.id,
                vanue_gallery.image,
                vanue.name_ind,
                vanue.name_eng,
                vanue.description_ind,
                vanue.description_eng,
                vanue.slug
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
                    facilities = JSON.parse(row.facilities);
                } else {
                    facilities = row.facilities as VanueFacility[];
                }

                // Filter null values (jika LEFT JOIN tidak match)
                facilities = facilities.filter(f => f.id !== null);
            }

            return {
                id: row.id,
                name_ind: row.name_ind,
                name_eng: row.name_eng,
                description_ind: row.description_ind,
                description_eng: row.description_eng,
                imagebanner: row.imagebanner,
                slug: row.slug,
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