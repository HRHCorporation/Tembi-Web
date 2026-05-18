"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createCollection } from "../_services/collection.service";

interface ErrorState {
    mstr_collection_id?: string;
    name_ind?: string;
    name_eng?: string;
    description_ind?: string;
    description_eng?: string;
    image?: string;
}

export function useCreateCollection() {
    const router = useRouter();

    // ✅ Main fields
    const [mstr_collection_id, setMstrCollectionId] = useState("");
    const [name_ind, setNameInd] = useState("");
    const [name_eng, setNameEng] = useState("");
    const [description_ind, setDescriptionInd] = useState("");
    const [description_eng, setDescriptionEng] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ErrorState>({});

    function validate(): boolean {
        const newErrors: ErrorState = {};
        let hasError = false;

        if (!mstr_collection_id) {
            newErrors.mstr_collection_id = "Collection wajib dipilih";
            hasError = true;
        }

        if (!name_ind?.trim()) {
            newErrors.name_ind = "Nama Indonesia wajib diisi";
            hasError = true;
        }

        if (!name_eng?.trim()) {
            newErrors.name_eng = "Nama English wajib diisi";
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

        setErrors(newErrors);
        return !hasError;
    }

    function resetForm() {
        setMstrCollectionId("");
        setNameInd("");
        setNameEng("");
        setDescriptionInd("");
        setDescriptionEng("");
        setImageFile(null);
        setImagePreview("");
        setCroppedBlob(null);
        setErrors({});
    }

    async function handleSubmit() {
        setErrors({});

        const isValid = validate();
        if (!isValid) return;

        try {
            setLoading(true);

            const result = await createCollection({
                mstr_collection_id,
                name_ind,
                name_eng,
                description_ind,
                description_eng,
                image: croppedBlob!,
            });

            if (result.success) {
                toast.success("Collection berhasil ditambahkan");
                resetForm();

                setTimeout(() => {
                    router.push("/admin/collections/main");
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
        mstr_collection_id,
        name_ind,
        name_eng,
        description_ind,
        description_eng,
        imageFile,
        imagePreview,
        croppedBlob,
        loading,
        errors,
        setMstrCollectionId,
        setNameInd,
        setNameEng,
        setDescriptionInd,
        setDescriptionEng,
        setImageFile,
        setImagePreview,
        setCroppedBlob,
        handleSubmit,
    };
}