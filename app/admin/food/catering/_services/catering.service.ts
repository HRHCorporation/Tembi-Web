export async function createCatering(payload: {
    type_catering_service_id: string;
    name_ind: string;
    name_eng: string;
    description_ind: string;
    description_eng: string;
    minimum_pax: string;
    hours_service_min: string;
    hours_service_max: string;
    title_menu_ind: string;
    title_menu_eng: string;
    description_menu_ind: string;
    description_menu_eng: string;
    description_card_ind: string;
    description_card_eng: string;
    slug: string;
    subtitle_menu_ind: string;
    subtitle_menu_eng: string;
    food_packages_primary: Array<{ name_ind: string; name_eng: string }>;
    image: Blob;
}) {
    const formData = new FormData();
    formData.append("type_catering_service_id", payload.type_catering_service_id);
    formData.append("name_ind", payload.name_ind);
    formData.append("name_eng", payload.name_eng);
    formData.append("description_ind", payload.description_ind);
    formData.append("description_eng", payload.description_eng);
    formData.append("minimum_pax", payload.minimum_pax);
    formData.append("hours_service_min", payload.hours_service_min);
    formData.append("hours_service_max", payload.hours_service_max);
    formData.append("title_menu_ind", payload.title_menu_ind);
    formData.append("title_menu_eng", payload.title_menu_eng);
    formData.append("description_menu_ind", payload.description_menu_ind);
    formData.append("description_menu_eng", payload.description_menu_eng);
    formData.append("description_card_ind", payload.description_card_ind);
    formData.append("description_card_eng", payload.description_card_eng);
    formData.append("slug", payload.slug);
    formData.append("food_packages_primary", JSON.stringify(payload.food_packages_primary));
    formData.append("image", payload.image);
    formData.append("subtitle_menu_ind", payload.subtitle_menu_ind);
    formData.append("subtitle_menu_eng", payload.subtitle_menu_eng);
    const res = await fetch("/api/admin/food/catering", {
        method: "POST",
        body: formData,
    });
    return await res.json();
}

export async function getCateringById(id: number) {
    const res = await fetch(`/api/admin/food/catering/${id}`);
    return await res.json();
}

export async function updateCatering(
    id: number,
    payload: {
        type_catering_service_id: string;
        name_ind: string;
        name_eng: string;
        description_ind: string;
        description_eng: string;
        minimum_pax: string;
        hours_service_min: string;
        hours_service_max: string;
        title_menu_ind: string;
        title_menu_eng: string;
        subtitle_menu_ind: string;
        subtitle_menu_eng: string;
        description_menu_ind: string;
        description_menu_eng: string;
        description_card_ind: string;
        description_card_eng: string;
        slug: string;
        food_packages_primary: Array<{ name_ind: string; name_eng: string; id?: number }>;
        deleted_primary_ids: number[];
        image: Blob | null;
    }
) {
    const formData = new FormData();
    formData.append("type_catering_service_id", payload.type_catering_service_id);
    formData.append("name_ind", payload.name_ind);
    formData.append("name_eng", payload.name_eng);
    formData.append("description_ind", payload.description_ind);
    formData.append("description_eng", payload.description_eng);
    formData.append("minimum_pax", payload.minimum_pax);
    formData.append("hours_service_min", payload.hours_service_min);
    formData.append("hours_service_max", payload.hours_service_max);
    formData.append("title_menu_ind", payload.title_menu_ind);
    formData.append("title_menu_eng", payload.title_menu_eng);
    formData.append("subtitle_menu_ind", payload.subtitle_menu_ind);
    formData.append("subtitle_menu_eng", payload.subtitle_menu_eng);
    formData.append("description_menu_ind", payload.description_menu_ind);
    formData.append("description_menu_eng", payload.description_menu_eng);
    formData.append("description_card_ind", payload.description_card_ind);
    formData.append("description_card_eng", payload.description_card_eng);
    formData.append("slug", payload.slug);

    // ✅ Append image only if new image selected
    if (payload.image) {
        formData.append("image", payload.image);
    }

    formData.append("food_packages_primary", JSON.stringify(payload.food_packages_primary));
    formData.append("deleted_primary_ids", JSON.stringify(payload.deleted_primary_ids));

    const res = await fetch(`/api/admin/food/catering/${id}`, {
        method: "PUT",
        body: formData,
    });
    return await res.json();
}

export async function deleteCatering(id: number) {
    const res = await fetch(`/api/admin/food/catering/${id}`, {
        method: "DELETE",
    });
    return await res.json();
}