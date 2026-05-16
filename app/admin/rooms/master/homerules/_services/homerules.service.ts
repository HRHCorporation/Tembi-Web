export async function createHomeRule(
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
        "/api/admin/rooms/master/homerules",
        {
            method: "POST",
            body: formData,
        }
    );
    return await res.json();
}

export async function getHomeRuleById(
    id: number
) {
    const res = await fetch(
        `/api/admin/rooms/master/homerules/${id}`
    );
    return await res.json();
}

export async function updateHomeRule(
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
        `/api/admin/rooms/master/homerules/${id}`,
        {
            method: "PUT",
            body: formData,
        }
    );
    return await res.json();
}

export async function deleteHomeRule(id: number) {
    const res = await fetch(`/api/admin/rooms/master/homerules/${id}`, {
        method: "DELETE",
    });
    return await res.json();
}