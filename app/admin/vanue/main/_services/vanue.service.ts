interface VenueKey {
    id?: number;
    icon: string;
    label_ind: string;
    label_eng: string;
    value_ind: string;
    value_eng: string;
}

interface VenueService {
    id?: number;
    name_service_ind: string;
    name_service_eng: string;
    description_ind: string;
    description_eng: string;
}

interface VenueNote {
    id?: number;
    description_ind: string;
    description_eng: string;
}

interface ImageFile {
    file?: File;
    preview: string;
    is_banner: boolean;
    id?: number;
}

export async function createVenue(payload: {
    name_ind: string;
    name_eng: string;
    description_ind: string;
    description_eng: string;
    slug: string;
    selected_facilities: number[];
    images: ImageFile[];
    venue_keys: VenueKey[];
    venue_services: VenueService[];
    venue_notes: VenueNote[];
}) {
    const formData = new FormData();
    formData.append("name_ind", payload.name_ind);
    formData.append("name_eng", payload.name_eng);
    formData.append("description_ind", payload.description_ind);
    formData.append("description_eng", payload.description_eng);
    formData.append("slug", payload.slug);
    formData.append("selected_facilities", JSON.stringify(payload.selected_facilities));
    formData.append("venue_keys", JSON.stringify(payload.venue_keys));
    formData.append("venue_services", JSON.stringify(payload.venue_services));
    formData.append("venue_notes", JSON.stringify(payload.venue_notes));

    // ✅ Append image files
    payload.images.forEach((img, index) => {
        if (img.file) {
            formData.append(`image_${index}`, img.file, `image_${index}.webp`);
            formData.append(`image_${index}_is_banner`, img.is_banner ? "1" : "0");
        }
    });

    const res = await fetch("/api/admin/vanue/main", {
        method: "POST",
        body: formData,
    });
    return await res.json();
}

export async function getVenueById(id: number) {
    const res = await fetch(`/api/admin/vanue/main/${id}`);
    return await res.json();
}

export async function updateVenue(
    id: number,
    payload: {
        name_ind: string;
        name_eng: string;
        description_ind: string;
        description_eng: string;
        slug: string;
        selected_facilities: number[];
        images: ImageFile[];
        deleted_image_ids: number[];
        venue_keys: VenueKey[];
        deleted_key_ids: number[];
        venue_services: VenueService[];
        deleted_service_ids: number[];
        venue_notes: VenueNote[];
        deleted_note_ids: number[];
    }
) {
    const formData = new FormData();
    formData.append("name_ind", payload.name_ind);
    formData.append("name_eng", payload.name_eng);
    formData.append("description_ind", payload.description_ind);
    formData.append("description_eng", payload.description_eng);
    formData.append("slug", payload.slug);
    formData.append("selected_facilities", JSON.stringify(payload.selected_facilities));
    formData.append("deleted_image_ids", JSON.stringify(payload.deleted_image_ids));
    formData.append("venue_keys", JSON.stringify(payload.venue_keys));
    formData.append("deleted_key_ids", JSON.stringify(payload.deleted_key_ids));
    formData.append("venue_services", JSON.stringify(payload.venue_services));
    formData.append("deleted_service_ids", JSON.stringify(payload.deleted_service_ids));
    formData.append("venue_notes", JSON.stringify(payload.venue_notes));
    formData.append("deleted_note_ids", JSON.stringify(payload.deleted_note_ids));

    const existingImages = payload.images.filter(img => img.id && !img.file);
    const newImages = payload.images.filter(img => img.file);
    formData.append("existing_images", JSON.stringify(
        existingImages.map(img => ({
            id: img.id,
            is_banner: img.is_banner,
        }))
    ));
    // ✅ Append image files (only new files)
    newImages.forEach((img, index) => {
        formData.append(`image_${index}`, img.file!);
        formData.append(`image_${index}_is_banner`, img.is_banner ? "1" : "0");
    });

    const res = await fetch(`/api/admin/vanue/main/${id}`, {
        method: "PUT",
        body: formData,
    });
    return await res.json();
}

export async function deleteVenue(id: number) {
    const res = await fetch(`/api/admin/vanue/main/${id}`, {
        method: "DELETE",
    });
    return await res.json();
}

export async function getVenueFacilities() {
    const res = await fetch("/api/admin/vanue/facilities-list");
    return await res.json();
}