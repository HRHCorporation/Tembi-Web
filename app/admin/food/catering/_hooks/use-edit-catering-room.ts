"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getCateringById, updateCatering } from "../_services/catering.service";

interface FoodPackagePrimary {
    id?: number;
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
    subtitle_menu_ind?: string;
    subtitle_menu_eng?: string;
    description_menu_ind?: string;
    description_menu_eng?: string;
    description_card_ind?: string;
    description_card_eng?: string;
    food_packages_primary?: string;
    image?: string;
    description_menu_highlight_ind?: string;
    description_menu_highlight_eng?: string;
}

export function useEditCateringRoom(id: string) {
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
    const [subtitle_menu_ind, setSubtitleMenuInd] = useState("");
    const [subtitle_menu_eng, setSubtitleMenuEng] = useState("");
    const [description_menu_ind, setDescriptionMenuInd] = useState("");
    const [description_menu_eng, setDescriptionMenuEng] = useState("");
    const [description_card_ind, setDescriptionCardInd] = useState("");
    const [description_card_eng, setDescriptionCardEng] = useState("");
    const [description_menu_highlight_ind, setDescriptionMenuHighlightInd] = useState("");
    const [description_menu_highlight_eng, setDescriptionMenuHighlightEng] = useState("");

    // ✅ Food packages primary (tags)
    const [foodPackagesPrimary, setFoodPackagesPrimary] = useState<FoodPackagePrimary[]>([]);
    const [deletedPrimaryIds, setDeletedPrimaryIds] = useState<number[]>([]);

    // ✅ Image
    const [image, setImage] = useState<string | null>(null);
    const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);
    const [existingImage, setExistingImage] = useState<string | null>(null);

    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [errors, setErrors] = useState<ErrorState>({});

    /* =====================================
        FETCH DETAIL
    ===================================== */
    async function fetchDetail() {
        try {
            setFetchLoading(true);
            const result = await getCateringById(Number(id));
            if (result.success) {
                const data = result.data as Record<string, unknown>;
                setTypeCateringServiceId(String(data.type_catering_service_id) || "");
                setNameInd((data.name_ind as string) || "");
                setNameEng((data.name_eng as string) || "");
                setDescriptionInd((data.description_ind as string) || "");
                setDescriptionEng((data.description_eng as string) || "");
                setMinimumPax((data.minimum_pax as number) || null);
                setHoursServiceMin((data.hours_service_min as number) || null);
                setHoursServiceMax((data.hours_service_max as number) || null);
                setTitleMenuInd((data.title_menu_ind as string) || "");
                setTitleMenuEng((data.title_menu_eng as string) || "");
                setSubtitleMenuInd((data.subtitle_menu_ind as string) || "");
                setSubtitleMenuEng((data.subtitle_menu_eng as string) || "");
                setDescriptionMenuInd((data.description_menu_ind as string) || "");
                setDescriptionMenuEng((data.description_menu_eng as string) || "");
                setDescriptionCardInd((data.description_card_ind as string) || "");
                setDescriptionCardEng((data.description_card_eng as string) || "");
                setDescriptionMenuHighlightInd((data.description_menu_highlight_ind as string) || "");
                setDescriptionMenuHighlightEng((data.description_menu_highlight_eng as string) || "");
                // ✅ Set food packages primary
                const primaryData = data.food_packages_primary as FoodPackagePrimary[] || [];
                setFoodPackagesPrimary(primaryData);

                // ✅ Set existing image
                const imageUrl = data.image as string;
                if (imageUrl) {
                    setExistingImage(imageUrl);
                }
            } else {
                toast.error("Data tidak ditemukan");
                router.push("/admin/food/catering");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Gagal mengambil data");
        } finally {
            setFetchLoading(false);
        }
    }

    useEffect(() => {
        if (id) fetchDetail();
    }, [id]);

    /* =====================================
        VALIDATION
    ===================================== */
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

        if (!subtitle_menu_ind?.trim()) {
            newErrors.subtitle_menu_ind = "Subtitle menu (Indonesia) wajib diisi";
            hasError = true;
        }

        if (!subtitle_menu_eng?.trim()) {
            newErrors.subtitle_menu_eng = "Subtitle menu (English) wajib diisi";
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

        if (!description_menu_highlight_ind?.trim()) {
            newErrors.description_menu_highlight_ind = "Description menu highlight (Indonesia) wajib diisi";
            hasError = true;
        }


        if (!description_menu_highlight_eng?.trim()) {
            newErrors.description_menu_highlight_eng = "Description menu highlight (English) wajib diisi";
            hasError = true;
        }

        setErrors(newErrors);
        return !hasError;
    }

    /* =====================================
        HANDLE DELETE PRIMARY
    ===================================== */
    function handleDeletePrimary(index: number) {
        const primary = foodPackagesPrimary[index];

        // Track deleted ID if existing
        if (primary.id) {
            setDeletedPrimaryIds([...deletedPrimaryIds, primary.id]);
        }

        // Remove dari array
        setFoodPackagesPrimary(foodPackagesPrimary.filter((_, i) => i !== index));
    }

    /* =====================================
        SUBMIT
    ===================================== */
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
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

            const result = await updateCatering(Number(id), {
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
                subtitle_menu_ind,
                subtitle_menu_eng,
                description_menu_ind,
                description_menu_eng,
                description_card_ind,
                description_card_eng,
                slug,
                food_packages_primary: foodPackagesPrimary,
                deleted_primary_ids: deletedPrimaryIds,
                image: croppedBlob,
                description_menu_highlight_ind,
                description_menu_highlight_eng
            });

            if (result.success) {
                toast.success("Food package berhasil diperbarui");

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
        subtitle_menu_ind,
        subtitle_menu_eng,
        description_menu_ind,
        description_menu_eng,
        description_card_ind,
        description_card_eng,
        foodPackagesPrimary,
        image,
        existingImage,
        loading,
        fetchLoading,
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
        setSubtitleMenuInd,
        setSubtitleMenuEng,
        setDescriptionMenuInd,
        setDescriptionMenuEng,
        setDescriptionCardInd,
        setDescriptionCardEng,
        setFoodPackagesPrimary,
        setImage,
        setCroppedBlob,
        handleSubmit,
        handleDeletePrimary,
        description_menu_highlight_ind,
        description_menu_highlight_eng,
        setDescriptionMenuHighlightInd,
        setDescriptionMenuHighlightEng
    };
}