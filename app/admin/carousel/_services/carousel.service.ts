export async function createCarousel(
    payload: {
        title_ind: string;
        title_eng: string;
        is_active: string;
        image: Blob;
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
        "is_active",
        payload.is_active
    );

    formData.append(
        "image",
        payload.image,
        "carousel.jpg"
    );

    const res = await fetch(
        "/api/admin/carousel",
        {
            method: "POST",
            body: formData,
        }
    );

    return await res.json();
}

export async function getCarouselById(
    id: string
) {

    const res = await fetch(
        `/api/admin/carousel/${id}`
    );

    return await res.json();
}

export async function updateCarousel(
    id: string,
    payload: {
        title_ind: string;
        title_eng: string;
        is_active: string;
        image?: Blob | null;
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
        "is_active",
        payload.is_active
    );

    if (payload.image) {

        formData.append(
            "image",
            payload.image,
            "carousel.jpg"
        );

    }

    const res = await fetch(
        `/api/admin/carousel/${id}`,
        {
            method: "PUT",
            body: formData,
        }
    );

    return await res.json();
}

export async function deleteCarousel(id: number) {
    const res = await fetch(`/api/admin/carousel/${id}`, {
        method: "DELETE",
    });
    return await res.json();
}