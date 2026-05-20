import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { RowDataPacket } from "mysql2";

interface PrimaryFood {
    id: number;
    name_ind: string;
    name_eng: string;
}

interface FoodPackageRow extends RowDataPacket {
    id: number;
    name_ind: string;
    name_eng: string;
    description_card_ind: string;
    description_card_eng: string;
    subtitle_menu_ind: string;
    subtitle_menu_eng: string;
    minimum_pax: number;
    image: string;
    primary_foods: string | PrimaryFood[] | null;
    slug: string;
}

/* ======================================================
    GET DATA - Fetch all food packages with primary foods
====================================================== */
export async function GET(request: NextRequest) {
    try {
        const query = `
            SELECT 
                food_packages.id,
                food_packages.name_ind,
                food_packages.name_eng,
                food_packages.description_card_ind,
                food_packages.description_card_eng,
                food_packages.subtitle_menu_ind,
                food_packages.subtitle_menu_eng,
                food_packages.minimum_pax,
                food_packages.image,
                food_packages.slug,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', food_packages_primary.id,
                        'name_ind', food_packages_primary.name_ind,
                        'name_eng', food_packages_primary.name_eng
                    )
                ) as primary_foods
            FROM food_packages
            LEFT JOIN food_packages_primary 
                ON food_packages_primary.food_packages_id = food_packages.id
            GROUP BY 
                food_packages.id,
                food_packages.name_ind,
                food_packages.name_eng,
                food_packages.description_card_ind,
                food_packages.description_card_eng,
                food_packages.subtitle_menu_ind,
                food_packages.subtitle_menu_eng,
                food_packages.minimum_pax,
                food_packages.image,
                food_packages.slug
            ORDER BY food_packages.created_at DESC
        `;

        const params: (number | string)[] = [];

        const [rows] = await dbWeb.query<FoodPackageRow[]>(query, params);

        // Parse JSON primary_foods untuk setiap row
        const processedRows = rows.map(row => {
            let primary_foods: PrimaryFood[] = [];
            
            if (row.primary_foods) {
                // Cek apakah sudah object atau masih string
                if (typeof row.primary_foods === 'string') {
                    try {
                        primary_foods = JSON.parse(row.primary_foods);
                    } catch (e) {
                        primary_foods = [];
                    }
                } else {
                    primary_foods = row.primary_foods as PrimaryFood[];
                }
                
                // Filter null values (jika LEFT JOIN tidak match)
                if (Array.isArray(primary_foods)) {
                    primary_foods = primary_foods.filter(f => f && f.id !== null);
                }
            }
            
            return {
                id: row.id,
                name_ind: row.name_ind,
                name_eng: row.name_eng,
                description_card_ind: row.description_card_ind,
                description_card_eng: row.description_card_eng,
                subtitle_menu_ind: row.subtitle_menu_ind,
                subtitle_menu_eng: row.subtitle_menu_eng,
                minimum_pax: row.minimum_pax,
                image: row.image || '',
                slug: row.slug,
                primary_foods: primary_foods
            };
        });

        return NextResponse.json({
            success: true,
            data: processedRows,
        });

    } catch (error) {
        console.error('Error fetching food packages:', error);
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