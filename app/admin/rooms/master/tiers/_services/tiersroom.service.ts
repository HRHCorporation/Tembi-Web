export async function createTiersRoom(
    payload: {
        name_id: string;
    }
) {

    const formData =
        new FormData();

    formData.append(
        "name_id",
        payload.name_id
    );
    const res = await fetch(
        "/api/admin/rooms/master/tiers",
        {
            method: "POST",
            body: formData,
        }
    );
    return await res.json();
}

export async function getTiersRoomById(
    id: number
) {
    const res = await fetch(
        `/api/admin/rooms/master/tiers/${id}`
    );
    return await res.json();
}

export async function updateTiersRoom(
    id: number,
    payload: {
        name_id: string;
    }
) {
    const formData =
        new FormData();
    formData.append(
        "name_id",
        payload.name_id
    );
    const res = await fetch(
        `/api/admin/rooms/master/tiers/${id}`,
        {
            method: "PUT",
            body: formData,
        }
    );
    return await res.json();
}

export async function deleteTiersRoom(id: number) {
    const res = await fetch(`/api/admin/rooms/master/tiers/${id}`, {
        method: "DELETE",
    });
    return await res.json();
}