"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createCelebrate } from "../_services/celebrate.service";

interface CelebrateMomentList {
    name_ind: string;
    name_eng: string;
}

interface ErrorState {
    name_ind?: string;
    name_eng?: string;
    description_ind?: string;
    description_eng?: string;
    image?: string;
    celebrate_moment_list?: string;
}

export function useCreateCelebrate() {
    const router = useRouter();

    // ✅ Main fields
    const [name_ind, setNameInd] = useState("");
    const [name_eng, setNameEng] = useState("");
    const [description_ind, setDescriptionInd] = useState("");
    const [description_eng, setDescriptionEng] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);

    // ✅ celebrate_moment_list (tags)
    const [celebrateMomentList, setCelebrateMomentList] = useState<CelebrateMomentList[]>([]);

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ErrorState>({});

    function validate(): boolean {
        const newErrors: ErrorState = {};
        let hasError = false;

        if (!name_ind?.trim()) {
            newErrors.name_ind = "Nama (Indonesia) wajib diisi";
            hasError = true;
        }

        if (!name_eng?.trim()) {
            newErrors.name_eng = "Nama (English) wajib diisi";
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

        if (!croppedBlob) {
            newErrors.image = "Image wajib diupload dan dicrop";
            hasError = true;
        }

        if (celebrateMomentList.length === 0) {
            newErrors.celebrate_moment_list = "Minimal 1 item wajib ditambahkan";
            hasError = true;
        }

        setErrors(newErrors);
        return !hasError;
    }

    function resetForm() {
        setNameInd("");
        setNameEng("");
        setDescriptionInd("");
        setDescriptionEng("");
        setImageFile(null);
        setImagePreview("");
        setCroppedBlob(null);
        setCelebrateMomentList([]);
        setErrors({});
    }

    async function handleSubmit() {
        setErrors({});

        const isValid = validate();
        if (!isValid) return;

        try {
            setLoading(true);

            const result = await createCelebrate({
                name_ind,
                name_eng,
                description_ind,
                description_eng,
                image: croppedBlob!,
                celebrate_moment_list: celebrateMomentList,
            });

            if (result.success) {
                toast.success("Celebrate moment berhasil ditambahkan");
                resetForm();

                setTimeout(() => {
                    router.push("/admin/celebrate");
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
        name_ind,
        name_eng,
        description_ind,
        description_eng,
        imageFile,
        imagePreview,
        croppedBlob,
        celebrateMomentList,
        loading,
        errors,
        setErrors,
        setNameInd,
        setNameEng,
        setDescriptionInd,
        setDescriptionEng,
        setImageFile,
        setImagePreview,
        setCroppedBlob,
        setCelebrateMomentList,
        handleSubmit,
    };
}