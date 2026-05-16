"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createMenu } from "../_services/menu.service";

interface OurMenuFood {
    name_ind: string;
    name_eng: string;
}

interface ErrorState {
    food_package_id?: string;
    name_ind?: string;
    name_eng?: string;
    subname_ind?: string;
    subname_eng?: string;
    icon?: string;
    our_menu_food?: string;
}

export function useCreateMenu() {
    const router = useRouter();

    // ✅ Main fields
    const [food_package_id, setFoodPackageId] = useState("");
    const [name_ind, setNameInd] = useState("");
    const [name_eng, setNameEng] = useState("");
    const [subname_ind, setSubnameInd] = useState("");
    const [subname_eng, setSubnameEng] = useState("");
    const [icon, setIcon] = useState("");
    
    // ✅ our_menu_food (tags)
    const [ourMenuFood, setOurMenuFood] = useState<OurMenuFood[]>([]);

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ErrorState>({});

    function validate(): boolean {
        const newErrors: ErrorState = {};
        let hasError = false;

        if (!food_package_id) {
            newErrors.food_package_id = "Food package wajib dipilih";
            hasError = true;
        }

        if (!name_ind?.trim()) {
            newErrors.name_ind = "Nama Menu (Indonesia) wajib diisi";
            hasError = true;
        }

        if (!name_eng?.trim()) {
            newErrors.name_eng = "Nama Menu (English) wajib diisi";
            hasError = true;
        }

        if (!subname_ind?.trim()) {
            newErrors.subname_ind = "Subname Menu (Indonesia) wajib diisi";
            hasError = true;
        }

        if (!subname_eng?.trim()) {
            newErrors.subname_eng = "Subname Menu (English) wajib diisi";
            hasError = true;
        }

        if (!icon?.trim()) {
            newErrors.icon = "Icon Menu wajib diisi";
            hasError = true;
        }

        if (ourMenuFood.length === 0) {
            newErrors.our_menu_food = "Minimal 1 menu food wajib ditambahkan";
            hasError = true;
        }

        setErrors(newErrors);
        return !hasError;
    }

    function resetForm() {
        setFoodPackageId("");
        setNameInd("");
        setNameEng("");
        setSubnameInd("");
        setSubnameEng("");
        setIcon("");
        setOurMenuFood([]);
        setErrors({});
    }

    async function handleSubmit() {
        setErrors({});

        const isValid = validate();
        if (!isValid) return;

        try {
            setLoading(true);

            const result = await createMenu({
                food_package_id,
                name_ind,
                name_eng,
                subname_ind,
                subname_eng,
                icon,
                our_menu_food: ourMenuFood,
            });

            if (result.success) {
                toast.success("Menu berhasil ditambahkan");
                resetForm();

                setTimeout(() => {
                    router.push("/admin/food/menu");
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
        food_package_id,
        name_ind,
        name_eng,
        subname_ind,
        subname_eng,
        icon,
        ourMenuFood,
        loading,
        errors,
        setFoodPackageId,
        setNameInd,
        setNameEng,
        setSubnameInd,
        setSubnameEng,
        setIcon,
        setOurMenuFood,
        handleSubmit,
    };
}