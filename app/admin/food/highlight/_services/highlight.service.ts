export async function createHighlight(payload: {
    food_package_id: string;
    our_menu_food_id: string;
    image: Blob;
    description_ind: string;
    description_eng: string;
}) {
    const formData = new FormData();
    formData.append("food_package_id", payload.food_package_id);
    formData.append("our_menu_food_id", payload.our_menu_food_id);
    formData.append("image", payload.image, "image.webp");
    formData.append("description_ind", payload.description_ind);
    formData.append("description_eng", payload.description_eng);

    const res = await fetch("/api/admin/food/highlight", {
        method: "POST",
        body: formData,
    });
    return await res.json();
}

export async function getHighlightById(id: number) {
    const res = await fetch(`/api/admin/food/highlight/${id}`);
    return await res.json();
}

export async function updateHighlight(
    id: number,
    payload: {
        food_package_id: string;
        our_menu_food_id: string;
        image: Blob | null;
        description_ind: string;
        description_eng: string;
    }
) {
    const formData = new FormData();
    formData.append("food_package_id", payload.food_package_id);
    formData.append("our_menu_food_id", payload.our_menu_food_id);
    if (payload.image) {
        formData.append("image", payload.image, "image.webp");
    }
    formData.append("description_ind", payload.description_ind);
    formData.append("description_eng", payload.description_eng);

    const res = await fetch(`/api/admin/food/highlight/${id}`, {
        method: "PUT",
        body: formData,
    });
    return await res.json();
}

export async function deleteHighlight(id: number) {
    const res = await fetch(`/api/admin/food/highlight/${id}`, {
        method: "DELETE",
    });
    return await res.json();
}

export async function getMenuFoodByPackage(foodPackageId: number) {
    const res = await fetch(`/api/admin/food/highlight/menu-food/${foodPackageId}`);
    return await res.json();
}