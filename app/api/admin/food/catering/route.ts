import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { cookies } from "next/headers";
import { RowDataPacket } from "mysql2";
import path from "path/win32";
import fs from "fs";
import sharp from "sharp";

// ← tipe untuk data fasilitas
interface CateringRow extends RowDataPacket {
    id: number;
    name_ind: string;
    name_eng: string;
    minimum_pax: number;
    hours_service_min: number;
    hours_service_max: number;
    type_catering_service: string;
}

interface CountRow extends RowDataPacket {
    total: number;
}

// ← tipe untuk session cookie
interface SessionUser {
    name: string;
    email: string;
}

interface FoodPackagePrimary {
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
        const [rows] = await dbWeb.query<CateringRow[]>(  // ← ganti any
            `
            SELECT food_packages.id, food_packages.name_ind, food_packages.name_eng, food_packages.minimum_pax, food_packages.hours_service_min, food_packages.hours_service_max,  mstr_type_catering_service.name_eng AS type_catering_service
            FROM food_packages
            JOIN mstr_type_catering_service ON food_packages.type_catering_service_id = mstr_type_catering_service.id
            WHERE food_packages.name_ind LIKE ? OR food_packages.name_eng LIKE ?
            ORDER BY ${sortBy} ${sortOrder}
            LIMIT ? OFFSET ?
            `,
            [`%${search}%`, `%${search}%`, limit, offset]
        );
        const [totalRows] = await dbWeb.query<CountRow[]>(  // ← ganti any
            `
            SELECT COUNT(*) as total
            FROM food_packages
            WHERE food_packages.name_ind LIKE ? OR food_packages.name_eng LIKE ?
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
        const type_catering_service_id = formData.get("type_catering_service_id") as string;
        const name_ind = formData.get("name_ind") as string;
        const name_eng = formData.get("name_eng") as string;
        const description_ind = formData.get("description_ind") as string;
        const description_eng = formData.get("description_eng") as string;
        const minimum_pax = parseInt(formData.get("minimum_pax") as string);
        const hours_service_min = parseInt(formData.get("hours_service_min") as string);
        const hours_service_max = parseInt(formData.get("hours_service_max") as string);
        const title_menu_ind = formData.get("title_menu_ind") as string;
        const title_menu_eng = formData.get("title_menu_eng") as string;
        const description_menu_ind = formData.get("description_menu_ind") as string;
        const description_menu_eng = formData.get("description_menu_eng") as string;
        const description_card_ind = formData.get("description_card_ind") as string;
        const description_card_eng = formData.get("description_card_eng") as string;
        const subtitle_menu_ind = formData.get("subtitle_menu_ind") as string || "";
        const subtitle_menu_eng = formData.get("subtitle_menu_eng") as string || "";
        const slug = formData.get("slug") as string;
        const image = formData.get("image") as File;
        const description_menu_highlight_ind = formData.get("description_menu_highlight_ind") as string;
        const description_menu_highlight_eng = formData.get("description_menu_highlight_eng") as string;

        const foodPackagesPrimaryJson = formData.get("food_packages_primary") as string;
        const foodPackagesPrimary = JSON.parse(foodPackagesPrimaryJson) as FoodPackagePrimary[];

        // Validation
        const errors: ErrorResponse = {};

        if (!type_catering_service_id) {
            errors.type_catering_service_id = "Jenis catering wajib dipilih";
        }
        if (!name_ind?.trim()) {
            errors.name_ind = "Nama Indonesia wajib diisi";
        }
        if (!name_eng?.trim()) {
            errors.name_eng = "Nama English wajib diisi";
        }
        if (!description_ind?.trim()) {
            errors.description_ind = "Deskripsi Indonesia wajib diisi";
        }
        if (!description_eng?.trim()) {
            errors.description_eng = "Deskripsi English wajib diisi";
        }
        if (!minimum_pax || minimum_pax < 1) {
            errors.minimum_pax = "Minimum pax wajib diisi";
        }
        if (!title_menu_ind?.trim()) {
            errors.title_menu_ind = "Title menu Indonesia wajib diisi";
        }
        if (!title_menu_eng?.trim()) {
            errors.title_menu_eng = "Title menu English wajib diisi";
        }
        if (!description_menu_ind?.trim()) {
            errors.description_menu_ind = "Deskripsi menu Indonesia wajib diisi";
        }
        if (!description_menu_eng?.trim()) {
            errors.description_menu_eng = "Deskripsi menu English wajib diisi";
        }
        if (!description_card_ind?.trim()) {
            errors.description_card_ind = "Deskripsi card Indonesia wajib diisi";
        }
        if (!description_card_eng?.trim()) {
            errors.description_card_eng = "Deskripsi card English wajib diisi";
        }
        if (!subtitle_menu_ind?.trim()) {
            errors.subtitle_menu_ind = "Subtitle menu Indonesia wajib diisi";
        }
        if (!subtitle_menu_eng?.trim()) {
            errors.subtitle_menu_eng = "Subtitle menu English wajib diisi";
        }
        if (!description_menu_highlight_ind?.trim()) {
            errors.description_menu_highlight_ind = "Deskripsi menu highlight Indonesia wajib diisi";
        }
        if (!description_menu_highlight_eng?.trim()) {
            errors.description_menu_highlight_eng = "Deskripsi menu highlight English wajib diisi";
        }

        if (Object.keys(errors).length > 0) {
            connection.release();
            return NextResponse.json(
                { success: false, message: "Validasi gagal", errors },
                { status: 400 }
            );
        }

        if (!image) {
            errors.image = "Image wajib diisi";
        }

        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `catering-${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 8)}.webp`;

        const uploadDir = path.join(process.cwd(), "public/images/upload/catering");

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // const filePath = path.join(uploadDir, filename);

        await sharp(buffer)
            .resize(1920, 1080)
            .webp({ quality: 80 })
            .toFile(path.join(uploadDir, filename));


        // Start transaction
        await connection.beginTransaction();

        try {
            // ✅ Insert ke food_packages
            const [result] = await connection.query(
                `
                INSERT INTO food_packages 
                (type_catering_service_id, name_ind, name_eng, description_ind, description_eng, 
                 minimum_pax, hours_service_min, hours_service_max, title_menu_ind, title_menu_eng,
                 description_menu_ind, description_menu_eng, description_card_ind, description_card_eng,
                 slug, created_by, created_at, subtitle_menu_ind, subtitle_menu_eng, image, description_menu_highlight_ind, description_menu_highlight_eng)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?)
                `,
                [
                    parseInt(type_catering_service_id),
                    name_ind,
                    name_eng,
                    description_ind,
                    description_eng,
                    minimum_pax,
                    hours_service_min,
                    hours_service_max,
                    title_menu_ind,
                    title_menu_eng,
                    description_menu_ind,
                    description_menu_eng,
                    description_card_ind,
                    description_card_eng,
                    slug,
                    createdBy,
                    subtitle_menu_ind,
                    subtitle_menu_eng,
                    `/images/upload/catering/${filename}`,
                    description_menu_highlight_ind,
                    description_menu_highlight_eng
                ]
            );

            const packageId = (result as unknown as { insertId: number }).insertId;

            // ✅ Insert food_packages_primary
            for (const primary of foodPackagesPrimary) {
                await connection.query(
                    `
                    INSERT INTO food_packages_primary (food_packages_id, name_ind, name_eng, created_by, created_at)
                    VALUES (?, ?, ?, ?, NOW())
                    `,
                    [packageId, primary.name_ind, primary.name_eng, createdBy]
                );
            }

            await connection.commit();
            connection.release();

            return NextResponse.json(
                {
                    success: true,
                    message: "Food package berhasil ditambahkan",
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
        console.error("[CREATE_FOOD_PACKAGE_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Terjadi kesalahan server" },
            { status: 500 }
        );
    }
}
