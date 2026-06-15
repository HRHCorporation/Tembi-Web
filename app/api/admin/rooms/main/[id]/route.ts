import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { RowDataPacket, PoolConnection } from "mysql2/promise";
import { unlink } from "fs/promises";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { join } from "path";
import sharp from "sharp";


interface GalleryRow extends RowDataPacket {
    image: string;
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }  // ← Promise
) {
    const { id: rawId } = await params;               // ← await
    const id = Number(rawId);

    if (!id || isNaN(id)) {
        return NextResponse.json(
            { success: false, message: "ID tidak valid" },
            { status: 400 }
        );
    }

    const conn: PoolConnection = await dbWeb.getConnection();

    try {
        await conn.beginTransaction();

        const [galleries] = await conn.query<GalleryRow[]>(
            `SELECT image FROM room_gallery WHERE room_id = ?`,
            [id]
        );

        await conn.query(`DELETE FROM room_facilities WHERE room_id = ?`, [id]);
        await conn.query(`DELETE FROM room_policies    WHERE room_id = ?`, [id]);
        await conn.query(`DELETE FROM room_rules       WHERE room_id = ?`, [id]);
        await conn.query(`DELETE FROM room_gallery     WHERE room_id = ?`, [id]);
        await conn.query(`DELETE FROM room             WHERE id = ?`, [id]);

        await conn.commit();

        for (const gallery of galleries) {
            try {
                const filePath = path.join(process.cwd(), "public", gallery.image);
                await unlink(filePath);
            } catch {
                console.warn(`File tidak ditemukan, skip: ${gallery.image}`);
            }
        }

        return NextResponse.json({ success: true, message: "Kamar berhasil dihapus" });

    } catch (error) {
        await conn.rollback();
        console.error(error);
        return NextResponse.json(
            { success: false, message: "Gagal menghapus data" },
            { status: 500 }
        );
    } finally {
        conn.release();
    }
}


