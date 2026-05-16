import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { cookies } from "next/headers";
import { RowDataPacket } from "mysql2";
import sharp from "sharp";
import { mkdir } from "fs/promises";
import path from "path";

// ← tipe untuk data fasilitas
interface VanueRow extends RowDataPacket {
    id: number;
    name_id: string;
    name_eng: string;
}

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
        const [rows] = await dbWeb.query<VanueRow[]>(  // ← ganti any
            `
            SELECT id, name_ind, name_eng
            FROM vanue
            WHERE name_ind LIKE ? OR name_eng LIKE ?
            ORDER BY ${sortBy} ${sortOrder}
            LIMIT ? OFFSET ?
            `,
            [`%${search}%`, `%${search}%`, limit, offset]
        );
        const [totalRows] = await dbWeb.query<CountRow[]>(  // ← ganti any
            `
            SELECT COUNT(*) as total
            FROM mstr_vanue_facilities
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

/* ======================================================
    CREATE DATA
====================================================== */
interface VenueKey {
    icon: string;
    label_ind: string;
    label_eng: string;
    value_ind: string;
    value_eng: string;
}

interface VenueService {
    name_service_ind: string;
    name_service_eng: string;
    description_ind: string;
    description_eng: string;
}

interface VenueNote {
    description_ind: string;
    description_eng: string;
}

interface ErrorResponse {
    [key: string]: string;
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
        const slug = formData.get("slug") as string;

        const selectedFacilitiesJson = formData.get("selected_facilities") as string;
        const venueKeysJson = formData.get("venue_keys") as string;
        const venueServicesJson = formData.get("venue_services") as string;
        const venueNotesJson = formData.get("venue_notes") as string;

        const selectedFacilities = JSON.parse(selectedFacilitiesJson) as number[];
        const venueKeys = JSON.parse(venueKeysJson) as VenueKey[];
        const venueServices = JSON.parse(venueServicesJson) as VenueService[];
        const venueNotes = JSON.parse(venueNotesJson) as VenueNote[];

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

        // Process images
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

        if (uploadedImages.length === 0) {
            errors.images = "Minimal 1 gambar wajib diupload";
        }

        const hasBanner = uploadedImages.some((img) => img.is_banner === 1);
        if (!hasBanner) {
            errors.images = "Minimal 1 gambar harus dijadikan banner";
        }

        if (Object.keys(errors).length > 0) {
            connection.release();
            return NextResponse.json(
                { success: false, message: "Validasi gagal", errors },
                { status: 400 }
            );
        }

        // Start transaction
        await connection.beginTransaction();

        try {
            // ✅ Insert vanue parent
            const [venueResult] = await connection.query(
                `
                INSERT INTO vanue (name_ind, name_eng, description_ind, description_eng, slug, created_by, created_at)
                VALUES (?, ?, ?, ?, ?, ?, NOW())
                `,
                [name_ind, name_eng, description_ind, description_eng, slug, createdBy]
            );

            const venueId = (venueResult as unknown as { insertId: number }).insertId;

            // ✅ Insert vanue_facilities (junction table)
            for (const facilityId of selectedFacilities) {
                await connection.query(
                    `
                    INSERT INTO vanue_facilities (vanue_id, mstr_vanue_facilities, created_by, created_at)
                    VALUES (?, ?, ?, NOW())
                    `,
                    [venueId, facilityId, createdBy]
                );
            }

            // ✅ Insert vanue_gallery
            for (const image of uploadedImages) {
                await connection.query(
                    `
                    INSERT INTO vanue_gallery (vanue_id, image, is_banner, created_by, created_at)
                    VALUES (?, ?, ?, ?, NOW())
                    `,
                    [venueId, image.path, image.is_banner, createdBy]
                );
            }

            // ✅ Insert venue_keys
            for (const key of venueKeys) {
                await connection.query(
                    `
                    INSERT INTO venue_keys (vanue_id, icon, label_ind, label_eng, value_ind, value_eng, created_by, created_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
                    `,
                    [venueId, key.icon, key.label_ind, key.label_eng, key.value_ind, key.value_eng, createdBy]
                );
            }

            // ✅ Insert vanue_services
            for (const service of venueServices) {
                await connection.query(
                    `
                    INSERT INTO vanue_services (vanue_id, name_service_ind, name_service_eng, description_ind, description_eng, created_by, created_at)
                    VALUES (?, ?, ?, ?, ?, ?, NOW())
                    `,
                    [
                        venueId,
                        service.name_service_ind,
                        service.name_service_eng,
                        service.description_ind,
                        service.description_eng,
                        createdBy,
                    ]
                );
            }

            // ✅ Insert vanue_notes
            for (const note of venueNotes) {
                await connection.query(
                    `
                    INSERT INTO vanue_notes (vanue_id, description_ind, description_eng, created_by, created_at)
                    VALUES (?, ?, ?, ?, NOW())
                    `,
                    [venueId, note.description_ind, note.description_eng, createdBy]
                );
            }

            await connection.commit();
            connection.release();

            return NextResponse.json(
                {
                    success: true,
                    message: "Venue berhasil ditambahkan",
                    data: { id: venueId },
                },
                { status: 201 }
            );
        } catch (transactionError) {
            await connection.rollback();
            connection.release();
            throw transactionError;
        }
    } catch (error) {
        console.error("[CREATE_VENUE_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Terjadi kesalahan server" },
            { status: 500 }
        );
    }
}
