import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbWeb from "@/lib/db-web";
import sharp from "sharp";
import { mkdir, unlink } from "fs/promises";
import path from "path";
import fs from "fs";

interface SessionUser {
    name: string;
    email: string;
}

interface CelebrateMomentListItem {
    name_ind: string;
    name_eng: string;
    id?: number;
}

interface ErrorResponse {
    [key: string]: string;
}

// ✅ GET - Fetch celebrate by ID
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const celebrateId = Number(id);

    try {
        const [celebrates] = await dbWeb.query(
            "SELECT * FROM celebrate_moment WHERE id = ?",
            [celebrateId]
        );

        if (!Array.isArray(celebrates) || celebrates.length === 0) {
            return NextResponse.json(
                { success: false, message: "Data tidak ditemukan" },
                { status: 404 }
            );
        }

        const [lists] = await dbWeb.query(
            "SELECT id, name_ind, name_eng FROM celebrate_moment_list WHERE celebrate_moment_id = ?",
            [celebrateId]
        );

        return NextResponse.json({
            success: true,
            data: {
                ...(celebrates[0] as Record<string, unknown>),
                celebrate_moment_list: lists || [],
            },
        });
    } catch (error) {
        console.error("[GET_CELEBRATE_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Gagal mengambil data" },
            { status: 500 }
        );
    }
}

// ✅ PUT - Update celebrate
export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const celebrateId = Number(id);
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
        const name_ind = formData.get("name_ind") as string;
        const name_eng = formData.get("name_eng") as string;
        const description_ind = formData.get("description_ind") as string;
        const description_eng = formData.get("description_eng") as string;
        const imageFile = formData.get("image") as File | null;

        const celebrateMomentListJson = formData.get("celebrate_moment_list") as string;
        const deletedListIdsJson = formData.get("deleted_list_ids") as string;

        const celebrateMomentList = JSON.parse(celebrateMomentListJson) as CelebrateMomentListItem[];
        const deletedListIds = JSON.parse(deletedListIdsJson) as number[];

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
            const filename = `celebrate-${Date.now()}-${Math.random()
                .toString(36)
                .substring(2, 8)}.webp`;

            const uploadDir = path.join(process.cwd(), "public/images/upload/celebrate");

            await mkdir(uploadDir, { recursive: true });

            const filePath = path.join(uploadDir, filename);

            await sharp(buffer)
                .webp({ quality: 80 })
                .toFile(filePath);

            newImagePath = `/images/upload/celebrate/${filename}`;
        }

        await connection.beginTransaction();

        try {
            // Get old image path before updating
            const [oldData] = await connection.query(
                "SELECT image FROM celebrate_moment WHERE id = ?",
                [celebrateId]
            );

            // ✅ Update celebrate_moment
            if (newImagePath) {
                await connection.query(
                    `
                    UPDATE celebrate_moment SET
                        name_ind = ?, name_eng = ?, description_ind = ?,
                        description_eng = ?, image = ?,
                        updated_by = ?, updated_at = NOW()
                    WHERE id = ?
                    `,
                    [
                        name_ind,
                        name_eng,
                        description_ind,
                        description_eng,
                        newImagePath,
                        updatedBy,
                        celebrateId,
                    ]
                );
            } else {
                await connection.query(
                    `
                    UPDATE celebrate_moment SET
                        name_ind = ?, name_eng = ?, description_ind = ?,
                        description_eng = ?,
                        updated_by = ?, updated_at = NOW()
                    WHERE id = ?
                    `,
                    [
                        name_ind,
                        name_eng,
                        description_ind,
                        description_eng,
                        updatedBy,
                        celebrateId,
                    ]
                );
            }

            // ✅ Delete removed list items
            if (deletedListIds.length > 0) {
                await connection.query(
                    `DELETE FROM celebrate_moment_list WHERE id IN (${deletedListIds.map(() => "?").join(",")}) AND celebrate_moment_id = ?`,
                    [...deletedListIds, celebrateId]
                );
            }

            // ✅ Insert new list items (those without id)
            for (const item of celebrateMomentList) {
                if (!item.id) {
                    await connection.query(
                        `
                        INSERT INTO celebrate_moment_list (celebrate_moment_id, name_ind, name_eng, created_by, created_at)
                        VALUES (?, ?, ?, ?, NOW())
                        `,
                        [celebrateId, item.name_ind, item.name_eng, updatedBy]
                    );
                }
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
                message: "Celebrate moment berhasil diperbarui",
                data: { id: celebrateId },
            });
        } catch (transactionError) {
            await connection.rollback();
            connection.release();
            throw transactionError;
        }
    } catch (error) {
        console.error("[UPDATE_CELEBRATE_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Terjadi kesalahan server" },
            { status: 500 }
        );
    }
}

// ✅ DELETE - Delete celebrate with image cleanup
export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const celebrateId = Number(id);
    const connection = await dbWeb.getConnection();

    try {
        await connection.beginTransaction();

        try {
            // Get image path before deleting
            const [oldData] = await connection.query(
                "SELECT image FROM celebrate_moment WHERE id = ?",
                [celebrateId]
            );

            // Delete celebrate_moment_list items first
            await connection.query(
                "DELETE FROM celebrate_moment_list WHERE celebrate_moment_id = ?",
                [celebrateId]
            );

            // Delete celebrate_moment
            const [result] = await connection.query(
                "DELETE FROM celebrate_moment WHERE id = ?",
                [celebrateId]
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
                message: "Celebrate moment berhasil dihapus",
            });
        } catch (transactionError) {
            await connection.rollback();
            connection.release();
            throw transactionError;
        }
    } catch (error) {
        console.error("[DELETE_CELEBRATE_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Gagal menghapus celebrate moment" },
            { status: 500 }
        );
    }
}