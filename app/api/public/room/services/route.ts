import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { RowDataPacket } from "mysql2";

interface AmenityService {
    id: number;
    name_ind: string;
    name_eng: string;
}

interface ServiceRow extends RowDataPacket {
    id: number;
    icon: string;
    name_ind: string;
    name_eng: string;
    is_addition: number;
    amenities: string | AmenityService[] | null;
}

/* ======================================================
    GET DATA - Fetch all services with amenities
====================================================== */
export async function GET(request: NextRequest) {
    const connection = await dbWeb.getConnection();
    try {
        const query = `
            SELECT 
                mstr_services.id,
                mstr_services.icon,
                mstr_services.name_ind,
                mstr_services.name_eng,
                mstr_services.is_addition,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', amenities_services.id,
                        'name_ind', amenities_services.name_ind,
                        'name_eng', amenities_services.name_eng
                    )
                ) as amenities
            FROM mstr_services
            LEFT JOIN amenities_services 
                ON amenities_services.services_id = mstr_services.id
            WHERE mstr_services.is_addition = 0
            GROUP BY 
                mstr_services.id,
                mstr_services.icon,
                mstr_services.name_ind,
                mstr_services.name_eng,
                mstr_services.is_addition
            ORDER BY mstr_services.created_at DESC
        `;

        const params: (number | string)[] = [];

        const [rows] = await connection.query<ServiceRow[]>(query, params);

        // Parse JSON amenities untuk setiap row
        const processedRows = rows.map(row => {
            let amenities: AmenityService[] = [];
            
            if (row.amenities) {
                // Cek apakah sudah object atau masih string
                if (typeof row.amenities === 'string') {
                    try {
                        amenities = JSON.parse(row.amenities);
                    } catch (e) {
                        amenities = [];
                    }
                } else {
                    amenities = row.amenities as AmenityService[];
                }
                
                // Filter null values (jika LEFT JOIN tidak match)
                if (Array.isArray(amenities)) {
                    amenities = amenities.filter(a => a && a.id !== null);
                }
            }
            
            return {
                id: row.id,
                icon: row.icon,
                name_ind: row.name_ind,
                name_eng: row.name_eng,
                is_addition: row.is_addition,
                amenities: amenities
            };
        });

        return NextResponse.json({
            success: true,
            data: processedRows,
        });

    } catch (error) {
        console.error('Error fetching services:', error);
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