export async function createPolicy(
    payload: {
        name_ind: string;
        name_eng: string;
        icon: string;
        type: string;
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
        "type",
        payload.type
    );
    const res = await fetch(
        "/api/admin/rooms/master/policies",
        {
            method: "POST",
            body: formData,
        }
    );
    return await res.json();
}

export async function getPolicyById(
    id: number
) {
    const res = await fetch(
        `/api/admin/rooms/master/policies/${id}`
    );
    return await res.json();
}

export async function updatePolicy(
    id: number,
    payload: {
        name_ind: string;
        name_eng: string;
        icon: string;
        type: string;
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
        "type",
        payload.type
    );

    const res = await fetch(
        `/api/admin/rooms/master/policies/${id}`,
        {
            method: "PUT",
            body: formData,
        }
    );
    return await res.json();
}

export async function deletePolicy(id: number) {
    const res = await fetch(`/api/admin/rooms/master/policies/${id}`, {
        method: "DELETE",
    });
    return await res.json();
}