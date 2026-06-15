import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbWeb from "@/lib/db-web";
import sharp from "sharp";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import fs from "fs";

interface SessionUser {
    name: string;
    email: string;
}

interface ErrorResponse {
    [key: string]: string;
}

// ✅ GET - Fetch highlight by ID
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const highlightId = Number(id);

    try {
        const [highlights] = await dbWeb.query(
            "SELECT * FROM our_menu_highlight WHERE id = ?",
            [highlightId]
        );

        if (!Array.isArray(highlights) || highlights.length === 0) {
            return NextResponse.json(
                { success: false, message: "Data tidak ditemukan" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: highlights[0] as Record<string, unknown>,
        });
    } catch (error) {
        console.error("[GET_HIGHLIGHT_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Gagal mengambil data" },
            { status: 500 }
        );
    }
}

// ✅ PUT - Update highlight
export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const highlightId = Number(id);
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
        const our_menu_food_id = formData.get("our_menu_food_id") as string;
        const description_ind = formData.get("description_ind") as string;
        const description_eng = formData.get("description_eng") as string;
        const imageFile = formData.get("image") as File | null;

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

        if (Object.keys(errors).length > 0) {
            connection.release();
            return NextResponse.json(
                { success: false, message: "Validasi gagal", errors },
                { status: 400 }
            );
        }

        let newImagePath: string | null = null;

        // ✅ Process new image if provided
        if (imageFile) {
            const bytes = await imageFile.arrayBuffer();
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

            newImagePath = `/images/upload/food-highlight/${filename}`;
        }

        await connection.beginTransaction();

        try {
            // Get old image path before updating
            const [oldData] = await connection.query(
                "SELECT image FROM our_menu_highlight WHERE id = ?",
                [highlightId]
            );

            // ✅ Update our_menu_highlight
            if (newImagePath) {
                await connection.query(
                    `
                    UPDATE our_menu_highlight SET
                        food_package_id = ?, our_menu_food_id = ?, image = ?,
                        description_ind = ?, description_eng = ?,
                        updated_by = ?, updated_at = NOW()
                    WHERE id = ?
                    `,
                    [
                        parseInt(food_package_id),
                        parseInt(our_menu_food_id),
                        newImagePath,
                        description_ind,
                        description_eng,
                        updatedBy,
                        highlightId,
                    ]
                );
            } else {
                await connection.query(
                    `
                    UPDATE our_menu_highlight SET
                        food_package_id = ?, our_menu_food_id = ?,
                        description_ind = ?, description_eng = ?,
                        updated_by = ?, updated_at = NOW()
                    WHERE id = ?
                    `,
                    [
                        parseInt(food_package_id),
                        parseInt(our_menu_food_id),
                        description_ind,
                        description_eng,
                        updatedBy,
                        highlightId,
                    ]
                );
            }

            await connection.commit();

            // ✅ Delete old image if new image was uploaded
            if (newImagePath && Array.isArray(oldData) && oldData.length > 0) {
                const oldImage = (oldData[0] as Record<string, unknown>).image as string;
                if (oldImage) {
                    const oldFilePath = path.join(process.cwd(), "public", oldImage);
                    if (fs.existsSync(oldFilePath)) {
                        try {
                            await unlink(oldFilePath);
                        } catch (unlinkError) {
                            console.warn("Failed to delete old image:", unlinkError);
                        }
                    }
                }
            }

            connection.release();

            return NextResponse.json({
                success: true,
                message: "Highlight berhasil diperbarui",
                data: { id: highlightId },
            });
        } catch (transactionError) {
            await connection.rollback();
            connection.release();
            throw transactionError;
        }
    } catch (error) {
        console.error("[UPDATE_HIGHLIGHT_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Terjadi kesalahan server" },
            { status: 500 }
        );
    }
}

// ✅ DELETE - Delete highlight with image cleanup
export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const highlightId = Number(id);
    const connection = await dbWeb.getConnection();

    try {
        await connection.beginTransaction();

        try {
            // Get image path before deleting
            const [oldData] = await connection.query(
                "SELECT image FROM our_menu_highlight WHERE id = ?",
                [highlightId]
            );

            // Delete highlight
            const [result] = await connection.query(
                "DELETE FROM our_menu_highlight WHERE id = ?",
                [highlightId]
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

            // ✅ Delete image file
            if (Array.isArray(oldData) && oldData.length > 0) {
                const oldImage = (oldData[0] as Record<string, unknown>).image as string;
                if (oldImage) {
                    const oldFilePath = path.join(process.cwd(), "public", oldImage);
                    if (fs.existsSync(oldFilePath)) {
                        try {
                            await unlink(oldFilePath);
                        } catch (unlinkError) {
                            console.warn("Failed to delete image:", unlinkError);
                        }
                    }
                }
            }

            connection.release();

            return NextResponse.json({
                success: true,
                message: "Highlight berhasil dihapus",
            });
        } catch (transactionError) {
            await connection.rollback();
            connection.release();
            throw transactionError;
        }
    } catch (error) {
        console.error("[DELETE_HIGHLIGHT_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Gagal menghapus highlight" },
            { status: 500 }
        );
    }
}