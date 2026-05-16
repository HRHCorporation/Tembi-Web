import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { RowDataPacket } from "mysql2";

interface CelebrateMomentItem {
    id: number;
    name_ind: string;
    name_eng: string;
}

interface CelebrateMomentRow extends RowDataPacket {
    id: number;
    name_ind: string;
    name_eng: string;
    description_ind: string;
    description_eng: string;
    image: string;
    items: string | CelebrateMomentItem[] | null;
}

/* ======================================================
    GET DATA - Fetch all celebrate moments with items
====================================================== */
export async function GET(request: NextRequest) {
    try {
        const query = `
            SELECT 
                celebrate_moment.id,
                celebrate_moment.name_ind,
                celebrate_moment.name_eng,
                celebrate_moment.description_ind,
                celebrate_moment.description_eng,
                celebrate_moment.image,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', celebrate_moment_list.id,
                        'name_ind', celebrate_moment_list.name_ind,
                        'name_eng', celebrate_moment_list.name_eng
                    )
                ) as items
            FROM celebrate_moment
            LEFT JOIN celebrate_moment_list 
                ON celebrate_moment_list.celebrate_moment_id = celebrate_moment.id
            GROUP BY 
                celebrate_moment.id,
                celebrate_moment.name_ind,
                celebrate_moment.name_eng,
                celebrate_moment.description_ind,
                celebrate_moment.description_eng,
                celebrate_moment.image
            ORDER BY celebrate_moment.created_at DESC
        `;

        const params: (number | string)[] = [];

        const [rows] = await dbWeb.query<CelebrateMomentRow[]>(query, params);

        // Parse JSON items untuk setiap row
        const processedRows = rows.map(row => {
            let items: CelebrateMomentItem[] = [];
            
            if (row.items) {
                // Cek apakah sudah object atau masih string
                if (typeof row.items === 'string') {
                    try {
                        items = JSON.parse(row.items);
                    } catch (e) {
                        items = [];
                    }
                } else {
                    items = row.items as CelebrateMomentItem[];
                }
                
                // Filter null values (jika LEFT JOIN tidak match)
                if (Array.isArray(items)) {
                    items = items.filter(item => item && item.id !== null);
                }
            }
            
            return {
                id: row.id,
                name_ind: row.name_ind,
                name_eng: row.name_eng,
                description_ind: row.description_ind,
                description_eng: row.description_eng,
                image: row.image || '',
                items: items
            };
        });

        return NextResponse.json({
            success: true,
            data: processedRows,
        });

    } catch (error) {
        console.error('Error fetching celebrate moments:', error);
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