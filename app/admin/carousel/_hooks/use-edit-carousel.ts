"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getCarouselById, updateCarousel } from "../_services/carousel.service";

export function useEditCarousel(id: string) {

    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [image, setImage] = useState<string | null>(null);
    const [previewImage, setPreviewImage] = useState("");
    const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);
    const [titleInd, setTitleInd] = useState("");
    const [titleEng, setTitleEng] = useState("");
    const [isActive, setIsActive] = useState("1");
    const [errors, setErrors] = useState({
        title_ind: "",
        title_eng: "",
    });


    /* =====================================
       FETCH DETAIL
    ===================================== */
    async function fetchDetail() {
        try {
            setFetchLoading(true);

            const result = await getCarouselById(id);

            if (result.success) {
                const data = result.data;
                setTitleInd(data.title_ind);
                setTitleEng(data.title_eng);
                setIsActive(String(data.is_active));
                setPreviewImage(data.image);
            } else {
                toast.error("Data tidak ditemukan");
                router.push("/admin/carousel");
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


    /* =====================================
       SUBMIT
    ===================================== */
    async function handleSubmit() {
        setErrors({ title_ind: "", title_eng: "" });

        let hasError = false;
        const newErrors = { title_ind: "", title_eng: "" };

        if (!titleInd) {
            newErrors.title_ind = "Title Indonesia wajib diisi";
            hasError = true;
        }

        if (!titleEng) {
            newErrors.title_eng = "Title English wajib diisi";
            hasError = true;
        }

        setErrors(newErrors);
        if (hasError) return;

        try {
            setLoading(true);

            const result = await updateCarousel(id, {
                title_ind: titleInd,
                title_eng: titleEng,
                is_active: isActive,
                image: croppedBlob,
            });

            if (result.success) {
                toast.success("Carousel berhasil diupdate");
                setTimeout(() => router.push("/admin/carousel"), 1000);
            } else {
                toast.error(result.message || "Gagal update data");
            }

        } catch (error) {
            toast.error("Terjadi kesalahan server");
        } finally {
            setLoading(false);
        }
    }


    return {
        // state
        loading,
        fetchLoading,
        image,
        previewImage,
        croppedBlob,
        titleInd,
        titleEng,
        isActive,
        errors,
        // setter
        setImage,
        setCroppedBlob,
        setTitleInd,
        setTitleEng,
        setIsActive,
        // handler
        handleSubmit,
    };
}