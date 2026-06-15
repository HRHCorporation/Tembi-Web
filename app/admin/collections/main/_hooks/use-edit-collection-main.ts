"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getCollectionById, updateCollection } from "../_services/collection.service";

interface ErrorState {
    mstr_collection_id?: string;
    name_ind?: string;
    name_eng?: string;
    description_ind?: string;
    description_eng?: string;
    image?: string;
}

export function useEditCollection(id: string) {
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
    const [existingImage, setExistingImage] = useState<string>("");

    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [errors, setErrors] = useState<ErrorState>({});

    /* =====================================
        FETCH DETAIL
    ===================================== */
    async function fetchDetail() {
        try {
            setFetchLoading(true);
            const result = await getCollectionById(Number(id));
            if (result.success) {
                const data = result.data as Record<string, unknown>;
                setMstrCollectionId(String(data.mstr_collection_id) || "");
                setNameInd((data.name_ind as string) || "");
                setNameEng((data.name_eng as string) || "");
                setDescriptionInd((data.description_ind as string) || "");
                setDescriptionEng((data.description_eng as string) || "");
                setExistingImage((data.image as string) || "");
            } else {
                toast.error("Data tidak ditemukan");
                router.push("/admin/collection");
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

        if (!croppedBlob && !existingImage) {
            newErrors.image = "Image wajib diupload atau sudah ada yang tersimpan";
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

            const result = await updateCollection(Number(id), {
                mstr_collection_id,
                name_ind,
                name_eng,
                description_ind,
                description_eng,
                image: croppedBlob,
            });

            if (result.success) {
                toast.success("Collection berhasil diperbarui");

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
        existingImage,
        loading,
        fetchLoading,
        errors,
        setErrors,
        setMstrCollectionId,
        setNameInd,
        setNameEng,
        setDescriptionInd,
        setDescriptionEng,
        setImageFile,
        setImagePreview,
        setCroppedBlob,
        setExistingImage,
        handleSubmit,
    };
}