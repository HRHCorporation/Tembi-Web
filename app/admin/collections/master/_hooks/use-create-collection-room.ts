"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createCollection } from "../_services/collection.service";

export function useCreateCollection() {

    const router = useRouter();

    const [name_ind, setNameInd] =
        useState("");

    const [name_eng, setNameEng] =
        useState("");


    const [loading, setLoading] =
        useState(false);

    const [errors, setErrors] = useState({
        name_ind: "",
        name_eng: "",
    });

    /* =====================================
        VALIDATION
    ===================================== */
    function validate() {
        const newErrors = {
            name_ind: "",
            name_eng: "",
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

        setErrors(newErrors);
        return !hasError;
    }

    /* =====================================
        RESET FORM
    ===================================== */
    function resetForm() {
        setNameInd("");
        setNameEng("");

        setErrors({
            name_ind: "",
            name_eng: "",
        });
    }

    async function handleSubmit() {
        setErrors({
            name_ind: "",
            name_eng: "",
        });

        const isValid = validate();
        if (!isValid) return;

        try {
            setLoading(true);

            const result = await createCollection({
                name_ind: name_ind,
                name_eng: name_eng,
            });

            if (result.success) {

                toast.success("Fasilitas berhasil ditambahkan");

                resetForm();

                setTimeout(() => {
                    router.push("/admin/collections/master");
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
        loading,
        errors,
        setNameInd,
        setNameEng,
        handleSubmit,
    };
}