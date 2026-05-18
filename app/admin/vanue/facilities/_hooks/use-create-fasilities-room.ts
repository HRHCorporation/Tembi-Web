"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createFasility } from "../_services/fasilities.service";

export function useCreateFasility() {

    const router = useRouter();

    const [name_ind, setNameInd] =
        useState("");

    const [name_eng, setNameEng] =
        useState("");

    const [description_ind, setDescriptionInd] =
        useState("");

    const [description_eng, setDescriptionEng] =
        useState("");

    const [icon, setIcon] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [errors, setErrors] = useState({
        name_ind: "",
        name_eng: "",
        icon: "",
        description_ind: "",
        description_eng: "",
    });

    /* =====================================
        VALIDATION
    ===================================== */
    function validate() {
        const newErrors = {
            name_ind: "",
            name_eng: "",
            icon: "",
            description_ind: "",
            description_eng: "",
        };

        let hasError = false;

        if (!name_ind.trim()) {
            newErrors.name_ind = "Nama Fasilitas (Indonesian) wajib diisi";
            hasError = true;
        }

        if (!name_eng.trim()) {
            newErrors.name_eng = "Nama Fasilitas (English) wajib diisi";
            hasError = true;
        }

        if (!icon.trim()) {
            newErrors.icon = "Ikon Fasilitas wajib diisi";
            hasError = true;
        }

        if (!description_ind.trim()) {
            newErrors.description_ind = "Deskripsi Fasilitas (Indonesian) wajib diisi";
            hasError = true;
        }

        if (!description_eng.trim()) {
            newErrors.description_eng = "Deskripsi Fasilitas (English) wajib diisi";
            hasError = true;
        }

        setErrors(newErrors);
        return !hasError;
    }

    /* =====================================
        RESET FORM
    ===================================== */
    function resetForm() {
        setNameInd("");
        setNameEng("");
        setIcon("");
        setErrors({
            name_ind: "",
            name_eng: "",
            icon: "",
            description_ind: "",
            description_eng: "",
        });
        setDescriptionInd("");
        setDescriptionEng("");
    }

    async function handleSubmit() {
        setErrors({
            name_ind: "",
            name_eng: "",
            icon: "",
            description_ind: "",
            description_eng: "",
        });

        const isValid = validate();
        if (!isValid) return;

        try {
            setLoading(true);

            const result = await createFasility({
                name_ind: name_ind,
                name_eng: name_eng,
                icon: icon,
                description_ind: description_ind,
                description_eng: description_eng
            });

            if (result.success) {

                toast.success("Fasilitas berhasil ditambahkan");

                resetForm();

                setTimeout(() => {
                    router.push("/admin/vanue/facilities");
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
        name_ind,
        name_eng,
        icon,
        description_ind,
        description_eng,
        loading,
        errors,
        setNameInd,
        setNameEng,
        setIcon,
        setDescriptionInd,
        setDescriptionEng,
        handleSubmit,
    };
}