import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";

interface OurMenuFood {
    id: number;
    name_ind: string;
    name_eng: string;
}

// ✅ GET - Fetch menu food by food_package_id
export async function GET(
    req: NextRequest,
    { params }: { params: { foodPackageId: string } }
) {
    const { foodPackageId } = await params;
    const packageId = Number(foodPackageId);

    try {
        // Join our_menu dengan our_menu_food berdasarkan food_package_id
        const [menuFoods] = await dbWeb.query(
            `
            SELECT omf.id, omf.name_ind, omf.name_eng
            FROM our_menu_food omf
            INNER JOIN our_menu om ON omf.our_menu_id = om.id
            WHERE om.food_package_id = ?
            ORDER BY omf.id ASC
            `,
            [packageId]
        );

        return NextResponse.json({
            success: true,
            data: (menuFoods as OurMenuFood[]) || [],
        });
    } catch (error) {
        console.error("[GET_MENU_FOOD_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Gagal mengambil data menu food" },
            { status: 500 }
        );
    }
}