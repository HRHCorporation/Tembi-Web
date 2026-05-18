export async function createFasility(
    payload: {
        name_ind: string;
        name_eng: string;
        icon: string;
        description_ind: string;
        description_eng: string;
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
    formData.append(
        "icon",
        payload.icon
    );
    formData.append(
        "description_ind",
        payload.description_ind
    );
    formData.append(
        "description_eng",
        payload.description_eng
    );
    const res = await fetch(
        "/api/admin/vanue/facilities",
        {
            method: "POST",
            body: formData,
        }
    );
    return await res.json();
}

export async function getFasilityById(
    id: number
) {
    const res = await fetch(
        `/api/admin/vanue/facilities/${id}`
    );
    return await res.json();
}

export async function updateFasility(
    id: number,
    payload: {
        name_ind: string;
        name_eng: string;
        icon: string;
        description_ind: string;
        description_eng: string;
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
    formData.append(
        "icon",
        payload.icon
    );

    const res = await fetch(
        `/api/admin/vanue/facilities/${id}`,
        {
            method: "PUT",
            body: formData,
        }
    );
    return await res.json();
}

export async function deleteFasility(id: number) {
    const res = await fetch(`/api/admin/vanue/facilities/${id}`, {
        method: "DELETE",
    });
    return await res.json();
}