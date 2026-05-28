import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { RowDataPacket } from "mysql2";

interface CollectionItem {
    id: number;
    name_ind: string;
    name_eng: string;
    description_ind: string;
    description_eng: string;
    image: string;
}

interface MstrCollectionRow extends RowDataPacket {
    id: number;
    name_ind: string;
    name_eng: string;
    items: string | CollectionItem[] | null;
}

/* ======================================================
    GET DATA - Fetch all collections with items
====================================================== */
export async function GET(request: NextRequest) {
    const connection = await dbWeb.getConnection();
    try {
        const query = `
            SELECT 
                mstr_collection.id,
                mstr_collection.name_ind,
                mstr_collection.name_eng,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', collection.id,
                        'name_ind', collection.name_ind,
                        'name_eng', collection.name_eng,
                        'description_ind', collection.description_ind,
                        'description_eng', collection.description_eng,
                        'image', collection.image
                    )
                ) as items
            FROM mstr_collection
            LEFT JOIN collection 
                ON collection.mstr_collection_id = mstr_collection.id
            GROUP BY 
                mstr_collection.id,
                mstr_collection.name_ind,
                mstr_collection.name_eng
            ORDER BY mstr_collection.created_at DESC
        `;

        const params: (number | string)[] = [];

        const [rows] = await connection.query<MstrCollectionRow[]>(query, params);

        // Parse JSON items untuk setiap row
        const processedRows = rows.map(row => {
            let items: CollectionItem[] = [];
            
            if (row.items) {
                // Cek apakah sudah object atau masih string
                if (typeof row.items === 'string') {
                    try {
                        items = JSON.parse(row.items);
                    } catch (e) {
                        items = [];
                    }
                } else {
                    items = row.items as CollectionItem[];
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
                items: items
            };
        });

        return NextResponse.json({
            success: true,
            data: processedRows,
        });

    } catch (error) {
        console.error('Error fetching collections:', error);
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