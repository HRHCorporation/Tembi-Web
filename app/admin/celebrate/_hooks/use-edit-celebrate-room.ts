"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getCelebrateById, updateCelebrate } from "../_services/celebrate.service";

interface CelebrateMomentListItem {
    id?: number;
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

export function useEditCelebrate(id: string) {
    const router = useRouter();

    // ✅ Main fields
    const [name_ind, setNameInd] = useState("");
    const [name_eng, setNameEng] = useState("");
    const [description_ind, setDescriptionInd] = useState("");
    const [description_eng, setDescriptionEng] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);
    const [existingImage, setExistingImage] = useState<string>("");

    // ✅ celebrate_moment_list (tags)
    const [celebrateMomentList, setCelebrateMomentList] = useState<CelebrateMomentListItem[]>([]);
    const [deletedListIds, setDeletedListIds] = useState<number[]>([]);

    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [errors, setErrors] = useState<ErrorState>({});

    /* =====================================
        FETCH DETAIL
    ===================================== */
    async function fetchDetail() {
        try {
            setFetchLoading(true);
            const result = await getCelebrateById(Number(id));
            if (result.success) {
                const data = result.data as Record<string, unknown>;
                setNameInd((data.name_ind as string) || "");
                setNameEng((data.name_eng as string) || "");
                setDescriptionInd((data.description_ind as string) || "");
                setDescriptionEng((data.description_eng as string) || "");
                setExistingImage((data.image as string) || "");

                // ✅ Set celebrate_moment_list
                const listData = data.celebrate_moment_list as CelebrateMomentListItem[] || [];
                setCelebrateMomentList(listData);
            } else {
                toast.error("Data tidak ditemukan");
                router.push("/admin/celebrate");
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

        if (!croppedBlob && !existingImage) {
            newErrors.image = "Image wajib diupload atau sudah ada yang tersimpan";
            hasError = true;
        }

        if (celebrateMomentList.length === 0) {
            newErrors.celebrate_moment_list = "Minimal 1 item wajib ditambahkan";
            hasError = true;
        }

        setErrors(newErrors);
        return !hasError;
    }

    /* =====================================
        HANDLE DELETE LIST
    ===================================== */
    function handleDeleteList(index: number) {
        const item = celebrateMomentList[index];

        // Track deleted ID if existing
        if (item.id) {
            setDeletedListIds([...deletedListIds, item.id]);
        }

        // Remove dari array
        setCelebrateMomentList(celebrateMomentList.filter((_, i) => i !== index));
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

            const result = await updateCelebrate(Number(id), {
                name_ind,
                name_eng,
                description_ind,
                description_eng,
                image: croppedBlob,
                celebrate_moment_list: celebrateMomentList,
                deleted_list_ids: deletedListIds,
            });

            if (result.success) {
                toast.success("Celebrate moment berhasil diperbarui");

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
        existingImage,
        celebrateMomentList,
        loading,
        fetchLoading,
        errors,
        setNameInd,
        setNameEng,
        setDescriptionInd,
        setDescriptionEng,
        setImageFile,
        setImagePreview,
        setCroppedBlob,
        setExistingImage,
        setCelebrateMomentList,
        handleSubmit,
        handleDeleteList,
    };
}