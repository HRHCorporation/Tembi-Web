"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createMattress } from "../_services/mattress.service";

export function useCreateMattress() {

    const router = useRouter();

    const [name, setName] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [errors, setErrors] = useState({
        name: "",
    });

    /* =====================================
        VALIDATION
    ===================================== */
    function validate() {
        const newErrors = {
            name: "",
        };

        let hasError = false;

        if (!name.trim()) {
            newErrors.name = "Nama Kasur wajib diisi";
            hasError = true;
        }

        setErrors(newErrors);
        return !hasError;
    }

    /* =====================================
        RESET FORM
    ===================================== */
    function resetForm() {
        setName("");
        setErrors({
            name: "",
        });
    }

    async function handleSubmit() {
        setErrors({
            name: "",
        });

        const isValid = validate();
        if (!isValid) return;

        try {
            setLoading(true);

            const result = await createMattress({
                name: name
            });

            if (result.success) {

                toast.success("Kasur berhasil ditambahkan");

                resetForm();

                setTimeout(() => {
                    router.push("/admin/rooms/master/mattress");
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
        name,
        loading,
        errors,
        setName,
        handleSubmit,
    };
}