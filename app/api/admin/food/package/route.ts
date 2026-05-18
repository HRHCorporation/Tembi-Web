import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { cookies } from "next/headers";
import { RowDataPacket } from "mysql2";

// ← tipe untuk data fasilitas
interface PackageRow extends RowDataPacket {
    id: number;
    name_id: string;
    name_eng: string;
    icon: string;
    minimum_guest: number;
    is_popular: boolean;
    package_name: string;
}

interface CountRow extends RowDataPacket {
    total: number;
}

// ← tipe untuk session cookie
interface SessionUser {
    name: string;
    email: string;
}

interface PackageInclude {
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
        const [rows] = await dbWeb.query<PackageRow[]>(  // ← ganti any
            `
            SELECT our_menu_package.id, our_menu_package.name_ind, our_menu_package.name_eng, our_menu_package.icon, our_menu_package.minimum_guest, our_menu_package.is_popular, food_packages.name_ind as package_name
            FROM our_menu_package
            JOIN food_packages ON our_menu_package.food_package_id = food_packages.id
            WHERE our_menu_package.name_ind LIKE ? OR our_menu_package.name_eng LIKE ?
            ORDER BY ${sortBy} ${sortOrder}
            LIMIT ? OFFSET ?
            `,
            [`%${search}%`, `%${search}%`, limit, offset]
        );
        const [totalRows] = await dbWeb.query<CountRow[]>(  // ← ganti any
            `
            SELECT COUNT(*) as total
            FROM our_menu_package
            WHERE our_menu_package.name_ind LIKE ? OR our_menu_package.name_eng LIKE ?
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
        const description_ind = formData.get("description_ind") as string;
        const description_eng = formData.get("description_eng") as string;
        const icon = formData.get("icon") as string;
        const minimum_guest = parseInt(formData.get("minimum_guest") as string);
        const is_popular = formData.get("is_popular") === "1" ? 1 : 0;
        const color = formData.get("color") as string;

        const packageIncludeJson = formData.get("package_include") as string;
        const packageInclude = JSON.parse(packageIncludeJson) as PackageInclude[];

        // Validation
        const errors: ErrorResponse = {};

        if (!food_package_id) {
            errors.food_package_id = "Food package wajib dipilih";
        }
        if (!name_ind?.trim()) {
            errors.name_ind = "Nama Package Indonesia wajib diisi";
        }
        if (!name_eng?.trim()) {
            errors.name_eng = "Nama Package English wajib diisi";
        }
        if (!description_ind?.trim()) {
            errors.description_ind = "Deskripsi Indonesia wajib diisi";
        }
        if (!description_eng?.trim()) {
            errors.description_eng = "Deskripsi English wajib diisi";
        }
        if (!icon?.trim()) {
            errors.icon = "Icon wajib diisi";
        }
        if (!minimum_guest || minimum_guest < 1) {
            errors.minimum_guest = "Minimum guest wajib diisi";
        }
        if (!color) {
            errors.color = "Warna wajib dipilih";
        }
        if (packageInclude.length === 0) {
            errors.package_include = "Minimal 1 package include wajib ditambahkan";
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
            if (is_popular === 1) {
                const [existingPopular] = await connection.query(
                    "SELECT id FROM our_menu_package WHERE food_package_id = ? AND is_popular = 1 LIMIT 1",
                    [parseInt(food_package_id)]
                );

                if (Array.isArray(existingPopular) && existingPopular.length > 0) {
                    // Return error jika sudah ada yang populer
                    return NextResponse.json({
                        success: false,
                        message: "Package populer untuk food package ini sudah ada...",
                    }, { status: 400 });
                }
            }
            // ✅ Insert ke our_menu_package
            const [result] = await connection.query(
                `
                INSERT INTO our_menu_package (food_package_id, name_ind, name_eng, description_ind, description_eng, icon, minimum_guest, is_popular, color, created_by, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
                `,
                [
                    parseInt(food_package_id),
                    name_ind,
                    name_eng,
                    description_ind,
                    description_eng,
                    icon,
                    minimum_guest,
                    is_popular,
                    color,
                    createdBy,
                ]
            );

            const packageId = (result as unknown as { insertId: number }).insertId;

            // ✅ Insert package_include
            for (const include of packageInclude) {
                await connection.query(
                    `
                    INSERT INTO package_include (our_menu_package_id, name_ind, name_eng, created_by, created_at)
                    VALUES (?, ?, ?, ?, NOW())
                    `,
                    [packageId, include.name_ind, include.name_eng, createdBy]
                );
            }

            await connection.commit();
            connection.release();

            return NextResponse.json(
                {
                    success: true,
                    message: "Package berhasil ditambahkan",
                    data: { id: packageId },
                },
                { status: 201 }
            );
        } catch (transactionError) {
            await connection.rollback();
            connection.release();
            throw transactionError;
        }
    } catch (error) {
        console.error("[CREATE_PACKAGE_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Terjadi kesalahan server" },
            { status: 500 }
        );
    }
}
