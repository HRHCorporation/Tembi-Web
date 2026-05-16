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

interface ErrorResponse {
    [key: string]: string;
}

// ✅ GET - Fetch collection by ID
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const collectionId = Number(id);

    try {
        const [collections] = await dbWeb.query(
            "SELECT * FROM collection WHERE id = ?",
            [collectionId]
        );

        if (!Array.isArray(collections) || collections.length === 0) {
            return NextResponse.json(
                { success: false, message: "Data tidak ditemukan" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: collections[0] as Record<string, unknown>,
        });
    } catch (error) {
        console.error("[GET_COLLECTION_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Gagal mengambil data" },
            { status: 500 }
        );
    }
}

// ✅ PUT - Update collection
export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const collectionId = Number(id);

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
        const mstr_collection_id = formData.get("mstr_collection_id") as string;
        const name_ind = formData.get("name_ind") as string;
        const name_eng = formData.get("name_eng") as string;
        const description_ind = formData.get("description_ind") as string;
        const description_eng = formData.get("description_eng") as string;
        const imageFile = formData.get("image") as File | null;

        // Validation
        const errors: ErrorResponse = {};

        if (!mstr_collection_id) errors.mstr_collection_id = "Collection wajib dipilih";
        if (!name_ind?.trim()) errors.name_ind = "Nama Indonesia wajib diisi";
        if (!name_eng?.trim()) errors.name_eng = "Nama English wajib diisi";
        if (!description_ind?.trim()) errors.description_ind = "Deskripsi Indonesia wajib diisi";
        if (!description_eng?.trim()) errors.description_eng = "Deskripsi English wajib diisi";

        if (Object.keys(errors).length > 0) {
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
            const filename = `collection-${Date.now()}-${Math.random()
                .toString(36)
                .substring(2, 8)}.webp`;

            const uploadDir = path.join(process.cwd(), "public/images/upload/collection");

            await mkdir(uploadDir, { recursive: true });

            const filePath = path.join(uploadDir, filename);

            await sharp(buffer)
                .webp({ quality: 80 })
                .toFile(filePath);

            newImagePath = `/images/upload/collection/${filename}`;
        }

        // Get old image path before updating
        const [oldData] = await dbWeb.query(
            "SELECT image FROM collection WHERE id = ?",
            [collectionId]
        );

        // ✅ Update collection
        if (newImagePath) {
            await dbWeb.query(
                `
                UPDATE collection SET
                    mstr_collection_id = ?, name_ind = ?, name_eng = ?,
                    description_ind = ?, description_eng = ?, image = ?,
                    updated_by = ?, updated_at = NOW()
                WHERE id = ?
                `,
                [
                    parseInt(mstr_collection_id),
                    name_ind,
                    name_eng,
                    description_ind,
                    description_eng,
                    newImagePath,
                    updatedBy,
                    collectionId,
                ]
            );
        } else {
            await dbWeb.query(
                `
                UPDATE collection SET
                    mstr_collection_id = ?, name_ind = ?, name_eng = ?,
                    description_ind = ?, description_eng = ?,
                    updated_by = ?, updated_at = NOW()
                WHERE id = ?
                `,
                [
                    parseInt(mstr_collection_id),
                    name_ind,
                    name_eng,
                    description_ind,
                    description_eng,
                    updatedBy,
                    collectionId,
                ]
            );
        }

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

        return NextResponse.json({
            success: true,
            message: "Collection berhasil diperbarui",
            data: { id: collectionId },
        });
    } catch (error) {
        console.error("[UPDATE_COLLECTION_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Terjadi kesalahan server" },
            { status: 500 }
        );
    }
}

// ✅ DELETE - Delete collection with image cleanup
export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const collectionId = Number(id);

    try {
        // Get image path before deleting
        const [oldData] = await dbWeb.query(
            "SELECT image FROM collection WHERE id = ?",
            [collectionId]
        );

        // Delete collection
        const [result] = await dbWeb.query(
            "DELETE FROM collection WHERE id = ?",
            [collectionId]
        );

        const deletedResult = result as unknown as { affectedRows: number };
        if (deletedResult.affectedRows === 0) {
            return NextResponse.json(
                { success: false, message: "Data tidak ditemukan" },
                { status: 404 }
            );
        }

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

        return NextResponse.json({
            success: true,
            message: "Collection berhasil dihapus",
        });
    } catch (error) {
        console.error("[DELETE_COLLECTION_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Gagal menghapus collection" },
            { status: 500 }
        );
    }
}