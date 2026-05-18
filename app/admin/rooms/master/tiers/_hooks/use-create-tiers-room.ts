"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createTiersRoom } from "../_services/tiersroom.service";

export function useCreateTiersRoom() {

    const router = useRouter();

    const [nameId, setNameId] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [errors, setErrors] = useState({
        name_id: "",
    });

    /* =====================================
       VALIDATION
    ===================================== */
    function validate() {
        const newErrors = {
            name_id: "",
        };

        let hasError = false;

        if (!nameId.trim()) {
            newErrors.name_id = "Nama Tier wajib diisi";
            hasError = true;
        }

        setErrors(newErrors);
        return !hasError;
    }

    /* =====================================
        RESET FORM
    ===================================== */
    function resetForm() {
        setNameId("");
        setErrors({
            name_id: "",
        });
    }

    async function handleSubmit() {
        setErrors({
            name_id: "",
        });

        const isValid = validate();
        if (!isValid) return;

        try {
            setLoading(true);

            const result = await createTiersRoom({
                name_id: nameId
            });

            if (result.success) {

                toast.success("Tier berhasil ditambahkan");

                resetForm();

                setTimeout(() => {
                    router.push("/admin/rooms/master/tiers");
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
        nameId,
        loading,
        errors,
        setNameId,
        handleSubmit,
    };
}