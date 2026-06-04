import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { RowDataPacket } from "mysql2";

interface OurMenuFood {
    id: number;
    name_ind: string;
    name_eng: string;
}

interface OurMenu {
    id: number;
    name_ind: string;
    name_eng: string;
    subname_ind: string;
    subname_eng: string;
    icon: string;
    foods: OurMenuFood[];
}

interface PackageInclude {
    id: number;
    name_ind: string;
    name_eng: string;
}

interface OurMenuPackage {
    id: number;
    name_ind: string;
    name_eng: string;
    description_ind: string;
    description_eng: string;
    icon: string;
    minimum_guest: number;
    is_popular: number;
    color: string;
    includes: PackageInclude[];
}

interface FoodPackageDetailRow extends RowDataPacket {
    id: number;
    type_catering_service_ind: string;
    type_catering_service_eng: string;
    name_ind: string;
    name_eng: string;
    description_ind: string;
    description_eng: string;
    minimum_pax: number;
    hours_service_min: number;
    hours_service_max: number;
    title_menu_ind: string;
    title_menu_eng: string;
    subtitle_menu_ind: string;
    subtitle_menu_eng: string;
    description_menu_ind: string;
    description_menu_eng: string;
    image: string;
    slug: string;
    our_menus: string | OurMenu[] | null;
    packages: string | OurMenuPackage[] | null;
}

/* ======================================================
    GET DATA - Fetch food package detail by slug
====================================================== */
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ slug: string }> }
) {
    const connection = await dbWeb.getConnection();
    try {
        const { slug } = await context.params;

        const query = `
            SELECT 
                food_packages.id,
                mstr_type_catering_service.name_ind as type_catering_service_ind,
                mstr_type_catering_service.name_eng as type_catering_service_eng,
                food_packages.name_ind,
                food_packages.name_eng,
                food_packages.description_ind,
                food_packages.description_eng,
                food_packages.minimum_pax,
                food_packages.hours_service_min,
                food_packages.hours_service_max,
                food_packages.title_menu_ind,
                food_packages.title_menu_eng,
                food_packages.subtitle_menu_ind,
                food_packages.subtitle_menu_eng,
                food_packages.description_menu_ind,
                food_packages.description_menu_eng,
                food_packages.image,
                food_packages.slug,
                (
                    SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'id', om.id,
                            'name_ind', om.name_ind,
                            'name_eng', om.name_eng,
                            'subname_ind', om.subname_ind,
                            'subname_eng', om.subname_eng,
                            'icon', om.icon,
                            'foods', (
                                SELECT JSON_ARRAYAGG(
                                    JSON_OBJECT(
                                        'id', omf.id,
                                        'name_ind', omf.name_ind,
                                        'name_eng', omf.name_eng
                                    )
                                )
                                FROM our_menu_food omf
                                WHERE omf.our_menu_id = om.id
                            )
                        )
                    )
                    FROM our_menu om
                    WHERE om.food_package_id = food_packages.id
                    ORDER BY om.index
                ) as our_menus,
                (
                    SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'id', omp.id,
                            'name_ind', omp.name_ind,
                            'name_eng', omp.name_eng,
                            'description_ind', omp.description_ind,
                            'description_eng', omp.description_eng,
                            'icon', omp.icon,
                            'minimum_guest', omp.minimum_guest,
                            'is_popular', omp.is_popular,
                            'color', omp.color,
                            'includes', (
                                SELECT JSON_ARRAYAGG(
                                    JSON_OBJECT(
                                        'id', pi.id,
                                        'name_ind', pi.name_ind,
                                        'name_eng', pi.name_eng
                                    )
                                )
                                FROM package_include pi
                                WHERE pi.our_menu_package_id = omp.id
                            )
                        )
                    )
                    FROM our_menu_package omp
                    WHERE omp.food_package_id = food_packages.id
                    ORDER BY omp.index
                ) as packages
            FROM food_packages
            LEFT JOIN mstr_type_catering_service ON food_packages.type_catering_service_id = mstr_type_catering_service.id
            WHERE food_packages.slug = ?
            LIMIT 1
        `;

        const queryParams: (number | string)[] = [slug];

        const [rows] = await connection.query<FoodPackageDetailRow[]>(query, queryParams);

        if (rows.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Food package not found"
                },
                { status: 404 }
            );
        }

        const row = rows[0];

        // Parse JSON fields
        let our_menus: OurMenu[] = [];
        let packages: OurMenuPackage[] = [];

        // Parse our_menus
        if (row.our_menus) {
            if (typeof row.our_menus === 'string') {
                try {
                    our_menus = JSON.parse(row.our_menus);
                } catch (e) {
                    our_menus = [];
                }
            } else {
                our_menus = row.our_menus as OurMenu[];
            }
            if (Array.isArray(our_menus)) {
                our_menus = our_menus.filter(m => m && m.id !== null).map(m => ({
                    ...m,
                    foods: Array.isArray(m.foods) ? m.foods.filter(f => f && f.id !== null) : []
                }));
            }
        }

        // Parse packages
        if (row.packages) {
            if (typeof row.packages === 'string') {
                try {
                    packages = JSON.parse(row.packages);
                } catch (e) {
                    packages = [];
                }
            } else {
                packages = row.packages as OurMenuPackage[];
            }
            if (Array.isArray(packages)) {
                packages = packages.filter(p => p && p.id !== null).map(p => ({
                    ...p,
                    includes: Array.isArray(p.includes) ? p.includes.filter(i => i && i.id !== null) : []
                }));
            }
        }

        const result = {
            id: row.id,
            type_catering_service_ind: row.type_catering_service_ind,
            type_catering_service_eng: row.type_catering_service_eng,
            name_ind: row.name_ind,
            name_eng: row.name_eng,
            description_ind: row.description_ind,
            description_eng: row.description_eng,
            minimum_pax: row.minimum_pax,
            hours_service_min: row.hours_service_min,
            hours_service_max: row.hours_service_max,
            title_menu_ind: row.title_menu_ind,
            title_menu_eng: row.title_menu_eng,
            subtitle_menu_ind: row.subtitle_menu_ind,
            subtitle_menu_eng: row.subtitle_menu_eng,
            description_menu_ind: row.description_menu_ind,
            description_menu_eng: row.description_menu_eng,
            image: row.image || '',
            slug: row.slug,
            our_menus: our_menus,
            packages: packages
        };

        return NextResponse.json({
            success: true,
            data: result,
        });

    } catch (error) {
        console.error('Error fetching food package detail:', error);
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