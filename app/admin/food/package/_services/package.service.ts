export async function createPackage(payload: {
    food_package_id: string;
    name_ind: string;
    name_eng: string;
    description_ind: string;
    description_eng: string;
    icon: string;
    minimum_guest: string;
    is_popular: boolean;
    color: string;
    package_include: Array<{ name_ind: string; name_eng: string }>;
}) {
    const formData = new FormData();
    formData.append("food_package_id", payload.food_package_id);
    formData.append("name_ind", payload.name_ind);
    formData.append("name_eng", payload.name_eng);
    formData.append("description_ind", payload.description_ind);
    formData.append("description_eng", payload.description_eng);
    formData.append("icon", payload.icon);
    formData.append("minimum_guest", payload.minimum_guest);
    formData.append("is_popular", payload.is_popular ? "1" : "0");
    formData.append("color", payload.color);
    formData.append("package_include", JSON.stringify(payload.package_include));

    const res = await fetch("/api/admin/food/package", {
        method: "POST",
        body: formData,
    });
    return await res.json();
}

export async function getPackageById(id: number) {
    const res = await fetch(`/api/admin/food/package/${id}`);
    return await res.json();
}

export async function updatePackage(
    id: number,
    payload: {
        food_package_id: string;
        name_ind: string;
        name_eng: string;
        description_ind: string;
        description_eng: string;
        icon: string;
        minimum_guest: string;
        is_popular: boolean;
        color: string;
        package_include: Array<{ name_ind: string; name_eng: string; id?: number }>;
        deleted_include_ids: number[];
    }
) {
    const formData = new FormData();
    formData.append("food_package_id", payload.food_package_id);
    formData.append("name_ind", payload.name_ind);
    formData.append("name_eng", payload.name_eng);
    formData.append("description_ind", payload.description_ind);
    formData.append("description_eng", payload.description_eng);
    formData.append("icon", payload.icon);
    formData.append("minimum_guest", payload.minimum_guest);
    formData.append("is_popular", payload.is_popular ? "1" : "0");
    formData.append("color", payload.color);
    formData.append("package_include", JSON.stringify(payload.package_include));
    formData.append("deleted_include_ids", JSON.stringify(payload.deleted_include_ids));

    const res = await fetch(`/api/admin/food/package/${id}`, {
        method: "PUT",
        body: formData,
    });
    return await res.json();
}

export async function deletePackage(id: number) {
    const res = await fetch(`/api/admin/food/package/${id}`, {
        method: "DELETE",
    });
    return await res.json();
}