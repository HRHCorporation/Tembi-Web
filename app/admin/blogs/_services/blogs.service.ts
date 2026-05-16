export async function createBlog(payload: {
    title_ind: string;
    title_eng: string;
    description_ind: string;
    description_eng: string;
    slug: string;
    thumbnail: Blob;
}) {
    const formData = new FormData();
    formData.append("title_ind", payload.title_ind);
    formData.append("title_eng", payload.title_eng);
    formData.append("description_ind", payload.description_ind);
    formData.append("description_eng", payload.description_eng);
    formData.append("slug", payload.slug);
    formData.append("thumbnail", payload.thumbnail, "thumbnail.webp");

    const res = await fetch("/api/admin/blogs", {
        method: "POST",
        body: formData,
    });
    return await res.json();
}

export async function getBlogById(id: number) {
    const res = await fetch(`/api/admin/blogs/${id}`);
    return await res.json();
}

export async function updateBlog(
    id: number,
    payload: {
        title_ind: string;
        title_eng: string;
        description_ind: string;
        description_eng: string;
        slug: string;
        thumbnail: Blob | null;
    }
) {
    const formData = new FormData();
    formData.append("title_ind", payload.title_ind);
    formData.append("title_eng", payload.title_eng);
    formData.append("description_ind", payload.description_ind);
    formData.append("description_eng", payload.description_eng);
    formData.append("slug", payload.slug);
    if (payload.thumbnail) {
        formData.append("thumbnail", payload.thumbnail, "thumbnail.webp");
    }

    const res = await fetch(`/api/admin/blogs/${id}`, {
        method: "PUT",
        body: formData,
    });
    return await res.json();
}

export async function deleteBlog(id: number) {
    const res = await fetch(`/api/admin/blogs/${id}`, {
        method: "DELETE",
    });
    return await res.json();
}