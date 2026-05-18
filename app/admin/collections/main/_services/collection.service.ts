export async function createCollection(payload: {
    mstr_collection_id: string;
    name_ind: string;
    name_eng: string;
    description_ind: string;
    description_eng: string;
    image: Blob;
}) {
    const formData = new FormData();
    formData.append("mstr_collection_id", payload.mstr_collection_id);
    formData.append("name_ind", payload.name_ind);
    formData.append("name_eng", payload.name_eng);
    formData.append("description_ind", payload.description_ind);
    formData.append("description_eng", payload.description_eng);
    formData.append("image", payload.image, "image.webp");

    const res = await fetch("/api/admin/collections/main", {
        method: "POST",
        body: formData,
    });
    return await res.json();
}

export async function getCollectionById(id: number) {
    const res = await fetch(`/api/admin/collections/main/${id}`);
    return await res.json();
}

export async function updateCollection(
    id: number,
    payload: {
        mstr_collection_id: string;
        name_ind: string;
        name_eng: string;
        description_ind: string;
        description_eng: string;
        image: Blob | null;
    }
) {
    const formData = new FormData();
    formData.append("mstr_collection_id", payload.mstr_collection_id);
    formData.append("name_ind", payload.name_ind);
    formData.append("name_eng", payload.name_eng);
    formData.append("description_ind", payload.description_ind);
    formData.append("description_eng", payload.description_eng);
    if (payload.image) {
        formData.append("image", payload.image, "image.webp");
    }

    const res = await fetch(`/api/admin/collections/main/${id}`, {
        method: "PUT",
        body: formData,
    });
    return await res.json();
}

export async function deleteCollection(id: number) {
    const res = await fetch(`/api/admin/collections/main/${id}`, {
        method: "DELETE",
    });
    return await res.json();
}