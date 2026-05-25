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

// ✅ GET - Fetch event by ID
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const eventId = Number(id);

    try {
        const [event] = await dbWeb.query(
            "SELECT * FROM event WHERE id = ?",
            [eventId]
        );

        if (!Array.isArray(event) || event.length === 0) {
            return NextResponse.json(
                { success: false, message: "Data tidak ditemukan" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: event[0] as Record<string, unknown>,
        });
    } catch (error) {
        console.error("[GET_EVENT_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Gagal mengambil data" },
            { status: 500 }
        );
    }
}

// ✅ PUT - Update event
export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const eventId = Number(id);

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
        const title_ind = formData.get("title_ind") as string;
        const title_eng = formData.get("title_eng") as string;
        const description_ind = formData.get("description_ind") as string;
        const description_eng = formData.get("description_eng") as string;
        const slug = formData.get("slug") as string;
        const thumbnailFile = formData.get("thumbnail") as File | null;
        const hosted_by = formData.get("hosted_by") as string;
        const date_event = formData.get("date_event") as string;
        const time_event = formData.get("time_event") as string;

        // Validation
        const errors: ErrorResponse = {};

        if (!title_ind?.trim()) errors.title_ind = "Judul Indonesia wajib diisi";
        if (!title_eng?.trim()) errors.title_eng = "Judul English wajib diisi";
        if (!description_ind?.trim()) errors.description_ind = "Deskripsi Indonesia wajib diisi";
        if (!description_eng?.trim()) errors.description_eng = "Deskripsi English wajib diisi";
        if (!slug?.trim()) errors.slug = "Slug wajib diisi";
        if (!hosted_by?.trim()) errors.hosted_by = "Penyelenggara wajib diisi";
        if (!date_event?.trim()) errors.date_event = "Tanggal wajib diisi";
        if (!time_event?.trim()) errors.time_event = "Waktu wajib diisi";

        if (Object.keys(errors).length > 0) {
            return NextResponse.json(
                { success: false, message: "Validasi gagal", errors },
                { status: 400 }
            );
        }

        let newThumbnailPath: string | null = null;

        // ✅ Process new thumbnail if provided
        if (thumbnailFile) {
            const bytes = await thumbnailFile.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const filename = `event-${Date.now()}-${Math.random()
                .toString(36)
                .substring(2, 8)}.webp`;

            const uploadDir = path.join(process.cwd(), "public/images/upload/event");

            await mkdir(uploadDir, { recursive: true });

            const filePath = path.join(uploadDir, filename);

            await sharp(buffer)
                .webp({ quality: 80 })
                .toFile(filePath);

            newThumbnailPath = `/images/upload/event/${filename}`;
        }

        // Get old thumbnail path before updating
        const [oldData] = await dbWeb.query(
            "SELECT thumbnail FROM event WHERE id = ?",
            [eventId]
        );

        // ✅ Update event
        if (newThumbnailPath) {
            await dbWeb.query(
                `
                UPDATE event SET
                    title_ind = ?, title_eng = ?,
                    description_ind = ?, description_eng = ?,
                    slug = ?, thumbnail = ?,
                    updated_by = ?, updated_at = NOW(), hosted_by = ?, date_event = ?, time_event = ?
                WHERE id = ?
                `,
                [
                    title_ind,
                    title_eng,
                    description_ind,
                    description_eng,
                    slug,
                    newThumbnailPath,
                    updatedBy,
                    hosted_by,
                    date_event,
                    time_event,
                    eventId
                ]
            );
        } else {
            await dbWeb.query(
                `
                UPDATE event SET
                    title_ind = ?, title_eng = ?,
                    description_ind = ?, description_eng = ?,
                    slug = ?,
                    updated_by = ?, updated_at = NOW(), hosted_by = ?, date_event = ?, time_event = ?
                WHERE id = ?
                `,
                [
                    title_ind,
                    title_eng,
                    description_ind,
                    description_eng,
                    slug,
                    updatedBy,
                    hosted_by,
                    date_event,
                    time_event,
                    eventId
                ]
            );
        }

        // ✅ Delete old thumbnail if new thumbnail was uploaded
        if (newThumbnailPath && Array.isArray(oldData) && oldData.length > 0) {
            const oldThumbnail = (oldData[0] as Record<string, unknown>).thumbnail as string;
            if (oldThumbnail) {
                const oldFilePath = path.join(process.cwd(), "public", oldThumbnail);
                if (fs.existsSync(oldFilePath)) {
                    try {
                        await unlink(oldFilePath);
                    } catch (unlinkError) {
                        console.warn("Failed to delete old thumbnail:", unlinkError);
                    }
                }
            }
        }

        return NextResponse.json({
            success: true,
            message: "Event berhasil diperbarui",
            data: { id: eventId },
        });
    } catch (error) {
        console.error("[UPDATE_EVENT_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Terjadi kesalahan server" },
            { status: 500 }
        );
    }
}

// ✅ DELETE - Delete event with thumbnail cleanup
export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const eventId = Number(id);

    try {
        // Get thumbnail path before deleting
        const [oldData] = await dbWeb.query(
            "SELECT thumbnail FROM event WHERE id = ?",
            [eventId]
        );

        // Delete event
        const [result] = await dbWeb.query(
            "DELETE FROM event WHERE id = ?",
            [eventId]
        );

        const deletedResult = result as unknown as { affectedRows: number };
        if (deletedResult.affectedRows === 0) {
            return NextResponse.json(
                { success: false, message: "Data tidak ditemukan" },
                { status: 404 }
            );
        }

        // ✅ Delete thumbnail file
        if (Array.isArray(oldData) && oldData.length > 0) {
            const oldThumbnail = (oldData[0] as Record<string, unknown>).thumbnail as string;
            if (oldThumbnail) {
                const oldFilePath = path.join(process.cwd(), "public", oldThumbnail);
                if (fs.existsSync(oldFilePath)) {
                    try {
                        await unlink(oldFilePath);
                    } catch (unlinkError) {
                        console.warn("Failed to delete thumbnail:", unlinkError);
                    }
                }
            }
        }

        return NextResponse.json({
            success: true,
            message: "Event berhasil dihapus",
        });
    } catch (error) {
        console.error("[DELETE_EVENT_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Gagal menghapus event" },
            { status: 500 }
        );
    }
}