import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { RowDataPacket } from "mysql2";

interface MenuFood {
    id: number;
    name_ind: string;
    name_eng: string;
    description_menu_highlight_ind: string;
    description_menu_highlight_eng: string;
}

interface FoodPackageHighlightRow extends RowDataPacket {
    id: number;
    name_ind: string;
    name_eng: string;
    menu_foods: string | MenuFood[] | null;
}

/* ======================================================
    GET DATA - Fetch food packages with menu highlights
====================================================== */
export async function GET(request: NextRequest) {
    const connection = await dbWeb.getConnection();
    try {
        const query = `
            SELECT 
                food_packages.id,
                food_packages.name_ind,
                food_packages.name_eng,
                food_packages.description_menu_highlight_ind,
                food_packages.description_menu_highlight_eng,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', our_menu_food.id,
                        'name_ind', our_menu_food.name_ind,
                        'name_eng', our_menu_food.name_eng,
                        'image', our_menu_highlight.image,
                        'description_ind', our_menu_highlight.description_ind,
                        'description_eng', our_menu_highlight.description_eng
                    )
                ) as menu_foods
            FROM food_packages
            LEFT JOIN our_menu_highlight 
                ON our_menu_highlight.food_package_id = food_packages.id
            LEFT JOIN our_menu_food 
                ON our_menu_food.id = our_menu_highlight.our_menu_food_id
            GROUP BY 
                food_packages.id,
                food_packages.name_ind,
                food_packages.name_eng
            ORDER BY food_packages.created_at DESC
        `;

        const params: (number | string)[] = [];

        const [rows] = await connection.query<FoodPackageHighlightRow[]>(query, params);

        // Parse JSON menu_foods untuk setiap row
        const processedRows = rows.map(row => {
            let menu_foods: MenuFood[] = [];
            
            if (row.menu_foods) {
                // Cek apakah sudah object atau masih string
                if (typeof row.menu_foods === 'string') {
                    try {
                        menu_foods = JSON.parse(row.menu_foods);
                    } catch (e) {
                        menu_foods = [];
                    }
                } else {
                    menu_foods = row.menu_foods as MenuFood[];
                }
                
                // Filter null values (jika LEFT JOIN tidak match)
                if (Array.isArray(menu_foods)) {
                    menu_foods = menu_foods.filter(f => f && f.id !== null);
                }
            }
            
            return {
                id: row.id,
                name_ind: row.name_ind,
                name_eng: row.name_eng,
                description_menu_highlight_ind: row.description_menu_highlight_ind,
                description_menu_highlight_eng: row.description_menu_highlight_eng,
                menu_foods: menu_foods
            };
        });

        return NextResponse.json({
            success: true,
            data: processedRows,
        });

    } catch (error) {
        console.error('Error fetching food package highlights:', error);
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