"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getBannerById, updateBanner } from "../_services/banner.service";


interface ErrorState {
    title_ind?: string;
    title_eng?: string;
    description_ind?: string;
    description_eng?: string;
    subtitle_ind?: string;
    subtitle_eng?: string;
    image?: string;
}

export function useEditBannerRoom(id: string) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [title_ind, setTitle_ind] = useState("");
    const [title_eng, setTitle_eng] = useState("");
    const [description_ind, setDescriptionInd] = useState("");
    const [description_eng, setDescriptionEng] = useState("");
    const [subtitle_ind, setSubtitle_ind] = useState("");
    const [subtitle_eng, setSubtitle_eng] = useState("");

    const [image, setImage] = useState<string | null>(null);
    const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);
    const [existingImage, setExistingImage] = useState<string | null>(null);

    const [errors, setErrors] = useState<ErrorState>({});
    /* =====================================
         FETCH DETAIL
    ===================================== */
    async function fetchDetail() {
        try {
            setFetchLoading(true);
            const result = await getBannerById(Number(id));
            if (result.success) {
                const data = result.data;
                setTitle_ind(data.title_ind);
                setTitle_eng(data.title_eng);
                setDescriptionInd(data.description_ind);
                setDescriptionEng(data.description_eng);
                setSubtitle_ind(data.subtitle_ind ?? "");
                setSubtitle_eng(data.subtitle_eng ?? "");

                const imageUrl = data.image as string;
                if (imageUrl) {
                    setExistingImage(imageUrl);
                }
            } else {
                toast.error("Data tidak ditemukan");
                router.push("/admin/banner");
            }
        } catch (error) {
            toast.error("Gagal mengambil data");
        } finally {
            setFetchLoading(false);
        }
    }

    useEffect(() => {
        if (id) fetchDetail();
    }, [id]);

    function validate(): boolean {
        const newErrors: ErrorState = {};
        let hasError = false;


        if (!title_ind?.trim()) {
            newErrors.title_ind = "Title (Indonesia) wajib diisi";
            hasError = true;
        }

        if (!title_eng?.trim()) {
            newErrors.title_eng = "Title (English) wajib diisi";
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

            const result = await updateBanner(Number(id), {
                title_ind,
                title_eng,
                description_ind,
                description_eng,
                subtitle_ind,
                subtitle_eng,
                image: croppedBlob
            });

            if (result.success) {
                toast.success("Banner berhasil diperbarui");
                setTimeout(() => {
                    router.push("/admin/banner");
                }, 1000);
            } else {
                toast.error(result.message || "Gagal memperbarui fasilitas");
            }
        } catch (error) {
            toast.error("Gagal memperbarui fasilitas");
        }
        finally {
            setLoading(false);
        }
    }

    return {
        title_ind,
        setTitle_ind,
        title_eng,
        setTitle_eng,
        description_ind,
        setDescriptionInd,
        description_eng,
        setDescriptionEng,
        subtitle_ind,
        setSubtitle_ind,
        subtitle_eng,
        setSubtitle_eng,
        image,
        setImage,
        existingImage,
        setExistingImage,
        croppedBlob,
        setCroppedBlob,
        loading,
        errors,
        setErrors,
        handleSubmit,
        fetchLoading,
    };
}
