"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createCatering } from "../_services/catering.service";

interface FoodPackagePrimary {
    name_ind: string;
    name_eng: string;
}

interface ErrorState {
    type_catering_service_id?: string;
    name_ind?: string;
    name_eng?: string;
    description_ind?: string;
    description_eng?: string;
    minimum_pax?: string;
    hours_service_min?: string;
    hours_service_max?: string;
    title_menu_ind?: string;
    title_menu_eng?: string;
    description_menu_ind?: string;
    description_menu_eng?: string;
    description_card_ind?: string;
    description_card_eng?: string;
    food_packages_primary?: string;
    subtitle_menu_ind?: string;
    subtitle_menu_eng?: string;
    image?: string;
    croppedBlob?: Blob | null;
}

export function useCreateCatering() {
    const router = useRouter();

    // ✅ Main fields
    const [type_catering_service_id, setTypeCateringServiceId] = useState("");
    const [name_ind, setNameInd] = useState("");
    const [name_eng, setNameEng] = useState("");
    const [description_ind, setDescriptionInd] = useState("");
    const [description_eng, setDescriptionEng] = useState("");
    const [minimum_pax, setMinimumPax] = useState<number | null>(null);
    const [hours_service_min, setHoursServiceMin] = useState<number | null>(null);
    const [hours_service_max, setHoursServiceMax] = useState<number | null>(null);
    const [title_menu_ind, setTitleMenuInd] = useState("");
    const [title_menu_eng, setTitleMenuEng] = useState("");
    const [description_menu_ind, setDescriptionMenuInd] = useState("");
    const [description_menu_eng, setDescriptionMenuEng] = useState("");
    const [description_card_ind, setDescriptionCardInd] = useState("");
    const [description_card_eng, setDescriptionCardEng] = useState("");
    const [subtitle_menu_ind, setSubtitleMenuInd] = useState("");
    const [subtitle_menu_eng, setSubtitleMenuEng] = useState("");

    // ✅ Food packages primary (tags)
    const [foodPackagesPrimary, setFoodPackagesPrimary] = useState<FoodPackagePrimary[]>([]);

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ErrorState>({});

    const [image, setImage] =
        useState<string | null>(null);

    const [croppedBlob, setCroppedBlob] =
        useState<Blob | null>(null);

    function validate(): boolean {
        const newErrors: ErrorState = {};
        let hasError = false;

        if (!type_catering_service_id) {
            newErrors.type_catering_service_id = "Jenis catering wajib dipilih";
            hasError = true;
        }

        if (!name_ind?.trim()) {
            newErrors.name_ind = "Nama food package (Indonesia) wajib diisi";
            hasError = true;
        }

        if (!name_eng?.trim()) {
            newErrors.name_eng = "Nama food package (English) wajib diisi";
            hasError = true;
        }

        if (!description_ind?.trim()) {
            newErrors.description_ind = "Deskripsi (Indonesia) wajib diisi";
            hasError = true;
        }

        if (!description_eng?.trim()) {
            newErrors.description_eng = "Deskripsi (English) wajib diisi";
            hasError = true;
        }

        if (minimum_pax === null || minimum_pax < 1) {
            newErrors.minimum_pax = "Minimum pax wajib diisi dan minimal 1";
            hasError = true;
        }

        if (hours_service_min === null || hours_service_min < 0) {
            newErrors.hours_service_min = "Hours service min wajib diisi";
            hasError = true;
        }

        if (hours_service_max === null || hours_service_max < hours_service_min!) {
            newErrors.hours_service_max = "Hours service max harus lebih besar dari min";
            hasError = true;
        }

        if (!title_menu_ind?.trim()) {
            newErrors.title_menu_ind = "Title menu (Indonesia) wajib diisi";
            hasError = true;
        }

        if (!title_menu_eng?.trim()) {
            newErrors.title_menu_eng = "Title menu (English) wajib diisi";
            hasError = true;
        }

        if (!description_menu_ind?.trim()) {
            newErrors.description_menu_ind = "Description menu (Indonesia) wajib diisi";
            hasError = true;
        }

        if (!description_menu_eng?.trim()) {
            newErrors.description_menu_eng = "Description menu (English) wajib diisi";
            hasError = true;
        }

        if (!description_card_ind?.trim()) {
            newErrors.description_card_ind = "Description card (Indonesia) wajib diisi";
            hasError = true;
        }

        if (!description_card_eng?.trim()) {
            newErrors.description_card_eng = "Description card (English) wajib diisi";
            hasError = true;
        }

        if (foodPackagesPrimary.length === 0) {
            newErrors.food_packages_primary = "Minimal 1 food package primary wajib ditambahkan";
            hasError = true;
        }

        if (!subtitle_menu_ind?.trim()) {
            newErrors.subtitle_menu_ind = "Subtitle menu (Indonesia) wajib diisi";
            hasError = true;
        }
        if (!subtitle_menu_eng?.trim()) {
            newErrors.subtitle_menu_eng = "Subtitle menu (English) wajib diisi";
            hasError = true;
        }
        
        if (!croppedBlob) {
            newErrors.image = "Image wajib diisi";
            hasError = true;
        }

        setErrors(newErrors);
        return !hasError;
    }

    function resetForm() {
        setTypeCateringServiceId("");
        setNameInd("");
        setNameEng("");
        setDescriptionInd("");
        setDescriptionEng("");
        setMinimumPax(null);
        setHoursServiceMin(null);
        setHoursServiceMax(null);
        setTitleMenuInd("");
        setTitleMenuEng("");
        setDescriptionMenuInd("");
        setDescriptionMenuEng("");
        setDescriptionCardInd("");
        setDescriptionCardEng("");
        setSubtitleMenuInd("");
        setSubtitleMenuEng("");
        setFoodPackagesPrimary([]);
        setErrors({});
        setImage(null);
        setCroppedBlob(null);
    }

    async function handleSubmit() {
        setErrors({});

        const isValid = validate();
        if (!isValid) return;

        try {
            setLoading(true);

            // ✅ Generate slug dari name_eng
            const slug = name_eng
                .toLowerCase()
                .trim()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]/g, "")
                .replace(/-+/g, "-")
                .replace(/^-+|-+$/g, "");

            const result = await createCatering({
                type_catering_service_id,
                name_ind,
                name_eng,
                description_ind,
                description_eng,
                minimum_pax: String(minimum_pax),
                hours_service_min: String(hours_service_min),
                hours_service_max: String(hours_service_max),
                title_menu_ind,
                title_menu_eng,
                description_menu_ind,
                description_menu_eng,
                description_card_ind,
                description_card_eng,
                slug,
                food_packages_primary: foodPackagesPrimary,
                subtitle_menu_ind,
                subtitle_menu_eng,
                image: croppedBlob!,
            });

            if (result.success) {
                toast.success("Food package berhasil ditambahkan");
                resetForm();

                setTimeout(() => {
                    router.push("/admin/food/catering");
                }, 1000);
            } else {
                toast.error(result.message || "Gagal menyimpan data");
                if (result.errors) {
                    setErrors(result.errors);
                }
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Terjadi kesalahan server");
        } finally {
            setLoading(false);
        }
    }

    return {
        type_catering_service_id,
        name_ind,
        name_eng,
        description_ind,
        description_eng,
        minimum_pax,
        hours_service_min,
        hours_service_max,
        title_menu_ind,
        title_menu_eng,
        description_menu_ind,
        description_menu_eng,
        description_card_ind,
        description_card_eng,
        subtitle_menu_ind,
        subtitle_menu_eng,
        foodPackagesPrimary,
        loading,
        errors,
        setTypeCateringServiceId,
        setNameInd,
        setNameEng,
        setDescriptionInd,
        setDescriptionEng,
        setMinimumPax,
        setHoursServiceMin,
        setHoursServiceMax,
        setTitleMenuInd,
        setTitleMenuEng,
        setDescriptionMenuInd,
        setDescriptionMenuEng,
        setDescriptionCardInd,
        setDescriptionCardEng,
        setFoodPackagesPrimary,
        setSubtitleMenuInd,
        setSubtitleMenuEng,
        image,
        setImage,
        setCroppedBlob,
        handleSubmit,
    };
}