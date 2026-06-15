"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createEvent } from "../_services/event.service";

interface ErrorState {
    title_ind?: string;
    title_eng?: string;
    description_ind?: string;
    description_eng?: string;
    thumbnail?: string;
    hosted_by?: string;
    date_event?: string;
    time_event?: string;
    location?: string;
}

export function useCreateEvent() {
    const router = useRouter();

    // ✅ Main fields
    const [title_ind, setTitleInd] = useState("");
    const [title_eng, setTitleEng] = useState("");
    const [description_ind, setDescriptionInd] = useState("");
    const [description_eng, setDescriptionEng] = useState("");
    const [slug, setSlug] = useState("");
    const [location, setLocation] = useState("");

    // ✅ Other fields
    const [hosted_by, setHostedBy] = useState("");
    const [date_event, setDateEvent] = useState("");
    const [time_event, setTimeEvent] = useState("");

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

        if (!hosted_by?.trim()) {
            newErrors.hosted_by = "Hosted by wajib diisi";
            hasError = true;
        }

        if (!date_event?.trim()) {
            newErrors.date_event = "Date event wajib diisi";
            hasError = true;
        }

        if (!time_event?.trim()) {
            newErrors.time_event = "Time event wajib diisi";
            hasError = true;
        }

        if (!croppedBlob) {
            newErrors.thumbnail = "Thumbnail wajib diupload dan dicrop";
            hasError = true;
        }

        if (!location?.trim()) {
            newErrors.location = "Location wajib diisi";
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
        setHostedBy("");
        setDateEvent("");
        setTimeEvent("");
        setLocation("");
    }

    async function handleSubmit() {
        setErrors({});

        const isValid = validate();
        if (!isValid) return;

        try {
            setLoading(true);

            const result = await createEvent({
                title_ind,
                title_eng,
                description_ind,
                description_eng,
                slug,
                thumbnail: croppedBlob!,
                hosted_by,
                date_event,
                time_event,
                location,
            });

            if (result.success) {
                toast.success("Event berhasil ditambahkan");
                resetForm();

                setTimeout(() => {
                    router.push("/admin/event");
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
        setErrors,
        setTitleInd,
        handleTitleEngChange,
        setDescriptionInd,
        setDescriptionEng,
        setThumbnailFile,
        setThumbnailPreview,
        setCroppedBlob,
        handleSubmit,
        hosted_by,
        setHostedBy,
        date_event,
        setDateEvent,
        time_event,
        setTimeEvent,
        location,
        setLocation
    };
}