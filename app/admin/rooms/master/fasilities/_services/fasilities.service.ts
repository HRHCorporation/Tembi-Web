export async function createFasility(
    payload: {
        name_ind: string;
        name_eng: string;
        icon: string;
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
        "/api/admin/rooms/master/fasilities",
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
        `/api/admin/rooms/master/fasilities/${id}`
    );
    return await res.json();
}

export async function updateFasility(
    id: number,
    payload: {
        name_ind: string;
        name_eng: string;
        icon: string;
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
        `/api/admin/rooms/master/fasilities/${id}`,
        {
            method: "PUT",
            body: formData,
        }
    );
    return await res.json();
}

export async function deleteFasility(id: number) {
    const res = await fetch(`/api/admin/rooms/master/fasilities/${id}`, {
        method: "DELETE",
    });
    return await res.json();
}