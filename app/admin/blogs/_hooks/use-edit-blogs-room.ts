"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getBlogById, updateBlog } from "../_services/blogs.service";

interface ErrorState {
    title_ind?: string;
    title_eng?: string;
    description_ind?: string;
    description_eng?: string;
    thumbnail?: string;
}

export function useEditBlog(id: string) {
    const router = useRouter();

    // ✅ Main fields
    const [title_ind, setTitleInd] = useState("");
    const [title_eng, setTitleEng] = useState("");
    const [description_ind, setDescriptionInd] = useState("");
    const [description_eng, setDescriptionEng] = useState("");
    const [slug, setSlug] = useState("");

    // ✅ Thumbnail
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
    const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);
    const [existingThumbnail, setExistingThumbnail] = useState<string>("");

    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [errors, setErrors] = useState<ErrorState>({});

    /* =====================================
        FETCH DETAIL
    ===================================== */
    async function fetchDetail() {
        try {
            setFetchLoading(true);
            const result = await getBlogById(Number(id));
            if (result.success) {
                const data = result.data as Record<string, unknown>;
                setTitleInd((data.title_ind as string) || "");
                setTitleEng((data.title_eng as string) || "");
                setDescriptionInd((data.description_ind as string) || "");
                setDescriptionEng((data.description_eng as string) || "");
                setSlug((data.slug as string) || "");
                setExistingThumbnail((data.thumbnail as string) || "");
            } else {
                toast.error("Data tidak ditemukan");
                router.push("/admin/blogs");
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
        GENERATE SLUG FROM TITLE_ENG
    ===================================== */
    const handleTitleEngChange = (value: string) => {
        setTitleEng(value);
        const generatedSlug = value
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "")
            .replace(/-+/g, "-")
            .replace(/^-+|-+$/g, "");
        setSlug(generatedSlug);
    };

    /* =====================================
        VALIDATION
    ===================================== */
    function validate(): boolean {
        const newErrors: ErrorState = {};
        let hasError = false;

        if (!title_ind?.trim()) {
            newErrors.title_ind = "Judul Indonesia wajib diisi";
            hasError = true;
        }

        if (!title_eng?.trim()) {
            newErrors.title_eng = "Judul English wajib diisi";
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

        if (!croppedBlob && !existingThumbnail) {
            newErrors.thumbnail = "Thumbnail wajib diupload atau sudah ada yang tersimpan";
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

            const result = await updateBlog(Number(id), {
                title_ind,
                title_eng,
                description_ind,
                description_eng,
                slug,
                thumbnail: croppedBlob,
            });

            if (result.success) {
                toast.success("Blog berhasil diperbarui");

                setTimeout(() => {
                    router.push("/admin/blogs");
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
        title_ind,
        title_eng,
        description_ind,
        description_eng,
        slug,
        thumbnailFile,
        thumbnailPreview,
        croppedBlob,
        existingThumbnail,
        loading,
        fetchLoading,
        errors,
        setTitleInd,
        handleTitleEngChange,
        setDescriptionInd,
        setDescriptionEng,
        setThumbnailFile,
        setThumbnailPreview,
        setCroppedBlob,
        setExistingThumbnail,
        handleSubmit,
    };
}