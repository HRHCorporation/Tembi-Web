import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbWeb from "@/lib/db-web";
import sharp from "sharp";
import { mkdir, unlink } from "fs/promises";
import path from "path";
import fs from "fs";
import { RowDataPacket } from "mysql2";

interface SessionUser {
    name: string;
    email: string;
}

interface VenueKey {
    id?: number;
    icon: string;
    label_ind: string;
    label_eng: string;
    value_ind: string;
    value_eng: string;
}

interface VenueService {
    id?: number;
    name_service_ind: string;
    name_service_eng: string;
    description_ind: string;
    description_eng: string;
}

interface VenueNote {
    id?: number;
    description_ind: string;
    description_eng: string;
}

interface ErrorResponse {
    [key: string]: string;
}

interface VenueRow extends RowDataPacket {
    id: number;
    name_ind: string;
    name_eng: string;
    description_ind: string;
    description_eng: string;
    slug: string;
    created_by: string;
    created_at: string;
    updated_by: string;
    updated_at: string;
}

interface FacilityRow extends RowDataPacket {
    facilities_id: number;
}

interface ImageRow extends RowDataPacket {
    id: number;
    image: string;
    is_banner: number;
}

interface KeyRow extends RowDataPacket {
    id: number;
    icon: string;
    label_ind: string;
    label_eng: string;
    value_ind: string;
    value_eng: string;
}

interface ServiceRow extends RowDataPacket {
    id: number;
    name_service_ind: string;
    name_service_eng: string;
    description_ind: string;
    description_eng: string;
}

interface NoteRow extends RowDataPacket {
    id: number;
    description_ind: string;
    description_eng: string;
}

// ✅ GET - Fetch venue by ID dengan semua children
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const venueId = Number(id);

    try {
        const [venues] = await dbWeb.query<VenueRow[]>(
            "SELECT * FROM vanue WHERE id = ?",
            [venueId]
        );

        if (!Array.isArray(venues) || venues.length === 0) {
            return NextResponse.json(
                { success: false, message: "Data tidak ditemukan" },
                { status: 404 }
            );
        }

        // Fetch all children
        const [facilities] = await dbWeb.query<FacilityRow[]>(
            "SELECT mstr_vanue_facilities FROM vanue_facilities WHERE vanue_id = ?",
            [venueId]
        );

        const [images] = await dbWeb.query<ImageRow[]>(
            "SELECT id, image, is_banner FROM vanue_gallery WHERE vanue_id = ?",
            [venueId]
        );

        const [keys] = await dbWeb.query<KeyRow[]>(
            "SELECT id, icon, label_ind, label_eng, value_ind, value_eng FROM venue_keys WHERE vanue_id = ?",
            [venueId]
        );

        const [services] = await dbWeb.query<ServiceRow[]>(
            "SELECT id, name_service_ind, name_service_eng, description_ind, description_eng FROM vanue_services WHERE vanue_id = ?",
            [venueId]
        );

        const [notes] = await dbWeb.query<NoteRow[]>(
            "SELECT id, description_ind, description_eng FROM vanue_notes WHERE vanue_id = ?",
            [venueId]
        );

        const venueData = venues[0] as unknown as Record<string, unknown>;
        const facilitiesArray = Array.isArray(facilities) ? facilities : [];
        const imagesArray = Array.isArray(images) ? images : [];
        const keysArray = Array.isArray(keys) ? keys : [];
        const servicesArray = Array.isArray(services) ? services : [];
        const notesArray = Array.isArray(notes) ? notes : [];

        return NextResponse.json({
            success: true,
            data: {
                ...venueData,
                selected_facilities: facilitiesArray.map((f) => f.mstr_vanue_facilities),
                images: imagesArray,
                venue_keys: keysArray,
                venue_services: servicesArray,
                venue_notes: notesArray,
            },
        });
    } catch (error) {
        console.error("[GET_VENUE_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Gagal mengambil data" },
            { status: 500 }
        );
    }
}

