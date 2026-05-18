interface CreateRoomRequest {
    title_ind: string;
    title_eng: string;
    subtitle_ind: string;
    subtitle_eng: string;
    description_ind: string;
    description_eng: string;
    mattress_id: string;
    number_guest: number;
    spacious_room: number;
    room_price: number;
    slug: string;
    facility_ids: string[];
    policy_ids: string[];
    rule_ids: string[];
    images: File[];
}

// ✅ Replace any dengan Record<string, unknown>
interface CreateRoomResponse {
    success: boolean;
    message: string;
    data?: Record<string, unknown>;
    errors?: Record<string, string>;
}

interface Room {
    id: number;
    title_ind: string;
    title_eng: string;
    subtitle_ind: string;
    subtitle_eng: string;
    description_ind: string;
    description_eng: string;
    mattress_id: number;
    number_guest: number;
    spacious_room: number;
    room_price: number;
    slug: string;
    facilities: Array<{ id: number; name: string }>;
    policies: Array<{ id: number; name: string }>;
    rules: Array<{ id: number; name: string }>;
    images: Array<{ id: number; url: string; is_banner: boolean }>;
}

interface GetRoomResponse {
    success: boolean;
    message: string;
    data?: Room;
    errors?: Record<string, string>;
}

interface UpdateRoomResponse {
    success: boolean;
    message: string;
    data?: Room;
    errors?: Record<string, string>;
}

export async function createRoom(formData: FormData): Promise<CreateRoomResponse> {
    try {
        const response = await fetch("/api/admin/rooms/main", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json() as Record<string, unknown>;
            return {
                success: false,
                message: (error.message as string) || "Gagal membuat kamar",
                errors: error.errors as Record<string, string>,
            };
        }

        const data = await response.json() as Record<string, unknown>;
        return {
            success: true,
            message: (data.message as string) || "Kamar berhasil dibuat",
            data: data.data as Record<string, unknown>,
        };
    } catch (error) {
        console.error("Create room error:", error);
        return {
            success: false,
            message: "Terjadi kesalahan saat menghubungi server",
        };
    }
}

export async function getRoomById(id: number): Promise<CreateRoomResponse> {
    try {
        const response = await fetch(`/api/admin/rooms/main/${id}`);

        if (!response.ok) {
            const error = await response.json() as Record<string, unknown>;
            return {
                success: false,
                message: (error.message as string) || "Gagal memuat data kamar",
                errors: error.errors as Record<string, string>,
            };
        }

        const data = await response.json() as Record<string, unknown>;
        return {
            success: true,
            message: (data.message as string) || "Data kamar berhasil dimuat",
            data: data.data as Record<string, unknown>,
        };
    } catch (error) {
        console.error("Get room error:", error);
        return {
            success: false,
            message: "Terjadi kesalahan saat menghubungi server",
        };
    }
}

export async function updateRoom(id: number, formData: FormData): Promise<CreateRoomResponse> {
    try {
        const response = await fetch(`/api/admin/rooms/main/${id}`, {
            method: "PUT",
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json() as Record<string, unknown>;
            return {
                success: false,
                message: (error.message as string) || "Gagal memperbarui kamar",
                errors: error.errors as Record<string, string>,
            };
        }

        const data = await response.json() as Record<string, unknown>;
        return {
            success: true,
            message: (data.message as string) || "Kamar berhasil diperbarui",
            data: data.data as Record<string, unknown>,
        };
    } catch (error) {
        console.error("Update room error:", error);
        return {
            success: false,
            message: "Terjadi kesalahan saat menghubungi server",
        };
    }
}

export async function deleteRoom(id: number): Promise<CreateRoomResponse> {
    const res = await fetch(`/api/admin/rooms/main/${id}`, {
        method: "DELETE",
    });
    return await res.json() as CreateRoomResponse;
}