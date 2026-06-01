export async function createEvent(payload: {
    title_ind: string;
    title_eng: string;
    description_ind: string;
    description_eng: string;
    slug: string;
    thumbnail: Blob;
    hosted_by: string;
    date_event: string;
    time_event: string;
    location: string;
}) {
    const formData = new FormData();
    formData.append("title_ind", payload.title_ind);
    formData.append("title_eng", payload.title_eng);
    formData.append("description_ind", payload.description_ind);
    formData.append("description_eng", payload.description_eng);
    formData.append("slug", payload.slug);
    formData.append("thumbnail", payload.thumbnail, "thumbnail.webp");
    formData.append("hosted_by", payload.hosted_by);
    formData.append("date_event", payload.date_event);
    formData.append("time_event", payload.time_event);
    formData.append("location", payload.location);

    const res = await fetch("/api/admin/event", {
        method: "POST",
        body: formData,
    });
    return await res.json();
}

export async function getEventById(id: number) {
    const res = await fetch(`/api/admin/event/${id}`);
    return await res.json();
}

export async function updateEvent(
    id: number,
    payload: {
        title_ind: string;
        title_eng: string;
        description_ind: string;
        description_eng: string;
        slug: string;
        thumbnail: Blob | null;
        hosted_by: string;
        date_event: string;
        time_event: string;
        location: string;
    }
) {
    const formData = new FormData();
    formData.append("title_ind", payload.title_ind);
    formData.append("title_eng", payload.title_eng);
    formData.append("description_ind", payload.description_ind);
    formData.append("description_eng", payload.description_eng);
    formData.append("slug", payload.slug);
    formData.append("hosted_by", payload.hosted_by);
    formData.append("date_event", payload.date_event);
    formData.append("time_event", payload.time_event);
    formData.append("location", payload.location);
    if (payload.thumbnail) {
        formData.append("thumbnail", payload.thumbnail, "thumbnail.webp");
    }

    const res = await fetch(`/api/admin/event/${id}`, {
        method: "PUT",
        body: formData,
    });
    return await res.json();
}

export async function deleteEvent(id: number) {
    const res = await fetch(`/api/admin/event/${id}`, {
        method: "DELETE",
    });
    return await res.json();
}