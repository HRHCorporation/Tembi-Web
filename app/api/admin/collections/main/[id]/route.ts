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

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const collectionId = Number(id);
    const connection = await dbWeb.getConnection();

    try {
        const [collections] = await connection.query(
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
    } finally {
        connection.release();
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const collectionId = Number(id);
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
        const mstr_collection_id = formData.get("mstr_collection_id") as string;
        const name_ind = formData.get("name_ind") as string;
        const name_eng = formData.get("name_eng") as string;
        const description_ind = formData.get("description_ind") as string;
        const description_eng = formData.get("description_eng") as string;
        const imageFile = formData.get("image") as File | null;

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
        if (imageFile) {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const filename = `collection-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.webp`;
            const uploadDir = path.join(process.cwd(), "public/images/upload/collection");
            await mkdir(uploadDir, { recursive: true });
            await sharp(buffer)
                .resize({
                    width: 1920,
                    withoutEnlargement: true,
                })
                .webp({ quality: 80 })
                .toFile(path.join(uploadDir, filename));
            newImagePath = `/images/upload/collection/${filename}`;
        }

        await connection.beginTransaction();

        const [oldData] = await connection.query(
            "SELECT image FROM collection WHERE id = ?",
            [collectionId]
        );

        if (newImagePath) {
            await connection.query(
                `UPDATE collection SET
                    mstr_collection_id = ?, name_ind = ?, name_eng = ?,
                    description_ind = ?, description_eng = ?, image = ?,
                    updated_by = ?, updated_at = NOW()
                WHERE id = ?`,
                [parseInt(mstr_collection_id), name_ind, name_eng, description_ind, description_eng, newImagePath, updatedBy, collectionId]
            );
        } else {
            await connection.query(
                `UPDATE collection SET
                    mstr_collection_id = ?, name_ind = ?, name_eng = ?,
                    description_ind = ?, description_eng = ?,
                    updated_by = ?, updated_at = NOW()
                WHERE id = ?`,
                [parseInt(mstr_collection_id), name_ind, name_eng, description_ind, description_eng, updatedBy, collectionId]
            );
        }

        await connection.commit();

        if (newImagePath && Array.isArray(oldData) && oldData.length > 0) {
            const oldImage = (oldData[0] as Record<string, unknown>).image as string;
            if (oldImage) {
                const oldFilePath = path.join(process.cwd(), "public", oldImage);
                if (fs.existsSync(oldFilePath)) {
                    try { await unlink(oldFilePath); } catch (e) { console.warn("Failed to delete old image:", e); }
                }
            }
        }

        return NextResponse.json({
            success: true,
            message: "Collection berhasil diperbarui",
            data: { id: collectionId },
        });
    } catch (error) {
        await connection.rollback();
        console.error("[UPDATE_COLLECTION_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Terjadi kesalahan server" },
            { status: 500 }
        );
    } finally {
        connection.release();
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const collectionId = Number(id);
    const connection = await dbWeb.getConnection();

    try {
        const [oldData] = await connection.query(
            "SELECT image FROM collection WHERE id = ?",
            [collectionId]
        );

        await connection.beginTransaction();

        const [result] = await connection.query(
            "DELETE FROM collection WHERE id = ?",
            [collectionId]
        );

        const deletedResult = result as unknown as { affectedRows: number };
        if (deletedResult.affectedRows === 0) {
            await connection.rollback();
            return NextResponse.json(
                { success: false, message: "Data tidak ditemukan" },
                { status: 404 }
            );
        }

        await connection.commit();

        if (Array.isArray(oldData) && oldData.length > 0) {
            const oldImage = (oldData[0] as Record<string, unknown>).image as string;
            if (oldImage) {
                const oldFilePath = path.join(process.cwd(), "public", oldImage);
                if (fs.existsSync(oldFilePath)) {
                    try { await unlink(oldFilePath); } catch (e) { console.warn("Failed to delete image:", e); }
                }
            }
        }

        return NextResponse.json({
            success: true,
            message: "Collection berhasil dihapus",
        });
    } catch (error) {
        await connection.rollback();
        console.error("[DELETE_COLLECTION_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Gagal menghapus collection" },
            { status: 500 }
        );
    } finally {
        connection.release();
    }
}