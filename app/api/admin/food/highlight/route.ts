import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { cookies } from "next/headers";
import { RowDataPacket } from "mysql2";
import sharp from "sharp";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// ← tipe untuk data fasilitas
interface HighlightRow extends RowDataPacket {
    id: number;
    package_name: string;
    food_name: string;
    description_ind: string;
}

interface CountRow extends RowDataPacket {
    total: number;
}

// ← tipe untuk session cookie
interface SessionUser {
    name: string;
    email: string;
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
        const [rows] = await dbWeb.query<HighlightRow[]>(  // ← ganti any
            `
            SELECT our_menu_highlight.id, food_packages.name_ind as package_name, our_menu_food.name_ind as food_name, our_menu_highlight.description_ind
            FROM our_menu_highlight
            JOIN food_packages ON our_menu_highlight.food_package_id = food_packages.id
            JOIN our_menu_food ON our_menu_highlight.our_menu_food_id = our_menu_food.id
            WHERE food_packages.name_ind LIKE ? OR food_packages.name_eng LIKE ? OR our_menu_food.name_ind LIKE ? OR our_menu_food.name_eng LIKE ?
            ORDER BY ${sortBy} ${sortOrder}
            LIMIT ? OFFSET ?
            `,
            [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, limit, offset]
        );
        const [totalRows] = await dbWeb.query<CountRow[]>(  // ← ganti any
            `
            SELECT COUNT(*) as total
            FROM our_menu_highlight
            JOIN food_packages ON our_menu_highlight.food_package_id = food_packages.id
            JOIN our_menu_food ON our_menu_highlight.our_menu_food_id = our_menu_food.id
            WHERE food_packages.name_ind LIKE ? OR food_packages.name_eng LIKE ? OR our_menu_food.name_ind LIKE ? OR our_menu_food.name_eng LIKE ?
            `,
            [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`]
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
        const our_menu_food_id = formData.get("our_menu_food_id") as string;
        const description_ind = formData.get("description_ind") as string;
        const description_eng = formData.get("description_eng") as string;
        const imageFile = formData.get("image") as File;

        // Validation
        const errors: ErrorResponse = {};

        if (!food_package_id) {
            errors.food_package_id = "Food package wajib dipilih";
        }
        if (!our_menu_food_id) {
            errors.our_menu_food_id = "Menu food wajib dipilih";
        }
        if (!description_ind?.trim()) {
            errors.description_ind = "Deskripsi Indonesia wajib diisi";
        }
        if (!description_eng?.trim()) {
            errors.description_eng = "Deskripsi English wajib diisi";
        }
        if (!imageFile) {
            errors.image = "Image wajib diupload";
        }

        if (Object.keys(errors).length > 0) {
            connection.release();
            return NextResponse.json(
                { success: false, message: "Validasi gagal", errors },
                { status: 400 }
            );
        }

        // ✅ Process image
        const bytes = await imageFile!.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `highlight-${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 8)}.webp`;

        const uploadDir = path.join(process.cwd(), "public/images/upload/food-highlight");

        await mkdir(uploadDir, { recursive: true });

        const filePath = path.join(uploadDir, filename);

        await sharp(buffer)
            .resize({
                width: 1920,
                withoutEnlargement: true,
            })
            .webp({ quality: 80 })
            .toFile(filePath);

        // ✅ Insert ke our_menu_highlight
        await connection.beginTransaction();

        try {
            const [result] = await connection.query(
                `
                INSERT INTO our_menu_highlight (food_package_id, our_menu_food_id, image, description_ind, description_eng, created_by, created_at)
                VALUES (?, ?, ?, ?, ?, ?, NOW())
                `,
                [
                    parseInt(food_package_id),
                    parseInt(our_menu_food_id),
                    `/images/upload/food-highlight/${filename}`,
                    description_ind,
                    description_eng,
                    createdBy,
                ]
            );

            const highlightId = (result as unknown as { insertId: number }).insertId;

            await connection.commit();
            connection.release();

            return NextResponse.json(
                {
                    success: true,
                    message: "Highlight berhasil ditambahkan",
                    data: { id: highlightId },
                },
                { status: 201 }
            );
        } catch (transactionError) {
            await connection.rollback();
            connection.release();
            throw transactionError;
        }
    } catch (error) {
        console.error("[CREATE_HIGHLIGHT_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Terjadi kesalahan server" },
            { status: 500 }
        );
    }
}
