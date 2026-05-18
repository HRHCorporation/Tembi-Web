import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbWeb from "@/lib/db-web";

interface SessionUser {
    name: string;
    email: string;
}

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const serviceId = Number(id);

    try {
        const [service] = await dbWeb.query(
            "SELECT * FROM mstr_services WHERE id = ?",
            [serviceId]
        );

        if (!Array.isArray(service) || service.length === 0) {
            return NextResponse.json(
                { success: false, message: "Data tidak ditemukan" },
                { status: 404 }
            );
        }

        // ✅ Fetch amenities
        const [amenities] = await dbWeb.query(
            "SELECT id, name_ind, name_eng FROM amenities_services WHERE services_id = ?",
            [serviceId]
        );

        return NextResponse.json({
            success: true,
            data: {
                ...(service[0] as Record<string, unknown>),
                amenities: amenities || [],
            },
        });
    } catch (error) {
        console.error("[GET_AMENTIES_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Gagal mengambil data" },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const serviceId = Number(id);
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
        const name_ind = formData.get("name_ind") as string;
        const name_eng = formData.get("name_eng") as string;
        const icon = formData.get("icon") as string;
        const is_addition = formData.get("is_addition") === "1" ? 1 : 0;

        // ✅ Parse amenities
        const amenitiesJson = formData.get("amenities") as string;
        const deletedIdsJson = formData.get("deleted_amenity_ids") as string;

        const amenities = JSON.parse(amenitiesJson) as Array<{ name_ind: string; name_eng: string; id?: number }>;
        const deletedIds = JSON.parse(deletedIdsJson) as number[];

        // Validation
        if (!name_ind?.trim() || !name_eng?.trim() || !icon?.trim()) {
            connection.release();
            return NextResponse.json(
                { success: false, message: "Data tidak lengkap" },
                { status: 400 }
            );
        }

        await connection.beginTransaction();

        try {
            // ✅ Update mstr_services
            await connection.query(
                `
                UPDATE mstr_services 
                SET name_ind = ?, name_eng = ?, icon = ?, is_addition = ?, updated_by = ?, updated_at = NOW()
                WHERE id = ?
                `,
                [name_ind, name_eng, icon, is_addition, updatedBy, serviceId]
            );

            // ✅ Delete removed amenities
            if (deletedIds.length > 0) {
                await connection.query(
                    `
                    DELETE FROM amenities_services 
                    WHERE id IN (${deletedIds.map(() => "?").join(",")}) AND services_id = ?
                    `,
                    [...deletedIds, serviceId]
                );
            }

            // ✅ Insert new amenities (those without id)
            for (const amenity of amenities) {
                if (!amenity.id) {
                    await connection.query(
                        `
                        INSERT INTO amenities_services (services_id, name_ind, name_eng, created_by, created_at)
                        VALUES (?, ?, ?, ?, NOW())
                        `,
                        [serviceId, amenity.name_ind, amenity.name_eng, updatedBy]
                    );
                }
            }

            await connection.commit();
            connection.release();

            return NextResponse.json({
                success: true,
                message: "Fasilitas berhasil diperbarui",
                data: { id: serviceId },
            });
        } catch (error) {
            await connection.rollback();
            connection.release();
            throw error;
        }
    } catch (error) {
        console.error("[UPDATE_AMENTIES_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Gagal memperbarui fasilitas" },
            { status: 500 }
        );
    }
}


export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const serviceId = Number(id);
    const connection = await dbWeb.getConnection();

    try {
        const cookieStore = await cookies();
        const session = cookieStore.get(
            process.env.COOKIE_NAME || "admin_session_tembi"
        );

        let deletedBy = "system";
        if (session?.value) {
            const user = JSON.parse(session.value) as SessionUser;
            deletedBy = user.name;
        }

        await connection.beginTransaction();

        try {
            // ✅ Delete child records dari amenities_services terlebih dahulu
            await connection.query(
                "DELETE FROM amenities_services WHERE services_id = ?",
                [serviceId]
            );

            // ✅ Delete parent record dari mstr_services
            const [result] = await connection.query(
                "DELETE FROM mstr_services WHERE id = ?",
                [serviceId]
            );

            // Check jika ada record yang dihapus
            const deletedResult = result as any;
            if (deletedResult.affectedRows === 0) {
                await connection.rollback();
                connection.release();
                return NextResponse.json(
                    { success: false, message: "Data tidak ditemukan" },
                    { status: 404 }
                );
            }

            await connection.commit();
            connection.release();

            return NextResponse.json({
                success: true,
                message: "Fasilitas berhasil dihapus",
            });
        } catch (error) {
            await connection.rollback();
            connection.release();
            throw error;
        }
    } catch (error) {
        console.error("[DELETE_AMENTIES_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Gagal menghapus fasilitas" },
            { status: 500 }
        );
    }
}