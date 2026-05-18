import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { cookies } from "next/headers";
import { RowDataPacket } from "mysql2";

// ← tipe untuk data fasilitas
interface AmentiesRow extends RowDataPacket {
    id: number;
    name_id: string;
    name_eng: string;
    icon: string;
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
        const [rows] = await dbWeb.query<AmentiesRow[]>(  // ← ganti any
            `
            SELECT id, name_ind, name_eng, icon, is_addition
            FROM mstr_services
            WHERE name_ind LIKE ? OR name_eng LIKE ?
            ORDER BY ${sortBy} ${sortOrder}
            LIMIT ? OFFSET ?
            `,
            [`%${search}%`, `%${search}%`, limit, offset]
        );
        const [totalRows] = await dbWeb.query<CountRow[]>(  // ← ganti any
            `
            SELECT COUNT(*) as total
            FROM mstr_services
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
export async function POST(request: NextRequest) {
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
        const name_ind = formData.get("name_ind") as string;
        const name_eng = formData.get("name_eng") as string;
        const icon = formData.get("icon") as string;
        const is_addition = formData.get("is_addition") === "1" ? 1 : 0;
        const amenitiesJson = formData.get("amenities") as string;
        const amenities = JSON.parse(amenitiesJson) as Array<{ name_ind: string; name_eng: string }>;

        const connection = await dbWeb.getConnection();

        try {
            await connection.beginTransaction();

            // ✅ Insert ke mstr_services
            const [result] = await connection.query(
                `
                INSERT INTO mstr_services (name_ind, name_eng, icon, is_addition, created_by, created_at)
                VALUES (?, ?, ?, ?, ?, NOW())
                `,
                [name_ind, name_eng, icon, is_addition, createdBy]
            );

            const serviceId = (result as any).insertId;

            // ✅ Insert amenities ke amenities_services
            for (const amenity of amenities) {
                await connection.query(
                    `
                    INSERT INTO amenities_services (services_id, name_ind, name_eng, created_by, created_at)
                    VALUES (?, ?, ?, ?, NOW())
                    `,
                    [serviceId, amenity.name_ind, amenity.name_eng, createdBy]
                );
            }

            await connection.commit();
            connection.release();

            return NextResponse.json({
                success: true,
                message: "Fasilitas berhasil ditambahkan",
                data: { id: serviceId },
            });
        } catch (error) {
            await connection.rollback();
            connection.release();
            throw error;
        }
    } catch (error) {
        console.error("[CREATE_AMENTIES_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Failed to create amenties" },
            { status: 500 }
        );
    }
}
