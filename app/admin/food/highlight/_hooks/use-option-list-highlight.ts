"use client";

import { useState, useEffect } from "react";

interface FoodPackageOption {
    value: string;
    label: string;
}

interface MenuFoodOption {
    value: string;
    label: string;
}

export function useHighlightOptionList() {
    const [foodPackages, setFoodPackages] = useState<FoodPackageOption[]>([]);
    const [menuFoods, setMenuFoods] = useState<MenuFoodOption[]>([]);
    const [loadingPackages, setLoadingPackages] = useState(true);
    const [loadingFoods, setLoadingFoods] = useState(false);

    /* =====================================
        FETCH FOOD PACKAGES
    ===================================== */
    useEffect(() => {
        async function fetchFoodPackages() {
            try {
                const res = await fetch("/api/admin/food/packages-list");
                const result = await res.json();

                if (result.success && Array.isArray(result.data)) {
                    const options = (result.data as Array<{ id: number; name_ind: string; name_eng: string }>).map((item) => ({
                        value: String(item.id),
                        label: item.name_ind,
                    }));
                    setFoodPackages(options);
                }
            } catch (error) {
                console.error("Error fetching food packages:", error);
            } finally {
                setLoadingPackages(false);
            }
        }

        fetchFoodPackages();
    }, []);

    /* =====================================
        FETCH MENU FOODS BY PACKAGE
    ===================================== */
    async function fetchMenuFoodsByPackage(foodPackageId: string) {
        if (!foodPackageId) {
            setMenuFoods([]);
            return;
        }

        try {
            setLoadingFoods(true);
            const res = await fetch(`/api/admin/food/highlight/menu-food/${foodPackageId}`);
            const result = await res.json();

            if (result.success && Array.isArray(result.data)) {
                const options = (result.data as Array<{ id: number; name_ind: string; name_eng: string }>).map((item) => ({
                    value: String(item.id),
                    label: item.name_ind,
                }));
                setMenuFoods(options);
            } else {
                setMenuFoods([]);
            }
        } catch (error) {
            console.error("Error fetching menu foods:", error);
            setMenuFoods([]);
        } finally {
            setLoadingFoods(false);
        }
    }

    return {
        foodPackages,
        menuFoods,
        loadingPackages,
        loadingFoods,
        fetchMenuFoodsByPackage,
    };
}