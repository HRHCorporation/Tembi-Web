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
}

/* ======================================================
    GET DATA - Fetch all services with amenities
====================================================== */
export async function GET(request: NextRequest) {
    try {
        const query = `
            SELECT 
                mstr_services.id,
                mstr_services.icon,
                mstr_services.name_ind,
                mstr_services.name_eng,
                mstr_services.is_addition
            FROM mstr_services
            WHERE mstr_services.is_addition = 1
            GROUP BY 
                mstr_services.id,
                mstr_services.icon,
                mstr_services.name_ind,
                mstr_services.name_eng,
                mstr_services.is_addition
            ORDER BY mstr_services.created_at DESC
        `;

        const params: (number | string)[] = [];

        const [rows] = await dbWeb.query<ServiceRow[]>(query, params);

        // Parse JSON amenities untuk setiap row
        const processedRows = rows.map(row => {
        
            
            return {
                id: row.id,
                icon: row.icon,
                name_ind: row.name_ind,
                name_eng: row.name_eng,
                is_addition: row.is_addition,
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
    }
}