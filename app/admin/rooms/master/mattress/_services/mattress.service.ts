export async function createMattress(
    payload: {
        name: string;
    }
) {

    const formData =
        new FormData();

    formData.append(
        "name",
        payload.name
    );
    const res = await fetch(
        "/api/admin/rooms/master/mattress",
        {
            method: "POST",
            body: formData,
        }
    );
    return await res.json();
}

export async function getMattressById(
    id: number
) {
    const res = await fetch(
        `/api/admin/rooms/master/mattress/${id}`
    );
    return await res.json();
}

export async function updateMattress(
    id: number,
    payload: {
        name: string;
    }
) {
    const formData =
        new FormData();
    formData.append(
        "name",
        payload.name
    );
    const res = await fetch(
        `/api/admin/rooms/master/mattress/${id}`,
        {
            method: "PUT",
            body: formData,
        }
    );
    return await res.json();
}

export async function deleteMattress(id: number) {
    const res = await fetch(`/api/admin/rooms/master/mattress/${id}`, {
        method: "DELETE",
    });
    return await res.json();
}