"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createAmenties } from "../_services/amenties.service";
interface AmenitiesItem {
    name_ind: string;
    name_eng: string;
}

interface ErrorState {
    name_ind?: string;
    name_eng?: string;
    icon?: string;
    is_addition?: string;
    amenities?: string;
}
export function useCreateAmenties() {
    const router = useRouter();

    const [name_ind, setNameInd] = useState("");
    const [name_eng, setNameEng] = useState("");
    const [icon, setIcon] = useState("");
    const [is_addition, setIsAddition] = useState("");

    // ✅ Amenities tags
    const [amenities, setAmenities] = useState<AmenitiesItem[]>([]);

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ErrorState>({});

    function validate(): boolean {
        const newErrors: ErrorState = {};
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

        if (!is_addition.trim()) {
            newErrors.is_addition = "Status Fasilitas wajib diisi";
            hasError = true;
        }

        // ✅ Validate amenities
        if (amenities.length === 0) {
            newErrors.amenities = "Minimal 1 amenities wajib ditambahkan";
            hasError = true;
        }

        setErrors(newErrors);
        return !hasError;
    }

    function resetForm() {
        setNameInd("");
        setNameEng("");
        setIcon("");
        setIsAddition("");
        setAmenities([]);
        setErrors({});
    }

    async function handleSubmit() {
        setErrors({});

        const isValid = validate();
        if (!isValid) return;

        try {
            setLoading(true);

            const result = await createAmenties({
                name_ind,
                name_eng,
                icon,
                is_addition,
                amenities,  // ✅ Pass amenities
            });

            if (result.success) {
                toast.success("Fasilitas berhasil ditambahkan");
                resetForm();

                setTimeout(() => {
                    router.push("/admin/rooms/amenties");
                }, 1000);
            } else {
                toast.error(result.message || "Gagal menyimpan data");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Terjadi kesalahan server");
        } finally {
            setLoading(false);
        }
    }

    return {
        name_ind,
        name_eng,
        icon,
        is_addition,
        amenities,  // ✅ Export amenities
        loading,
        errors,
        setNameInd,
        setNameEng,
        setIcon,
        setIsAddition,
        setAmenities,  // ✅ Export setAmenities
        handleSubmit,
    };
}