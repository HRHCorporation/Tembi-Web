"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getHighlightById, updateHighlight } from "../_services/highlight.service";

interface ErrorState {
    food_package_id?: string;
    our_menu_food_id?: string;
    image?: string;
    description_ind?: string;
    description_eng?: string;
}

export function useEditHighlight(id: string) {
    const router = useRouter();

    // ✅ Main fields
    const [food_package_id, setFoodPackageId] = useState("");
    const [our_menu_food_id, setOurMenuFoodId] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);
    const [existingImage, setExistingImage] = useState<string>("");
    const [description_ind, setDescriptionInd] = useState("");
    const [description_eng, setDescriptionEng] = useState("");

    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [errors, setErrors] = useState<ErrorState>({});

    /* =====================================
        FETCH DETAIL
    ===================================== */
    async function fetchDetail() {
        try {
            setFetchLoading(true);
            const result = await getHighlightById(Number(id));
            if (result.success) {
                const data = result.data as Record<string, unknown>;
                setFoodPackageId(String(data.food_package_id) || "");
                setOurMenuFoodId(String(data.our_menu_food_id) || "");
                setExistingImage((data.image as string) || "");
                setDescriptionInd((data.description_ind as string) || "");
                setDescriptionEng((data.description_eng as string) || "");
            } else {
                toast.error("Data tidak ditemukan");
                router.push("/admin/food/highlight");
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

        if (!food_package_id) {
            newErrors.food_package_id = "Food package wajib dipilih";
            hasError = true;
        }

        if (!our_menu_food_id) {
            newErrors.our_menu_food_id = "Menu food wajib dipilih";
            hasError = true;
        }

        if (!croppedBlob && !existingImage) {
            newErrors.image = "Image wajib diupload atau sudah ada yang tersimpan";
            hasError = true;
        }

        if (!description_ind?.trim()) {
            newErrors.description_ind = "Deskripsi Indonesia wajib diisi";
            hasError = true;
        }

        if (!description_eng?.trim()) {
            newErrors.description_eng = "Deskripsi English wajib diisi";
            hasError = true;
        }

        setErrors(newErrors);
        return !hasError;
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

            const result = await updateHighlight(Number(id), {
                food_package_id,
                our_menu_food_id,
                image: croppedBlob,
                description_ind,
                description_eng,
            });

            if (result.success) {
                toast.success("Highlight berhasil diperbarui");

                setTimeout(() => {
                    router.push("/admin/food/highlight");
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
        food_package_id,
        our_menu_food_id,
        imageFile,
        imagePreview,
        croppedBlob,
        existingImage,
        description_ind,
        description_eng,
        loading,
        fetchLoading,
        errors,
        setErrors,
        setFoodPackageId,
        setOurMenuFoodId,
        setImageFile,
        setImagePreview,
        setCroppedBlob,
        setExistingImage,
        setDescriptionInd,
        setDescriptionEng,
        handleSubmit,
    };
}