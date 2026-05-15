export async function createAmenties(payload: {
    name_ind: string;
    name_eng: string;
    icon: string;
    is_addition: string;
    amenities: Array<{ name_ind: string; name_eng: string }>;
}) {
    const formData = new FormData();
    formData.append("name_ind", payload.name_ind);
    formData.append("name_eng", payload.name_eng);
    formData.append("icon", payload.icon);
    formData.append("is_addition", payload.is_addition);

    // ✅ Append amenities as JSON string
    formData.append("amenities", JSON.stringify(payload.amenities));

    const res = await fetch("/api/admin/rooms/amenties", {
        method: "POST",
        body: formData,
    });
    return await res.json();
}

export async function getAmentiesById(id: number) {
    const res = await fetch(`/api/admin/rooms/amenties/${id}`);
    return await res.json();
}

export async function updateAmenties(
    id: number,
    payload: {
        name_ind: string;
        name_eng: string;
        icon: string;
        is_addition: string;
        amenities: Array<{ name_ind: string; name_eng: string; id?: number }>;
        deleted_amenity_ids: number[];
    }
) {
    const formData = new FormData();
    formData.append("name_ind", payload.name_ind);
    formData.append("name_eng", payload.name_eng);
    formData.append("icon", payload.icon);
    formData.append("is_addition", payload.is_addition);

    // ✅ Append amenities as JSON
    formData.append("amenities", JSON.stringify(payload.amenities));
    formData.append("deleted_amenity_ids", JSON.stringify(payload.deleted_amenity_ids));

    const res = await fetch(`/api/admin/rooms/amenties/${id}`, {
        method: "PUT",
        body: formData,
    });
    return await res.json();
}

export async function deleteAmenties(id: number) {
    const res = await fetch(`/api/admin/rooms/amenties/${id}`, {
        method: "DELETE",
    });
    return await res.json();
}