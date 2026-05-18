"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getMenuById, updateMenu } from "../_services/menu.service";

interface OurMenuFood {
    id?: number;
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

export function useEditMenu(id: string) {
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
    const [deletedFoodIds, setDeletedFoodIds] = useState<number[]>([]);

    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [errors, setErrors] = useState<ErrorState>({});

    /* =====================================
        FETCH DETAIL
    ===================================== */
    async function fetchDetail() {
        try {
            setFetchLoading(true);
            const result = await getMenuById(Number(id));
            if (result.success) {
                const data = result.data as Record<string, unknown>;
                setFoodPackageId(String(data.food_package_id) || "");
                setNameInd((data.name_ind as string) || "");
                setNameEng((data.name_eng as string) || "");
                setSubnameInd((data.subname_ind as string) || "");
                setSubnameEng((data.subname_eng as string) || "");
                setIcon((data.icon as string) || "");
                
                // ✅ Set our_menu_food
                const foodData = data.our_menu_food as OurMenuFood[] || [];
                setOurMenuFood(foodData);
            } else {
                toast.error("Data tidak ditemukan");
                router.push("/admin/food/menu");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Gagal mengambil data");
        } finally {
            setFetchLoading(false);
        }
    }

    useEffect(() => {
        if (id) fetchDetail();
    }, [id]);

    /* =====================================
        VALIDATION
    ===================================== */
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

    /* =====================================
        HANDLE DELETE FOOD
    ===================================== */
    function handleDeleteFood(index: number) {
        const food = ourMenuFood[index];
        
        // Track deleted ID if existing
        if (food.id) {
            setDeletedFoodIds([...deletedFoodIds, food.id]);
        }
        
        // Remove dari array
        setOurMenuFood(ourMenuFood.filter((_, i) => i !== index));
    }

    /* =====================================
        SUBMIT
    ===================================== */
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErrors({});

        const isValid = validate();
        if (!isValid) return;

        try {
            setLoading(true);

            const result = await updateMenu(Number(id), {
                food_package_id,
                name_ind,
                name_eng,
                subname_ind,
                subname_eng,
                icon,
                our_menu_food: ourMenuFood,
                deleted_food_ids: deletedFoodIds,
            });

            if (result.success) {
                toast.success("Menu berhasil diperbarui");

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
        fetchLoading,
        errors,
        setFoodPackageId,
        setNameInd,
        setNameEng,
        setSubnameInd,
        setSubnameEng,
        setIcon,
        setOurMenuFood,
        handleSubmit,
        handleDeleteFood,
    };
}