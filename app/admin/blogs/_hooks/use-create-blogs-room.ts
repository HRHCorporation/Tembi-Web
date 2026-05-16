"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createBlog } from "../_services/blogs.service";

interface ErrorState {
    title_ind?: string;
    title_eng?: string;
    description_ind?: string;
    description_eng?: string;
    thumbnail?: string;
}

export function useCreateBlog() {
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

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ErrorState>({});

    // ✅ Generate slug from title_eng
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

        if (!croppedBlob) {
            newErrors.thumbnail = "Thumbnail wajib diupload dan dicrop";
            hasError = true;
        }

        setErrors(newErrors);
        return !hasError;
    }

    function resetForm() {
        setTitleInd("");
        setTitleEng("");
        setDescriptionInd("");
        setDescriptionEng("");
        setSlug("");
        setThumbnailFile(null);
        setThumbnailPreview("");
        setCroppedBlob(null);
        setErrors({});
    }

    async function handleSubmit() {
        setErrors({});

        const isValid = validate();
        if (!isValid) return;

        try {
            setLoading(true);

            const result = await createBlog({
                title_ind,
                title_eng,
                description_ind,
                description_eng,
                slug,
                thumbnail: croppedBlob!,
            });

            if (result.success) {
                toast.success("Blog berhasil ditambahkan");
                resetForm();

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
        loading,
        errors,
        setTitleInd,
        handleTitleEngChange,
        setDescriptionInd,
        setDescriptionEng,
        setThumbnailFile,
        setThumbnailPreview,
        setCroppedBlob,
        handleSubmit,
    };
}