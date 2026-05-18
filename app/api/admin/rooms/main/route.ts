import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { RowDataPacket } from "mysql2";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { cookies } from "next/headers";
import sharp from "sharp";

interface RoomRow extends RowDataPacket {
    id: number;
    title_ind: string;
    title_eng: string;
    room_price: number;
    number_guest: number;
    mattress_name: string;   // dari JOIN mstr_mattress_room
    tiers_name: string;      // dari JOIN mstr_tiers_room
    is_recomendation: number;
}

interface CountRow extends RowDataPacket {
    total: number;
}

interface RecommendationCountResult extends RowDataPacket {
    count: number;
}

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
        const sortBy = searchParams.get("sortBy") || "r.id";
        const sortOrder = searchParams.get("sortOrder") || "DESC";
        const offset = (page - 1) * limit;

        const [rows] = await dbWeb.query<RoomRow[]>(
            `
            SELECT
                r.id,
                r.title_ind,
                r.title_eng,
                r.room_price,
                r.number_guest,
                r.is_recomendation,
                m.name AS mattress_name,
                t.name_id AS tiers_name
            FROM room r
            LEFT JOIN mstr_mattress_room m ON r.matters_id = m.id
            LEFT JOIN mstr_tiers_room t ON r.tiers_id = t.id
            WHERE r.title_ind LIKE ? OR r.title_eng LIKE ?
            ORDER BY ${sortBy} ${sortOrder}
            LIMIT ? OFFSET ?
            `,
            [`%${search}%`, `%${search}%`, limit, offset]
        );

        const [totalRows] = await dbWeb.query<CountRow[]>(
            `
            SELECT COUNT(*) as total
            FROM room r
            WHERE r.title_ind LIKE ? OR r.title_eng LIKE ?
            `,
            [`%${search}%`, `%${search}%`]
        );

        const total = totalRows[0].total;
        const totalPages = Math.ceil(total / limit);

        return NextResponse.json({
            success: true,
            data: rows,
            pagination: { total, totalPages },
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch data" },
            { status: 500 }
        );
    }
}


