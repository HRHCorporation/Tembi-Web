import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbWeb from "@/lib/db-web";

interface SessionUser {
    name: string;
    email: string;
}

interface OurMenuFoodItem {
    name_ind: string;
    name_eng: string;
    id?: number;
}

interface ErrorResponse {
    [key: string]: string;
}

// ✅ GET - Fetch menu by ID
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const menuId = Number(id);

    try {
        // Fetch our_menu
        const [menus] = await dbWeb.query(
            "SELECT * FROM our_menu WHERE id = ?",
            [menuId]
        );

        if (!Array.isArray(menus) || menus.length === 0) {
            return NextResponse.json(
                { success: false, message: "Data tidak ditemukan" },
                { status: 404 }
            );
        }

        // Fetch our_menu_food
        const [foods] = await dbWeb.query(
            "SELECT id, name_ind, name_eng FROM our_menu_food WHERE our_menu_id = ?",
            [menuId]
        );

        return NextResponse.json({
            success: true,
            data: {
                ...(menus[0] as Record<string, unknown>),
                our_menu_food: foods || [],
            },
        });
    } catch (error) {
        console.error("[GET_MENU_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Gagal mengambil data" },
            { status: 500 }
        );
    }
}

// ✅ PUT - Update menu
export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const menuId = Number(id);
    const connection = await dbWeb.getConnection();

    try {
        const cookieStore = await cookies();
        const session = cookieStore.get(
            process.env.COOKIE_NAME || "admin_session_tembi"
        );

        let updatedBy = "system";
        if (session?.value) {
            const user = JSON.parse(session.value) as SessionUser;
            updatedBy = user.name;
        }

        const formData = await req.formData();

        // Extract form data
        const food_package_id = formData.get("food_package_id") as string;
        const name_ind = formData.get("name_ind") as string;
        const name_eng = formData.get("name_eng") as string;
        const subname_ind = formData.get("subname_ind") as string;
        const subname_eng = formData.get("subname_eng") as string;
        const icon = formData.get("icon") as string;

        const ourMenuFoodJson = formData.get("our_menu_food") as string;
        const deletedFoodIdsJson = formData.get("deleted_food_ids") as string;

        const ourMenuFood = JSON.parse(ourMenuFoodJson) as OurMenuFoodItem[];
        const deletedFoodIds = JSON.parse(deletedFoodIdsJson) as number[];

        // Validation
        const errors: ErrorResponse = {};

        if (!name_ind?.trim()) errors.name_ind = "Nama Menu Indonesia wajib diisi";
        if (!name_eng?.trim()) errors.name_eng = "Nama Menu English wajib diisi";
        if (!subname_ind?.trim()) errors.subname_ind = "Subname Menu Indonesia wajib diisi";
        if (!subname_eng?.trim()) errors.subname_eng = "Subname Menu English wajib diisi";
        if (!icon?.trim()) errors.icon = "Icon wajib diisi";

        if (Object.keys(errors).length > 0) {
            connection.release();
            return NextResponse.json(
                { success: false, message: "Validasi gagal", errors },
                { status: 400 }
            );
        }

        await connection.beginTransaction();

        try {
            // ✅ Update our_menu
            await connection.query(
                `
                UPDATE our_menu SET
                    food_package_id = ?, name_ind = ?, name_eng = ?,
                    subname_ind = ?, subname_eng = ?, icon = ?,
                    updated_by = ?, updated_at = NOW()
                WHERE id = ?
                `,
                [
                    parseInt(food_package_id),
                    name_ind,
                    name_eng,
                    subname_ind,
                    subname_eng,
                    icon,
                    updatedBy,
                    menuId,
                ]
            );

            // ✅ Delete removed food items
            if (deletedFoodIds.length > 0) {
                await connection.query(
                    `DELETE FROM our_menu_food WHERE id IN (${deletedFoodIds.map(() => "?").join(",")}) AND our_menu_id = ?`,
                    [...deletedFoodIds, menuId]
                );
            }

            // ✅ Insert new food items (those without id)
            for (const food of ourMenuFood) {
                if (!food.id) {
                    await connection.query(
                        `
                        INSERT INTO our_menu_food (our_menu_id, name_ind, name_eng, created_by, created_at)
                        VALUES (?, ?, ?, ?, NOW())
                        `,
                        [menuId, food.name_ind, food.name_eng, updatedBy]
                    );
                }
            }

            await connection.commit();
            connection.release();

            return NextResponse.json({
                success: true,
                message: "Menu berhasil diperbarui",
                data: { id: menuId },
            });
        } catch (transactionError) {
            await connection.rollback();
            connection.release();
            throw transactionError;
        }
    } catch (error) {
        console.error("[UPDATE_MENU_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Terjadi kesalahan server" },
            { status: 500 }
        );
    }
}

// ✅ DELETE - Delete menu with cascade
export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const menuId = Number(id);
    const connection = await dbWeb.getConnection();

    try {
        await connection.beginTransaction();

        try {
            // ✅ Delete child records dari our_menu_food terlebih dahulu
            await connection.query(
                "DELETE FROM our_menu_food WHERE our_menu_id = ?",
                [menuId]
            );

            // ✅ Delete parent record dari our_menu
            const [result] = await connection.query(
                "DELETE FROM our_menu WHERE id = ?",
                [menuId]
            );

            const deletedResult = result as unknown as { affectedRows: number };
            if (deletedResult.affectedRows === 0) {
                await connection.rollback();
                connection.release();
                return NextResponse.json(
                    { success: false, message: "Data tidak ditemukan" },
                    { status: 404 }
                );
            }

            await connection.commit();
            connection.release();

            return NextResponse.json({
                success: true,
                message: "Menu berhasil dihapus",
            });
        } catch (transactionError) {
            await connection.rollback();
            connection.release();
            throw transactionError;
        }
    } catch (error) {
        console.error("[DELETE_MENU_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Gagal menghapus menu" },
            { status: 500 }
        );
    }
}