import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbWeb from "@/lib/db-web";

interface SessionUser {
    name: string;
    email: string;
}

interface PackageIncludeItem {
    name_ind: string;
    name_eng: string;
    id?: number;
}

interface ErrorResponse {
    [key: string]: string;
}

// ✅ GET - Fetch package by ID
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const packageId = Number(id);

    try {
        // Fetch our_menu_package
        const [packages] = await dbWeb.query(
            "SELECT * FROM our_menu_package WHERE id = ?",
            [packageId]
        );

        if (!Array.isArray(packages) || packages.length === 0) {
            return NextResponse.json(
                { success: false, message: "Data tidak ditemukan" },
                { status: 404 }
            );
        }

        // Fetch package_include
        const [includes] = await dbWeb.query(
            "SELECT id, name_ind, name_eng FROM package_include WHERE our_menu_package_id = ?",
            [packageId]
        );

        return NextResponse.json({
            success: true,
            data: {
                ...(packages[0] as Record<string, unknown>),
                package_include: includes || [],
            },
        });
    } catch (error) {
        console.error("[GET_PACKAGE_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Gagal mengambil data" },
            { status: 500 }
        );
    }
}

// ✅ PUT - Update package
export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const packageId = Number(id);
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
        const food_package_id = formData.get("food_package_id") as string;
        const name_ind = formData.get("name_ind") as string;
        const name_eng = formData.get("name_eng") as string;
        const description_ind = formData.get("description_ind") as string;
        const description_eng = formData.get("description_eng") as string;
        const icon = formData.get("icon") as string;
        const minimum_guest = parseInt(formData.get("minimum_guest") as string);
        const is_popular = formData.get("is_popular") === "1" ? 1 : 0;
        const color = formData.get("color") as string;

        const packageIncludeJson = formData.get("package_include") as string;
        const deletedIncludeIdsJson = formData.get("deleted_include_ids") as string;

        const packageInclude = JSON.parse(packageIncludeJson) as PackageIncludeItem[];
        const deletedIncludeIds = JSON.parse(deletedIncludeIdsJson) as number[];

        // Validation
        const errors: ErrorResponse = {};

        if (!name_ind?.trim()) errors.name_ind = "Nama Package Indonesia wajib diisi";
        if (!name_eng?.trim()) errors.name_eng = "Nama Package English wajib diisi";
        if (!description_ind?.trim()) errors.description_ind = "Deskripsi Indonesia wajib diisi";
        if (!description_eng?.trim()) errors.description_eng = "Deskripsi English wajib diisi";
        if (!icon?.trim()) errors.icon = "Icon wajib diisi";
        if (!color) errors.color = "Warna wajib dipilih";

        if (Object.keys(errors).length > 0) {
            connection.release();
            return NextResponse.json(
                { success: false, message: "Validasi gagal", errors },
                { status: 400 }
            );
        }

        await connection.beginTransaction();

        try {
            if (is_popular === 1) {
                const [existingPopular] = await connection.query(
                    "SELECT id FROM our_menu_package WHERE food_package_id = ? AND is_popular = 1 AND id != ? LIMIT 1",
                    [parseInt(food_package_id), packageId]  // ← Exclude current package
                );
                if (Array.isArray(existingPopular) && existingPopular.length > 0) {
                    await connection.rollback();
                    connection.release();
                    return NextResponse.json(
                        {
                            success: false,
                            message: "Sudah ada package populer untuk food package ini",
                        },
                        { status: 400 }
                    );
                }
            }
            // ✅ Update our_menu_package
            await connection.query(
                `
                UPDATE our_menu_package SET
                    food_package_id = ?, name_ind = ?, name_eng = ?,
                    description_ind = ?, description_eng = ?, icon = ?,
                    minimum_guest = ?, is_popular = ?, color = ?,
                    updated_by = ?, updated_at = NOW()
                WHERE id = ?
                `,
                [
                    parseInt(food_package_id),
                    name_ind,
                    name_eng,
                    description_ind,
                    description_eng,
                    icon,
                    minimum_guest,
                    is_popular,
                    color,
                    updatedBy,
                    packageId,
                ]
            );

            // ✅ Delete removed include items
            if (deletedIncludeIds.length > 0) {
                await connection.query(
                    `DELETE FROM package_include WHERE id IN (${deletedIncludeIds.map(() => "?").join(",")}) AND our_menu_package_id = ?`,
                    [...deletedIncludeIds, packageId]
                );
            }

            // ✅ Insert new include items (those without id)
            for (const include of packageInclude) {
                if (!include.id) {
                    await connection.query(
                        `
                        INSERT INTO package_include (our_menu_package_id, name_ind, name_eng, created_by, created_at)
                        VALUES (?, ?, ?, ?, NOW())
                        `,
                        [packageId, include.name_ind, include.name_eng, updatedBy]
                    );
                }
            }

            await connection.commit();
            connection.release();

            return NextResponse.json({
                success: true,
                message: "Package berhasil diperbarui",
                data: { id: packageId },
            });
        } catch (transactionError) {
            await connection.rollback();
            connection.release();
            throw transactionError;
        }
    } catch (error) {
        console.error("[UPDATE_PACKAGE_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Terjadi kesalahan server" },
            { status: 500 }
        );
    }
}

// ✅ DELETE - Delete package with cascade
export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const packageId = Number(id);
    const connection = await dbWeb.getConnection();

    try {
        await connection.beginTransaction();

        try {
            // ✅ Delete child records dari package_include terlebih dahulu
            await connection.query(
                "DELETE FROM package_include WHERE our_menu_package_id = ?",
                [packageId]
            );

            // ✅ Delete parent record dari our_menu_package
            const [result] = await connection.query(
                "DELETE FROM our_menu_package WHERE id = ?",
                [packageId]
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
            connection.release();

            return NextResponse.json({
                success: true,
                message: "Package berhasil dihapus",
            });
        } catch (transactionError) {
            await connection.rollback();
            connection.release();
            throw transactionError;
        }
    } catch (error) {
        console.error("[DELETE_PACKAGE_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Gagal menghapus package" },
            { status: 500 }
        );
    }
}