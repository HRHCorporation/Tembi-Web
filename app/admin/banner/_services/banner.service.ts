export async function getBannerById(
    id: number
) {
    const res = await fetch(
        `/api/admin/banner/${id}`
    );
    return await res.json();
}

export async function updateBanner(
    id: number,
    payload: {
        title_ind: string,
        title_eng: string,
        description_ind: string,
        description_eng: string,
        image: Blob | null
    }
) {
    const formData =
        new FormData();
    formData.append(
        "title_ind",
        payload.title_ind
    );
    formData.append(
        "title_eng",
        payload.title_eng
    );
    formData.append(
        "description_ind",
        payload.description_ind
    );
    formData.append(
        "description_eng",
        payload.description_eng
    );

    if (payload.image) {
        formData.append("image", payload.image);
    }


    const res = await fetch(
        `/api/admin/banner/${id}`,
        {
            method: "PUT",
            body: formData,
        }
    );
    return await res.json();
}

export async function deleteBanner(id: number) {
    const res = await fetch(`/api/admin/banner/${id}`, {
        method: "DELETE",
    });
    return await res.json();
}