import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import path from "path";
import fs from "fs";
import sharp from "sharp";
import { cookies } from "next/headers";
import { RowDataPacket } from "mysql2";

// ← tipe untuk data carousel
interface CarouselRow extends RowDataPacket {
    id: number;
    title_ind: string;
    title_eng: string;
    is_active: number;
    image: string;
    created_at: Date;
}

// ← tipe untuk COUNT query
interface CountRow extends RowDataPacket {
    total: number;
}

// ← tipe untuk session cookie
interface SessionUser {
    name: string;
    email: string;
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

        const [rows] = await dbWeb.query<CarouselRow[]>(  // ← ganti any
            `
            SELECT id, image, title_ind, title_eng, is_active, created_at
            FROM carousels
            WHERE title_ind LIKE ? OR title_eng LIKE ?
            ORDER BY ${sortBy} ${sortOrder}
            LIMIT ? OFFSET ?
            `,
            [`%${search}%`, `%${search}%`, limit, offset]
        );

        const [totalRows] = await dbWeb.query<CountRow[]>(  // ← ganti any
            `
            SELECT COUNT(*) as total
            FROM carousels
            WHERE title_ind LIKE ? OR title_eng LIKE ?
            `,
            [`%${search}%`, `%${search}%`]
        );

        const total = totalRows[0].total;

        return NextResponse.json({
            success: true,
            data: rows,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}


/* ======================================================
   CREATE DATA
====================================================== */
export async function POST(request: NextRequest) {

    const cookieStore = await cookies();

    const session = cookieStore.get(
        process.env.COOKIE_NAME || "admin_session_tembi"
    );

    let createdBy = "system";

    if (session?.value) {
        const user = JSON.parse(session.value) as SessionUser;  // ← ganti any
        createdBy = user.name;
    }

    try {

        const formData = await request.formData();
        const titleInd = formData.get("title_ind") as string;
        const titleEng = formData.get("title_eng") as string;
        const isActive = formData.get("is_active") as string;
        const image = formData.get("image") as File;

        if (!titleInd || !titleEng || !image) {
            return NextResponse.json(
                { success: false, message: "Semua field wajib diisi" },
                { status: 422 }
            );
        }

        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const filename = `carousel-${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 8)}.webp`;

        const uploadDir = path.join(process.cwd(), "public/images/upload/carousel");

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, filename);

        await sharp(buffer)
            .resize(1920, 1080)
            .webp({ quality: 80 })
            .toFile(filePath);

        await dbWeb.query(
            `
            INSERT INTO carousels (image, title_ind, title_eng, is_active, created_by, created_at)
            VALUES (?, ?, ?, ?, ?, NOW())
            `,
            [`/images/upload/carousel/${filename}`, titleInd, titleEng, isActive, createdBy]
        );

        return NextResponse.json({
            success: true,
            message: "Carousel berhasil ditambahkan",
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: "Gagal menyimpan data" },
            { status: 500 }
        );
    }
}