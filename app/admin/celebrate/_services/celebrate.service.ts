export async function createCelebrate(payload: {
    name_ind: string;
    name_eng: string;
    description_ind: string;
    description_eng: string;
    image: Blob;
    celebrate_moment_list: Array<{ name_ind: string; name_eng: string }>;
}) {
    const formData = new FormData();
    formData.append("name_ind", payload.name_ind);
    formData.append("name_eng", payload.name_eng);
    formData.append("description_ind", payload.description_ind);
    formData.append("description_eng", payload.description_eng);
    formData.append("image", payload.image, "image.webp");
    formData.append("celebrate_moment_list", JSON.stringify(payload.celebrate_moment_list));

    const res = await fetch("/api/admin/celebrate", {
        method: "POST",
        body: formData,
    });
    return await res.json();
}

export async function getCelebrateById(id: number) {
    const res = await fetch(`/api/admin/celebrate/${id}`);
    return await res.json();
}

export async function updateCelebrate(
    id: number,
    payload: {
        name_ind: string;
        name_eng: string;
        description_ind: string;
        description_eng: string;
        image: Blob | null;
        celebrate_moment_list: Array<{ name_ind: string; name_eng: string; id?: number }>;
        deleted_list_ids: number[];
    }
) {
    const formData = new FormData();
    formData.append("name_ind", payload.name_ind);
    formData.append("name_eng", payload.name_eng);
    formData.append("description_ind", payload.description_ind);
    formData.append("description_eng", payload.description_eng);
    if (payload.image) {
        formData.append("image", payload.image, "image.webp");
    }
    formData.append("celebrate_moment_list", JSON.stringify(payload.celebrate_moment_list));
    formData.append("deleted_list_ids", JSON.stringify(payload.deleted_list_ids));

    const res = await fetch(`/api/admin/celebrate/${id}`, {
        method: "PUT",
        body: formData,
    });
    return await res.json();
}

export async function deleteCelebrate(id: number) {
    const res = await fetch(`/api/admin/celebrate/${id}`, {
        method: "DELETE",
    });
    return await res.json();
}