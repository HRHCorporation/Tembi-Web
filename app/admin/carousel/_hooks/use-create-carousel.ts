"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createCarousel } from "../_services/carousel.service";

export function useCreateCarousel() {

    const router = useRouter();

    const [image, setImage] =
        useState<string | null>(null);

    const [croppedBlob, setCroppedBlob] =
        useState<Blob | null>(null);

    const [titleInd, setTitleInd] =
        useState("");

    const [titleEng, setTitleEng] =
        useState("");

    const [isActive, setIsActive] =
        useState("1");

    const [loading, setLoading] =
        useState(false);

    const [errors, setErrors] = useState({
        title_ind: "",
        title_eng: "",
        image: "",
    });


    /* =====================================
       VALIDATION
    ===================================== */
    function validate() {

        const newErrors = {
            title_ind: "",
            title_eng: "",
            image: "",
        };

        let hasError = false;

        if (!titleInd.trim()) {
            newErrors.title_ind = "Title Indonesia wajib diisi";
            hasError = true;
        }

        if (!titleEng.trim()) {
            newErrors.title_eng = "Title English wajib diisi";
            hasError = true;
        }

        if (!croppedBlob) {
            newErrors.image = "Image wajib diisi";
            hasError = true;
        }

        setErrors(newErrors);

        return !hasError;
    }


    /* =====================================
       RESET FORM
    ===================================== */
    function resetForm() {
        setTitleInd("");
        setTitleEng("");
        setImage(null);
        setCroppedBlob(null);
        setIsActive("1");
        setErrors({ title_ind: "", title_eng: "", image: "" });
    }


    /* =====================================
       SUBMIT
    ===================================== */
    async function handleSubmit() {

        setErrors({ title_ind: "", title_eng: "", image: "" });

        const isValid = validate();
        if (!isValid) return;

        try {

            setLoading(true);

            const result = await createCarousel({
                title_ind: titleInd,
                title_eng: titleEng,
                is_active: isActive,
                image: croppedBlob!,
            });

            if (result.success) {

                toast.success("Carousel berhasil ditambahkan");

                resetForm();

                setTimeout(() => {
                    router.push("/admin/carousel");
                }, 1000);

            } else {

                toast.error(result.message || "Gagal menyimpan data");

            }

        } catch (error) {

            toast.error("Terjadi kesalahan server");

        } finally {

            setLoading(false);

        }
    }


    return {
        // state
        image,
        croppedBlob,
        titleInd,
        titleEng,
        isActive,
        loading,
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