export async function POST(req: NextRequest) {
    const connection = await dbWeb.getConnection();

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
        const formData = await req.formData();
        // ════════════════════════════════════════════
        // EXTRACT FORM DATA
        // ════════════════════════════════════════════
        const title_ind = formData.get("title_ind") as string;
        const title_eng = formData.get("title_eng") as string;
        const subtitle_ind = formData.get("subtitle_ind") as string;
        const subtitle_eng = formData.get("subtitle_eng") as string;
        const description_ind = formData.get("description_ind") as string;
        const description_eng = formData.get("description_eng") as string;
        const is_recomendation = formData.get("is_recomendation") === "1";
        const matters_id = parseInt(formData.get("mattress_id") as string);
        const tiers_id = parseInt(formData.get("tiers_id") as string);
        const number_guest = parseInt(formData.get("number_guest") as string);
        const spacious_room = parseFloat(formData.get("spacious_room") as string) || 0;
        const room_price = parseInt(formData.get("room_price") as string);
        const slug = formData.get("slug") as string;


        // Extract arrays
        const facility_ids = formData.getAll("facility_ids[]").map((id) => parseInt(id as string));
        const policy_ids = formData.getAll("policy_ids[]").map((id) => parseInt(id as string));
        const rule_ids = formData.getAll("rule_ids[]").map((id) => parseInt(id as string));

        // Extract images - lebih robust way
        const imageEntries = Array.from(formData.entries()).filter(([key]) => key.startsWith("images["));
        const imageFiles: { file: File; isBanner: boolean; index: number }[] = [];

        imageEntries.forEach(([key, value]) => {
            const match = key.match(/images\[(\d+)\]/);
            if (match && value instanceof File) {
                const index = parseInt(match[1]);
                const isBanner = formData.get(`images_banner[${index}]`) === "1";
                imageFiles.push({ file: value as File, isBanner, index });
            }
        });

        // ════════════════════════════════════════════
        // VALIDATION
        // ════════════════════════════════════════════
        const errors: Record<string, string> = {};

        if (!title_ind?.trim()) {
            errors.title_ind = "Judul Indonesia wajib diisi";
        }
        if (!title_eng?.trim()) {
            errors.title_eng = "Judul English wajib diisi";
        }
        if (!subtitle_ind?.trim()) {
            errors.subtitle_ind = "Subjudul Indonesia wajib diisi";
        }
        if (!subtitle_eng?.trim()) {
            errors.subtitle_eng = "Subjudul English wajib diisi";
        }
        if (!description_ind?.trim()) {
            errors.description_ind = "Deskripsi Indonesia wajib diisi";
        }
        if (!description_eng?.trim()) {
            errors.description_eng = "Deskripsi English wajib diisi";
        }
        if (!room_price || room_price < 0) {
            errors.room_price = "Harga wajib diisi dan positif";
        }
        if (!number_guest || number_guest < 1) {
            errors.number_guest = "Jumlah tamu minimal 1";
        }
        if (!matters_id) {
            errors.matters_id = "Jenis kasur wajib dipilih";
        }
        if (!slug?.trim()) {
            errors.slug = "Slug wajib diisi";
        }
        if (facility_ids.length === 0) {
            errors.selected_facilities = "Pilih minimal 1 fasilitas";
        }
        if (policy_ids.length === 0) {
            errors.selected_policies = "Pilih minimal 1 kebijakan";
        }
        if (rule_ids.length === 0) {
            errors.selected_rules = "Pilih minimal 1 aturan";
        }
        if (imageFiles.length === 0) {
            errors.images = "Upload minimal 1 foto";
        }
        if (tiers_id === 0) {
            errors.tiers_id = "Pilih Tier Kamar";
        }

        // Check banner
        const bannerCount = imageFiles.filter((img) => img.isBanner).length;
        if (bannerCount === 0) {
            errors.images = "Pilih 1 foto sebagai banner utama";
        }
        if (bannerCount > 1) {
            errors.images = "Hanya boleh 1 foto sebagai banner";
        }

        // Return validation errors
        if (Object.keys(errors).length > 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Validasi gagal",
                    errors,
                },
                { status: 400 }
            );
        }

        // ════════════════════════════════════════════
        // CHECK RECOMMENDATION LIMIT
        // ════════════════════════════════════════════
        if (is_recomendation) {
            const [countResult] = await connection.query<RecommendationCountResult[]>(
                "SELECT COUNT(*) as count FROM room WHERE is_recomendation = true"
            );

            if (countResult[0]?.count >= 3) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Sudah ada 3 kamar yang di-rekomendasi. Hapus salah satu untuk menambah baru.",
                        errors: { is_recomendation: "Limit rekomendasi tercapai" },
                    },
                    { status: 400 }
                );
            }
        }

        // ════════════════════════════════════════════
        // PROCESS & SAVE IMAGES
        // ════════════════════════════════════════════
        const processedImages: { dbPath: string; isBanner: boolean }[] = [];

        for (const imgData of imageFiles) {
            const buffer = await imgData.file.arrayBuffer();

            // Konversi ke webp pakai sharp
            const webpBuffer = await sharp(Buffer.from(buffer))
                .webp({ quality: 80 })
                .toBuffer();

            const filename = `${slug}-${Date.now()}-${imgData.index}.webp`;  // ← selalu .webp
            const dbPath = `/images/upload/room/${filename}`;
            const filepath = join(process.cwd(), `public/images/upload/room/${filename}`);

            await mkdir(join(process.cwd(), "public/images/upload/room"), { recursive: true });
            await writeFile(filepath, webpBuffer);  // ← simpan webpBuffer bukan buffer asli

            processedImages.push({
                dbPath,
                isBanner: imgData.isBanner,
            });
        }

        // ════════════════════════════════════════════
        // START TRANSACTION
        // ════════════════════════════════════════════
        await connection.beginTransaction();

        try {
            // ════════════════════════════════════════════
            // CREATE ROOM
            // ════════════════════════════════════════════
            const [roomResult] = await connection.query(
                `
                    INSERT INTO room (
                        title_ind, title_eng, subtitle_ind, subtitle_eng,
                        description_ind, description_eng, matters_id,
                        number_guest, spacious_room, room_price, slug,
                        is_recomendation, created_by, created_at, updated_at, tiers_id
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?)
                    `,
                [
                    title_ind, title_eng, subtitle_ind, subtitle_eng,
                    description_ind, description_eng, matters_id,
                    number_guest, spacious_room, room_price, slug,
                    is_recomendation ? 1 : 0, createdBy, tiers_id
                ]
            );

            const room_id = (roomResult as unknown as { insertId: number }).insertId;

            if (!room_id) {
                throw new Error("Failed to create room");
            }

            // ════════════════════════════════════════════
            // INSERT ROOM FACILITIES
            // ════════════════════════════════════════════
            for (const fac_id of facility_ids) {
                await connection.query(
                    `
                    INSERT INTO room_facilities (room_id, facilities_id, created_by, created_at, updated_at)
                    VALUES (?, ?, ?, NOW(), NOW())
                    `,
                    [room_id, fac_id, createdBy]
                );
            }

            // ════════════════════════════════════════════
            // INSERT ROOM POLICIES
            // ════════════════════════════════════════════
            for (const pol_id of policy_ids) {
                await connection.query(
                    `
                    INSERT INTO room_policies (room_id, policies_id, created_by, created_at, updated_at)
                    VALUES (?, ?, ?, NOW(), NOW())
                    `,
                    [room_id, pol_id, createdBy]
                );
            }

            // ════════════════════════════════════════════
            // INSERT ROOM RULES
            // ════════════════════════════════════════════
            for (const rule_id of rule_ids) {
                await connection.query(
                    `
                    INSERT INTO room_rules (room_id, house_rules_id, created_by, created_at, updated_at)
                    VALUES (?, ?, ?, NOW(), NOW())
                    `,
                    [room_id, rule_id, createdBy]
                );
            }

            // ════════════════════════════════════════════
            // INSERT ROOM GALLERY
            // ════════════════════════════════════════════
            for (const img of processedImages) {
                await connection.query(
                    `
        INSERT INTO room_gallery (room_id, image, is_banner, created_by, created_at, updated_at)
        VALUES (?, ?, ?, ?, NOW(), NOW())
        `,
                    [room_id, img.dbPath, img.isBanner ? 1 : 0, createdBy]  // ← img.dbPath
                );
            }

            // ════════════════════════════════════════════
            // COMMIT TRANSACTION
            // ════════════════════════════════════════════
            await connection.commit();

            return NextResponse.json(
                {
                    success: true,
                    message: "Kamar berhasil dibuat",
                    data: {
                        id: room_id,
                        slug,
                    },
                },
                { status: 201 }
            );
        } catch (transactionError) {
            await connection.rollback();
            throw transactionError;
        }
    } catch (error) {
        console.error("[CREATE_ROOM_ERROR]", error);
        if (error instanceof Error) {
            console.error("Error message:", error.message);
            console.error("Error stack:", error.stack);
        }
        return NextResponse.json(
            {
                success: false,
                message: "Terjadi kesalahan server",
                debug: String(error),
            },
            { status: 500 }
        );
    } finally {
        connection.release();
    }
}