interface UpdateRoomResult {
    insertId?: number;
    affectedRows: number;
}

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id: rawId } = await params;               // ← await
    const roomId = Number(rawId);

    try {
        const connection = await dbWeb.getConnection();

        const [roomResult] = await connection.query(
            `
            SELECT r.*, m.name as mattress_name, t.name_id as tiers_name
            FROM room r
            LEFT JOIN mstr_mattress_room m ON r.matters_id = m.id
            LEFT JOIN mstr_tiers_room t ON r.tiers_id = t.id
            WHERE r.id = ?
            `,
            [roomId]
        );

        if (!Array.isArray(roomResult) || roomResult.length === 0) {
            connection.release();
            return NextResponse.json(
                { success: false, message: "Kamar tidak ditemukan" },
                { status: 404 }
            );
        }

        const room = roomResult[0] as Record<string, unknown>;

        // Fetch relations
        const [facilities] = await connection.query(
            "SELECT facilities_id as id FROM room_facilities WHERE room_id = ?",
            [roomId]
        );

        const [policies] = await connection.query(
            "SELECT policies_id as id FROM room_policies WHERE room_id = ?",
            [roomId]
        );

        const [rules] = await connection.query(
            "SELECT house_rules_id as id FROM room_rules WHERE room_id = ?",
            [roomId]
        );

        const [images] = await connection.query(
            "SELECT id, image as url, is_banner FROM room_gallery WHERE room_id = ?",
            [roomId]
        );

        connection.release();

        return NextResponse.json(
            {
                success: true,
                data: {
                    ...room,
                    facilities: facilities || [],
                    policies: policies || [],
                    rules: rules || [],
                    images: images || [],
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("[GET_ROOM_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Terjadi kesalahan server" },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id: rawId } = await params;
    const roomId = Number(rawId);
    const connection = await dbWeb.getConnection();

    try {
        const formData = await req.formData();

        // Extract form data
        const title_ind = formData.get("title_ind") as string;
        const title_eng = formData.get("title_eng") as string;
        const subtitle_ind = formData.get("subtitle_ind") as string;
        const subtitle_eng = formData.get("subtitle_eng") as string;
        const description_ind = formData.get("description_ind") as string;
        const description_eng = formData.get("description_eng") as string;
        const is_recomendation = formData.get("is_recomendation") === "1";
        const matters_id = parseInt(formData.get("mattress_id") as string);
        const number_guest = parseInt(formData.get("number_guest") as string);
        const spacious_room = parseFloat(formData.get("spacious_room") as string) || 0;
        const room_price = parseInt(formData.get("room_price") as string);
        const tiers_id = parseInt(formData.get("tiers_id") as string);

        const bannerImageId = formData.get("banner_image_id");

        // ✅ Generate slug dari title_eng (sama seperti create)
        const slug = title_eng
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "")
            .replace(/-+/g, "-")
            .replace(/^-+|-+$/g, "");

        // Extract arrays
        const facility_ids = formData.getAll("facility_ids[]").map((id) => parseInt(id as string));
        const policy_ids = formData.getAll("policy_ids[]").map((id) => parseInt(id as string));
        const rule_ids = formData.getAll("rule_ids[]").map((id) => parseInt(id as string));
        const deleted_image_ids = formData.getAll("deleted_image_ids[]").map((id) => parseInt(id as string));

        // Extract new images
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

        // Validation
        const errors: Record<string, string> = {};

        if (!title_ind?.trim()) errors.title_ind = "Judul Indonesia wajib diisi";
        if (!title_eng?.trim()) errors.title_eng = "Judul English wajib diisi";
        if (!subtitle_ind?.trim()) errors.subtitle_ind = "Subjudul Indonesia wajib diisi";
        if (!subtitle_eng?.trim()) errors.subtitle_eng = "Subjudul English wajib diisi";
        if (!description_ind?.trim()) errors.description_ind = "Deskripsi Indonesia wajib diisi";
        if (!description_eng?.trim()) errors.description_eng = "Deskripsi English wajib diisi";
        if (!room_price || room_price < 0) errors.room_price = "Harga wajib diisi dan positif";
        if (!number_guest || number_guest < 1) errors.number_guest = "Jumlah tamu minimal 1";
        if (!matters_id) errors.matters_id = "Jenis kasur wajib dipilih";
        if (facility_ids.length === 0) errors.selected_facilities = "Pilih minimal 1 fasilitas";
        if (policy_ids.length === 0) errors.selected_policies = "Pilih minimal 1 kebijakan";
        if (rule_ids.length === 0) errors.selected_rules = "Pilih minimal 1 aturan";

        if (Object.keys(errors).length > 0) {
            connection.release();
            return NextResponse.json(
                { success: false, message: "Validasi gagal", errors },
                { status: 400 }
            );
        }

        // ✅ Process new images - SAMA SEPERTI CREATE dengan SLUG
        const processedImages: { dbPath: string; isBanner: boolean }[] = [];

        for (const imgData of imageFiles) {
            const buffer = await imgData.file.arrayBuffer();

            // ✅ Convert ke WebP pakai sharp (sama seperti create)
            const webpBuffer = await sharp(Buffer.from(buffer))
                .resize({
                    width: 1920,
                    withoutEnlargement: true,
                })
                .webp({ quality: 80 })
                .toBuffer();

            // ✅ Filename dengan slug (sama seperti create)
            const filename = `${slug}-${Date.now()}-${imgData.index}.webp`;
            const dbPath = `/images/upload/room/${filename}`;
            const filepath = join(process.cwd(), `public/images/upload/room/${filename}`);

            await mkdir(join(process.cwd(), "public/images/upload/room"), { recursive: true });
            await writeFile(filepath, webpBuffer);  // ✅ Simpan webpBuffer

            processedImages.push({
                dbPath,
                isBanner: imgData.isBanner,
            });
        }

        // Start transaction
        await connection.beginTransaction();

        try {
            // ✅ UPDATE room dengan SLUG juga (sama seperti create)
            await connection.query(
                `
                UPDATE room SET
                    title_ind = ?, title_eng = ?, subtitle_ind = ?, subtitle_eng = ?,
                    description_ind = ?, description_eng = ?, matters_id = ?,
                    number_guest = ?, spacious_room = ?, room_price = ?,
                    is_recomendation = ?, tiers_id = ?, slug = ?, updated_at = NOW()
                WHERE id = ?
                `,
                [
                    title_ind, title_eng, subtitle_ind, subtitle_eng,
                    description_ind, description_eng, matters_id,
                    number_guest, spacious_room, room_price,
                    is_recomendation ? 1 : 0, tiers_id, slug, roomId,
                ]
            );

            // Delete old relations
            await connection.query("DELETE FROM room_facilities WHERE room_id = ?", [roomId]);
            await connection.query("DELETE FROM room_policies WHERE room_id = ?", [roomId]);
            await connection.query("DELETE FROM room_rules WHERE room_id = ?", [roomId]);

            // Insert new relations
            for (const fac_id of facility_ids) {
                await connection.query(
                    "INSERT INTO room_facilities (room_id, facilities_id, created_by, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())",
                    [roomId, fac_id, "system"]
                );
            }

            for (const pol_id of policy_ids) {
                await connection.query(
                    "INSERT INTO room_policies (room_id, policies_id, created_by, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())",
                    [roomId, pol_id, "system"]
                );
            }

            for (const rule_id of rule_ids) {
                await connection.query(
                    "INSERT INTO room_rules (room_id, house_rules_id, created_by, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())",
                    [roomId, rule_id, "system"]
                );
            }

            // Delete removed images
            if (deleted_image_ids.length > 0) {
                await connection.query(
                    `DELETE FROM room_gallery WHERE id IN (${deleted_image_ids.map(() => "?").join(",")})`,
                    deleted_image_ids
                );
            }

            await connection.query(
                "UPDATE room_gallery SET is_banner = 0 WHERE room_id = ?",
                [roomId]
            );

            if (bannerImageId) {
                await connection.query(
                    "UPDATE room_gallery SET is_banner = 1 WHERE id = ? AND room_id = ?",
                    [parseInt(bannerImageId as string), roomId]
                );
            }


            // Insert new images
            for (const img of processedImages) {
                await connection.query(
                    "INSERT INTO room_gallery (room_id, image, is_banner, created_by, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
                    [roomId, img.dbPath, img.isBanner ? 1 : 0, "system"]
                );
            }

            await connection.commit();

            return NextResponse.json(
                {
                    success: true,
                    message: "Kamar berhasil diperbarui",
                    data: { id: roomId },
                },
                { status: 200 }
            );
        } catch (transactionError) {
            await connection.rollback();
            throw transactionError;
        }
    } catch (error) {
        console.error("[UPDATE_ROOM_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Terjadi kesalahan server" },
            { status: 500 }
        );
    } finally {
        connection.release();
    }
}