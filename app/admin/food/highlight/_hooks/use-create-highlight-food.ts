"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createHighlight } from "../_services/highlight.service";

interface ErrorState {
    food_package_id?: string;
    our_menu_food_id?: string;
    image?: string;
    description_ind?: string;
    description_eng?: string;
}

export function useCreateHighlight() {
    const router = useRouter();

    // ✅ Main fields
    const [food_package_id, setFoodPackageId] = useState("");
    const [our_menu_food_id, setOurMenuFoodId] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);
    const [description_ind, setDescriptionInd] = useState("");
    const [description_eng, setDescriptionEng] = useState("");

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ErrorState>({});

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

        if (!croppedBlob) {
            newErrors.image = "Image wajib diupload dan dicrop";
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

    function resetForm() {
        setFoodPackageId("");
        setOurMenuFoodId("");
        setImageFile(null);
        setImagePreview("");
        setCroppedBlob(null);
        setDescriptionInd("");
        setDescriptionEng("");
        setErrors({});
    }

    async function handleSubmit() {
        setErrors({});

        const isValid = validate();
        if (!isValid) return;

        try {
            setLoading(true);

            const result = await createHighlight({
                food_package_id,
                our_menu_food_id,
                image: croppedBlob!,
                description_ind,
                description_eng,
            });

            if (result.success) {
                toast.success("Highlight berhasil ditambahkan");
                resetForm();

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
        description_ind,
        description_eng,
        loading,
        errors,
        setFoodPackageId,
        setOurMenuFoodId,
        setImageFile,
        setImagePreview,
        setCroppedBlob,
        setDescriptionInd,
        setDescriptionEng,
        handleSubmit,
    };
}