// ✅ PUT - Update venue
export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const venueId = Number(id);
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
        const slug = formData.get("slug") as string;

        const selectedFacilitiesJson = formData.get("selected_facilities") as string;
        const deletedImageIdsJson = formData.get("deleted_image_ids") as string;
        const venueKeysJson = formData.get("venue_keys") as string;
        const deletedKeyIdsJson = formData.get("deleted_key_ids") as string;
        const venueServicesJson = formData.get("venue_services") as string;
        const deletedServiceIdsJson = formData.get("deleted_service_ids") as string;
        const venueNotesJson = formData.get("venue_notes") as string;
        const deletedNoteIdsJson = formData.get("deleted_note_ids") as string;

        const selectedFacilities = JSON.parse(selectedFacilitiesJson) as number[];
        const deletedImageIds = JSON.parse(deletedImageIdsJson) as number[];
        const venueKeys = JSON.parse(venueKeysJson) as VenueKey[];
        const deletedKeyIds = JSON.parse(deletedKeyIdsJson) as number[];
        const venueServices = JSON.parse(venueServicesJson) as VenueService[];
        const deletedServiceIds = JSON.parse(deletedServiceIdsJson) as number[];
        const venueNotes = JSON.parse(venueNotesJson) as VenueNote[];
        const deletedNoteIds = JSON.parse(deletedNoteIdsJson) as number[];

        // Validation
        const errors: ErrorResponse = {};

        if (!name_ind?.trim()) errors.name_ind = "Nama Indonesia wajib diisi";
        if (!name_eng?.trim()) errors.name_eng = "Nama English wajib diisi";
        if (!description_ind?.trim()) errors.description_ind = "Deskripsi Indonesia wajib diisi";
        if (!description_eng?.trim()) errors.description_eng = "Deskripsi English wajib diisi";
        if (selectedFacilities.length === 0) errors.selected_facilities = "Minimal 1 fasilitas wajib dipilih";
        if (venueKeys.length === 0) errors.venue_keys = "Minimal 1 key wajib ditambahkan";
        if (venueServices.length === 0) errors.venue_services = "Minimal 1 service wajib ditambahkan";
        if (venueNotes.length === 0) errors.venue_notes = "Minimal 1 note wajib ditambahkan";

        if (Object.keys(errors).length > 0) {
            connection.release();
            return NextResponse.json(
                { success: false, message: "Validasi gagal", errors },
                { status: 400 }
            );
        }

        // Process new images
        const uploadedImages: Array<{ path: string; is_banner: number }> = [];
        const uploadDir = path.join(process.cwd(), "public/images/upload/vanue");
        await mkdir(uploadDir, { recursive: true });

        let imageIndex = 0;
        while (true) {
            const imageFile = formData.get(`image_${imageIndex}`) as File;
            const isBannerStr = formData.get(`image_${imageIndex}_is_banner`) as string;

            if (!imageFile) break;

            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const filename = `vanue-${Date.now()}-${Math.random()
                .toString(36)
                .substring(2, 8)}.webp`;

            const filePath = path.join(uploadDir, filename);

            await sharp(buffer)
                .webp({ quality: 80 })
                .toFile(filePath);

            uploadedImages.push({
                path: `/images/upload/vanue/${filename}`,
                is_banner: isBannerStr === "1" ? 1 : 0,
            });

            imageIndex++;
        }

        await connection.beginTransaction();

        try {
            // ✅ Update vanue parent
            await connection.query(
                `
                UPDATE vanue SET
                    name_ind = ?, name_eng = ?, description_ind = ?,
                    description_eng = ?, slug = ?,
                    updated_by = ?, updated_at = NOW()
                WHERE id = ?
                `,
                [name_ind, name_eng, description_ind, description_eng, slug, updatedBy, venueId]
            );

            // ✅ Update facilities
            await connection.query("DELETE FROM vanue_facilities WHERE vanue_id = ?", [venueId]);
            for (const facilityId of selectedFacilities) {
                await connection.query(
                    `INSERT INTO vanue_facilities (vanue_id, mstr_vanue_facilities, created_by, created_at) VALUES (?, ?, ?, NOW())`,
                    [venueId, facilityId, updatedBy]
                );
            }

            // ✅ Update gallery images
            if (deletedImageIds.length > 0) {
                const [oldImages] = await connection.query(
                    `SELECT id, image FROM vanue_gallery WHERE id IN (${deletedImageIds.map(() => "?").join(",")}) AND vanue_id = ?`,
                    [...deletedImageIds, venueId]
                );

                for (const img of (oldImages || []) as Array<{ id: number; image: string }>) {
                    const oldFilePath = path.join(process.cwd(), "public", img.image);
                    if (fs.existsSync(oldFilePath)) {
                        try {
                            await unlink(oldFilePath);
                        } catch (e) {
                            console.warn("Failed to delete old image:", e);
                        }
                    }
                }

                await connection.query(
                    `DELETE FROM vanue_gallery WHERE id IN (${deletedImageIds.map(() => "?").join(",")}) AND vanue_id = ?`,
                    [...deletedImageIds, venueId]
                );
            }

            const existingImagesJson = formData.get("existing_images") as string;
            const existingImages = JSON.parse(existingImagesJson || "[]") as Array<{
                id: number;
                is_banner: boolean;
            }>;

            for (const img of existingImages) {
                await connection.query(
                    `UPDATE vanue_gallery SET is_banner = ? WHERE id = ? AND vanue_id = ?`,
                    [img.is_banner ? 1 : 0, img.id, venueId]
                );
            }

            // ✅ Insert new images
            for (const image of uploadedImages) {
                await connection.query(
                    `INSERT INTO vanue_gallery (vanue_id, image, is_banner, created_by, created_at) VALUES (?, ?, ?, ?, NOW())`,
                    [venueId, image.path, image.is_banner, updatedBy]
                );
            }

            // ✅ Update venue_keys
            if (deletedKeyIds.length > 0) {
                await connection.query(
                    `DELETE FROM venue_keys WHERE id IN (${deletedKeyIds.map(() => "?").join(",")}) AND vanue_id = ?`,
                    [...deletedKeyIds, venueId]
                );
            }

            for (const key of venueKeys) {
                if (!key.id) {
                    await connection.query(
                        `INSERT INTO venue_keys (vanue_id, icon, label_ind, label_eng, value_ind, value_eng, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
                        [venueId, key.icon, key.label_ind, key.label_eng, key.value_ind, key.value_eng, updatedBy]
                    );
                }
            }

            // ✅ Update vanue_services
            if (deletedServiceIds.length > 0) {
                await connection.query(
                    `DELETE FROM vanue_services WHERE id IN (${deletedServiceIds.map(() => "?").join(",")}) AND vanue_id = ?`,
                    [...deletedServiceIds, venueId]
                );
            }

            for (const service of venueServices) {
                if (!service.id) {
                    await connection.query(
                        `INSERT INTO vanue_services (vanue_id, name_service_ind, name_service_eng, description_ind, description_eng, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())`,
                        [
                            venueId,
                            service.name_service_ind,
                            service.name_service_eng,
                            service.description_ind,
                            service.description_eng,
                            updatedBy,
                        ]
                    );
                }
            }

            // ✅ Update vanue_notes
            if (deletedNoteIds.length > 0) {
                await connection.query(
                    `DELETE FROM vanue_notes WHERE id IN (${deletedNoteIds.map(() => "?").join(",")}) AND vanue_id = ?`,
                    [...deletedNoteIds, venueId]
                );
            }

            for (const note of venueNotes) {
                if (!note.id) {
                    await connection.query(
                        `INSERT INTO vanue_notes (vanue_id, description_ind, description_eng, created_by, created_at) VALUES (?, ?, ?, ?, NOW())`,
                        [venueId, note.description_ind, note.description_eng, updatedBy]
                    );
                }
            }

            await connection.commit();
            connection.release();

            return NextResponse.json({
                success: true,
                message: "Venue berhasil diperbarui",
                data: { id: venueId },
            });
        } catch (transactionError) {
            await connection.rollback();
            connection.release();
            throw transactionError;
        }
    } catch (error) {
        console.error("[UPDATE_VENUE_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Terjadi kesalahan server" },
            { status: 500 }
        );
    }
}

// ✅ DELETE - Delete venue dengan cascade
export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const venueId = Number(id);
    const connection = await dbWeb.getConnection();

    try {
        await connection.beginTransaction();

        try {
            // Get all image paths before deleting
            const [images] = await connection.query(
                "SELECT image FROM vanue_gallery WHERE vanue_id = ?",
                [venueId]
            );

            // Delete all child records
            await connection.query("DELETE FROM vanue_facilities WHERE vanue_id = ?", [venueId]);
            await connection.query("DELETE FROM vanue_gallery WHERE vanue_id = ?", [venueId]);
            await connection.query("DELETE FROM venue_keys WHERE vanue_id = ?", [venueId]);
            await connection.query("DELETE FROM vanue_services WHERE vanue_id = ?", [venueId]);
            await connection.query("DELETE FROM vanue_notes WHERE vanue_id = ?", [venueId]);

            // Delete parent
            const [result] = await connection.query("DELETE FROM vanue WHERE id = ?", [venueId]);

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

            // Delete image files
            for (const img of (images || []) as Array<{ image: string }>) {
                const filePath = path.join(process.cwd(), "public", img.image);
                if (fs.existsSync(filePath)) {
                    try {
                        await unlink(filePath);
                    } catch (e) {
                        console.warn("Failed to delete image:", e);
                    }
                }
            }

            connection.release();

            return NextResponse.json({
                success: true,
                message: "Venue berhasil dihapus",
            });
        } catch (transactionError) {
            await connection.rollback();
            connection.release();
            throw transactionError;
        }
    } catch (error) {
        console.error("[DELETE_VENUE_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Gagal menghapus venue" },
            { status: 500 }
        );
    }
}