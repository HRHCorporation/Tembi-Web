import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { cookies } from "next/headers";
import { RowDataPacket } from "mysql2";

// ← tipe untuk data fasilitas
interface MenuRow extends RowDataPacket {
    id: number;
    name_ind: string;
    name_eng: string;
    icon: string;
    subname_ind: string;
    subname_eng: string;
    catering_name: string;
}

interface CountRow extends RowDataPacket {
    total: number;
}

// ← tipe untuk session cookie
interface SessionUser {
    name: string;
    email: string;
}

interface OurMenuFood {
    name_ind: string;
    name_eng: string;
}

interface ErrorResponse {
    [key: string]: string;
}

/* ======================================================
    GET DATA
====================================================== */
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const page = Number(searchParams.get("page") || 1);
        const limit = Number(searchParams.get("limit") || 10);
        const search = searchParams.get("search") || "";
        const offset = (page - 1) * limit;
        const sortBy = searchParams.get("sortBy") || "id";
        const sortOrder = searchParams.get("sortOrder") || "DESC";
        const [rows] = await dbWeb.query<MenuRow[]>(  // ← ganti any
            `
            SELECT our_menu.id, our_menu.name_ind, our_menu.name_eng, our_menu.icon, our_menu.subname_ind, our_menu.subname_eng, food_packages.name_ind AS catering_name
            FROM our_menu
            JOIN food_packages ON our_menu.food_package_id = food_packages.id
            WHERE our_menu.name_ind LIKE ? OR our_menu.name_eng LIKE ?
            ORDER BY ${sortBy} ${sortOrder}
            LIMIT ? OFFSET ?
            `,
            [`%${search}%`, `%${search}%`, limit, offset]
        );
        const [totalRows] = await dbWeb.query<CountRow[]>(  // ← ganti any
            `
            SELECT COUNT(*) as total
            FROM our_menu
            WHERE our_menu.name_ind LIKE ? OR our_menu.name_eng LIKE ?
            `,
            [`%${search}%`, `%${search}%`]
        );
        const total = totalRows[0].total;
        const totalPages = Math.ceil(total / limit);
        return NextResponse.json({
            success: true,
            data: rows,
            pagination: {
                total,
                totalPages,
            },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Failed to fetch data" }, { status: 500 });
    }
}

/* ======================================================
    CREATE DATA
====================================================== */
export async function POST(request: NextRequest) {
    const connection = await dbWeb.getConnection();

    try {
        const cookieStore = await cookies();
        const session = cookieStore.get(
            process.env.COOKIE_NAME || "admin_session_tembi"
        );

        let createdBy = "system";
        if (session?.value) {
            const user = JSON.parse(session.value) as SessionUser;
            createdBy = user.name;
        }

        const formData = await request.formData();

        // Extract form data
        const food_package_id = formData.get("food_package_id") as string;
        const name_ind = formData.get("name_ind") as string;
        const name_eng = formData.get("name_eng") as string;
        const subname_ind = formData.get("subname_ind") as string;
        const subname_eng = formData.get("subname_eng") as string;
        const icon = formData.get("icon") as string;

        const ourMenuFoodJson = formData.get("our_menu_food") as string;
        const ourMenuFood = JSON.parse(ourMenuFoodJson) as OurMenuFood[];

        // Validation
        const errors: ErrorResponse = {};

        if (!food_package_id) {
            errors.food_package_id = "Food package wajib dipilih";
        }
        if (!name_ind?.trim()) {
            errors.name_ind = "Nama Menu Indonesia wajib diisi";
        }
        if (!name_eng?.trim()) {
            errors.name_eng = "Nama Menu English wajib diisi";
        }
        if (!subname_ind?.trim()) {
            errors.subname_ind = "Subname Menu Indonesia wajib diisi";
        }
        if (!subname_eng?.trim()) {
            errors.subname_eng = "Subname Menu English wajib diisi";
        }
        if (!icon?.trim()) {
            errors.icon = "Icon wajib diisi";
        }
        if (ourMenuFood.length === 0) {
            errors.our_menu_food = "Minimal 1 menu food wajib ditambahkan";
        }

        if (Object.keys(errors).length > 0) {
            connection.release();
            return NextResponse.json(
                { success: false, message: "Validasi gagal", errors },
                { status: 400 }
            );
        }

        // Start transaction
        await connection.beginTransaction();

        try {
            // ✅ Insert ke our_menu
            const [result] = await connection.query(
                `
                INSERT INTO our_menu (food_package_id, name_ind, name_eng, subname_ind, subname_eng, icon, created_by, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
                `,
                [
                    parseInt(food_package_id),
                    name_ind,
                    name_eng,
                    subname_ind,
                    subname_eng,
                    icon,
                    createdBy,
                ]
            );

            const menuId = (result as unknown as { insertId: number }).insertId;

            // ✅ Insert our_menu_food
            for (const food of ourMenuFood) {
                await connection.query(
                    `
                    INSERT INTO our_menu_food (our_menu_id, name_ind, name_eng, created_by, created_at)
                    VALUES (?, ?, ?, ?, NOW())
                    `,
                    [menuId, food.name_ind, food.name_eng, createdBy]
                );
            }

            await connection.commit();
            connection.release();

            return NextResponse.json(
                {
                    success: true,
                    message: "Menu berhasil ditambahkan",
                    data: { id: menuId },
                },
                { status: 201 }
            );
        } catch (transactionError) {
            await connection.rollback();
            connection.release();
            throw transactionError;
        }
    } catch (error) {
        console.error("[CREATE_MENU_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Terjadi kesalahan server" },
            { status: 500 }
        );
    }
}
