export async function createMenu(payload: {
    food_package_id: string;
    name_ind: string;
    name_eng: string;
    subname_ind: string;
    subname_eng: string;
    icon: string;
    our_menu_food: Array<{ name_ind: string; name_eng: string }>;
}) {
    const formData = new FormData();
    formData.append("food_package_id", payload.food_package_id);
    formData.append("name_ind", payload.name_ind);
    formData.append("name_eng", payload.name_eng);
    formData.append("subname_ind", payload.subname_ind);
    formData.append("subname_eng", payload.subname_eng);
    formData.append("icon", payload.icon);
    formData.append("our_menu_food", JSON.stringify(payload.our_menu_food));

    const res = await fetch("/api/admin/food/menu", {
        method: "POST",
        body: formData,
    });
    return await res.json();
}

export async function getMenuById(id: number) {
    const res = await fetch(`/api/admin/food/menu/${id}`);
    return await res.json();
}

export async function updateMenu(
    id: number,
    payload: {
        food_package_id: string;
        name_ind: string;
        name_eng: string;
        subname_ind: string;
        subname_eng: string;
        icon: string;
        our_menu_food: Array<{ name_ind: string; name_eng: string; id?: number }>;
        deleted_food_ids: number[];
    }
) {
    const formData = new FormData();
    formData.append("food_package_id", payload.food_package_id);
    formData.append("name_ind", payload.name_ind);
    formData.append("name_eng", payload.name_eng);
    formData.append("subname_ind", payload.subname_ind);
    formData.append("subname_eng", payload.subname_eng);
    formData.append("icon", payload.icon);
    formData.append("our_menu_food", JSON.stringify(payload.our_menu_food));
    formData.append("deleted_food_ids", JSON.stringify(payload.deleted_food_ids));

    const res = await fetch(`/api/admin/food/menu/${id}`, {
        method: "PUT",
        body: formData,
    });
    return await res.json();
}

export async function deleteMenu(id: number) {
    const res = await fetch(`/api/admin/food/menu/${id}`, {
        method: "DELETE",
    });
    return await res.json();
}