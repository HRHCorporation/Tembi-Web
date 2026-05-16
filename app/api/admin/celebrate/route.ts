import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { cookies } from "next/headers";
import { RowDataPacket } from "mysql2";
import sharp from "sharp";
import { mkdir } from "fs/promises";
import path from "path";

// ← tipe untuk data fasilitas
interface CelebrateRow extends RowDataPacket {
    id: number;
    name_id: string;
    name_eng: string;
    description_ind: string;
    description_eng: string;
}

interface CountRow extends RowDataPacket {
    total: number;
}

// ← tipe untuk session cookie
interface SessionUser {
    name: string;
    email: string;
}

interface CelebrateMomentList {
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
        const [rows] = await dbWeb.query<CelebrateRow[]>(  // ← ganti any
            `
            SELECT id, name_ind, name_eng, description_ind, description_eng
            FROM celebrate_moment
            WHERE name_ind LIKE ? OR name_eng LIKE ?
            ORDER BY ${sortBy} ${sortOrder}
            LIMIT ? OFFSET ?
            `,
            [`%${search}%`, `%${search}%`, limit, offset]
        );
        const [totalRows] = await dbWeb.query<CountRow[]>(  // ← ganti any
            `
            SELECT COUNT(*) as total
            FROM celebrate_moment
            WHERE name_ind LIKE ? OR name_eng LIKE ?
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
        const name_ind = formData.get("name_ind") as string;
        const name_eng = formData.get("name_eng") as string;
        const description_ind = formData.get("description_ind") as string;
        const description_eng = formData.get("description_eng") as string;
        const imageFile = formData.get("image") as File;

        const celebrateMomentListJson = formData.get("celebrate_moment_list") as string;
        const celebrateMomentList = JSON.parse(celebrateMomentListJson) as CelebrateMomentList[];

        // Validation
        const errors: ErrorResponse = {};

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
        if (!imageFile) {
            errors.image = "Image wajib diupload";
        }
        if (celebrateMomentList.length === 0) {
            errors.celebrate_moment_list = "Minimal 1 item wajib ditambahkan";
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
        const filename = `celebrate-${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 8)}.webp`;

        const uploadDir = path.join(process.cwd(), "public/images/upload/celebrate");

        await mkdir(uploadDir, { recursive: true });

        const filePath = path.join(uploadDir, filename);

        await sharp(buffer)
            .webp({ quality: 80 })
            .toFile(filePath);

        // ✅ Insert celebrate_moment
        await connection.beginTransaction();

        try {
            const [result] = await connection.query(
                `
                INSERT INTO celebrate_moment (name_ind, name_eng, description_ind, description_eng, image, created_by, created_at)
                VALUES (?, ?, ?, ?, ?, ?, NOW())
                `,
                [
                    name_ind,
                    name_eng,
                    description_ind,
                    description_eng,
                    `/images/upload/celebrate/${filename}`,
                    createdBy,
                ]
            );

            const celebrateId = (result as unknown as { insertId: number }).insertId;

            // ✅ Insert celebrate_moment_list
            for (const item of celebrateMomentList) {
                await connection.query(
                    `
                    INSERT INTO celebrate_moment_list (celebrate_moment_id, name_ind, name_eng, created_by, created_at)
                    VALUES (?, ?, ?, ?, NOW())
                    `,
                    [celebrateId, item.name_ind, item.name_eng, createdBy]
                );
            }

            await connection.commit();
            connection.release();

            return NextResponse.json(
                {
                    success: true,
                    message: "Celebrate moment berhasil ditambahkan",
                    data: { id: celebrateId },
                },
                { status: 201 }
            );
        } catch (transactionError) {
            await connection.rollback();
            connection.release();
            throw transactionError;
        }
    } catch (error) {
        console.error("[CREATE_CELEBRATE_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Terjadi kesalahan server" },
            { status: 500 }
        );
    }
}
