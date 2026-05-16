export async function createCollection(
    payload: {
        name_ind: string;
        name_eng: string;
    }
) {

    const formData =
        new FormData();

    formData.append(
        "name_ind",
        payload.name_ind
    );
    formData.append(
        "name_eng",
        payload.name_eng
    );
    const res = await fetch(
        "/api/admin/collections/master",
        {
            method: "POST",
            body: formData,
        }
    );
    return await res.json();
}

export async function getCollectionById(
    id: number
) {
    const res = await fetch(
        `/api/admin/collections/master/${id}`
    );
    return await res.json();
}

export async function updateCollection(
    id: number,
    payload: {
        name_ind: string;
        name_eng: string;
    }
) {
    const formData =
        new FormData();
    formData.append(
        "name_ind",
        payload.name_ind
    );
    formData.append(
        "name_eng",
        payload.name_eng
    );

    const res = await fetch(
        `/api/admin/collections/master/${id}`,
        {
            method: "PUT",
            body: formData,
        }
    );
    return await res.json();
}

export async function deleteCollection(id: number) {
    const res = await fetch(`/api/admin/collections/master/${id}`, {
        method: "DELETE",
    });
    return await res.json();
}