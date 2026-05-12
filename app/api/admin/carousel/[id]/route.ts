import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import sharp from "sharp";
import { RowDataPacket } from "mysql2";  // ← import tipe dari mysql2
import dbWeb from "@/lib/db-web";

// ← tipe untuk data carousel dari DB
interface CarouselRow extends RowDataPacket {
    id: number;
    title_ind: string;
    title_eng: string;
    is_active: number;
    image: string;
    created_at: Date;
    updated_at: Date;
}

// ← tipe untuk context params Next.js 15
interface RouteContext {
    params: Promise<{ id: string }>;
}


export async function GET(
    request: NextRequest,
    context: RouteContext  // ← ganti any
) {
    try {
        const { id } = await context.params;
        const numericId = Number(id);

        const [rows] = await dbWeb.query<CarouselRow[]>(  // ← ganti any
            `SELECT * FROM carousels WHERE id = ? LIMIT 1`,
            [numericId]
        );

        if (!rows.length) {
            return NextResponse.json(
                { success: false, message: "Data tidak ditemukan" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: rows[0],
        });

    } catch (error) {
        console.error("GET ERROR:", error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}


export async function PUT(
    request: NextRequest,
    context: RouteContext  // ← ganti any
) {
    try {
        const { id } = await context.params;

        const formData = await request.formData();
        const titleInd = formData.get("title_ind") as string;
        const titleEng = formData.get("title_eng") as string;
        const isActive = formData.get("is_active") as string;
        const image = formData.get("image") as File | null;

        const [rows] = await dbWeb.query<CarouselRow[]>(  // ← ganti any
            `SELECT * FROM carousels WHERE id = ? LIMIT 1`,
            [id]
        );

        if (!rows.length) {
            return NextResponse.json({ success: false }, { status: 404 });
        }

        const oldData = rows[0];
        let imagePath = oldData.image;

        if (image && image.size > 0) {
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const filename = `carousel-${Date.now()}.webp`;
            const uploadDir = path.join(process.cwd(), "public/images/carousel");

            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const filePath = path.join(uploadDir, filename);

            await sharp(buffer)
                .resize(1920, 1080)
                .webp({ quality: 80 })
                .toFile(filePath);

            const oldImagePath = path.join(process.cwd(), "public", oldData.image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }

            imagePath = `/images/carousel/${filename}`;
        }

        await dbWeb.query(
            `UPDATE carousels
             SET image = ?, title_ind = ?, title_eng = ?, is_active = ?, updated_at = NOW()
             WHERE id = ?`,
            [imagePath, titleInd, titleEng, isActive, id]
        );

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("PUT ERROR:", error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}


export async function DELETE(
    request: NextRequest,
    context: RouteContext  // ← ganti any
) {
    try {
        const { id } = await context.params;

        const [rows] = await dbWeb.query<CarouselRow[]>(  // ← ganti any
            `SELECT * FROM carousels WHERE id = ? LIMIT 1`,
            [id]
        );

        if (!rows.length) {
            return NextResponse.json(
                { success: false, message: "Data tidak ditemukan" },
                { status: 404 }
            );
        }

        const oldImagePath = path.join(
            process.cwd(),
            "public",
            rows[0].image
        );

        if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
        }

        await dbWeb.query(
            `DELETE FROM carousels WHERE id = ?`,
            [id]
        );

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("DELETE ERROR:", error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}