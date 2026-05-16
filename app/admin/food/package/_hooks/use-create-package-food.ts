"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createPackage } from "../_services/package.service";

interface PackageInclude {
    name_ind: string;
    name_eng: string;
}

interface ErrorState {
    food_package_id?: string;
    name_ind?: string;
    name_eng?: string;
    description_ind?: string;
    description_eng?: string;
    icon?: string;
    minimum_guest?: string;
    color?: string;
    package_include?: string;
    is_popular?: string;
}

const COLOR_OPTIONS = [
    { value: "#F9F8F3", label: "#F9F8F3 (Light)" },
    { value: "#8B9D61", label: "#8B9D61 (Green)" },
    { value: "#5c4d42", label: "#5c4d42 (Brown)" },
];

export function useCreatePackage() {
    const router = useRouter();

    // ✅ Main fields
    const [food_package_id, setFoodPackageId] = useState("");
    const [name_ind, setNameInd] = useState("");
    const [name_eng, setNameEng] = useState("");
    const [description_ind, setDescriptionInd] = useState("");
    const [description_eng, setDescriptionEng] = useState("");
    const [icon, setIcon] = useState("");
    const [minimum_guest, setMinimumGuest] = useState<number | null>(null);
    const [is_popular, setIsPopular] = useState<boolean | null>(null);
    const [color, setColor] = useState("");

    // ✅ package_include (tags)
    const [packageInclude, setPackageInclude] = useState<PackageInclude[]>([]);

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
            newErrors.name_ind = "Nama Package (Indonesia) wajib diisi";
            hasError = true;
        }

        if (!name_eng?.trim()) {
            newErrors.name_eng = "Nama Package (English) wajib diisi";
            hasError = true;
        }

        if (!description_ind?.trim()) {
            newErrors.description_ind = "Deskripsi (Indonesia) wajib diisi";
            hasError = true;
        }

        if (!description_eng?.trim()) {
            newErrors.description_eng = "Deskripsi (English) wajib diisi";
            hasError = true;
        }

        if (!icon?.trim()) {
            newErrors.icon = "Icon wajib diisi";
            hasError = true;
        }

        if (minimum_guest === null || minimum_guest < 1) {
            newErrors.minimum_guest = "Minimum guest wajib diisi dan minimal 1";
            hasError = true;
        }

        if (!color) {
            newErrors.color = "Warna wajib dipilih";
            hasError = true;
        }

        if (packageInclude.length === 0) {
            newErrors.package_include = "Minimal 1 package include wajib ditambahkan";
            hasError = true;
        }

        if (is_popular === null) {
            newErrors.is_popular = "Status popular wajib dipilih";
            hasError = true;
        }

        setErrors(newErrors);
        return !hasError;
    }

    function resetForm() {
        setFoodPackageId("");
        setNameInd("");
        setNameEng("");
        setDescriptionInd("");
        setDescriptionEng("");
        setIcon("");
        setMinimumGuest(null);
        setIsPopular(null);
        setColor("");
        setPackageInclude([]);
        setErrors({});
    }

    async function handleSubmit() {
        setErrors({});

        const isValid = validate();
        if (!isValid) return;

        try {
            setLoading(true);

            const result = await createPackage({
                food_package_id,
                name_ind,
                name_eng,
                description_ind,
                description_eng,
                icon,
                minimum_guest: String(minimum_guest),
                is_popular: is_popular ?? false,
                color,
                package_include: packageInclude,
            });

            if (result.success) {
                toast.success("Package berhasil ditambahkan");
                resetForm();

                setTimeout(() => {
                    router.push("/admin/food/package");
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
        description_ind,
        description_eng,
        icon,
        minimum_guest,
        is_popular,
        color,
        packageInclude,
        loading,
        errors,
        setFoodPackageId,
        setNameInd,
        setNameEng,
        setDescriptionInd,
        setDescriptionEng,
        setIcon,
        setMinimumGuest,
        setIsPopular,
        setColor,
        setPackageInclude,
        handleSubmit,
        COLOR_OPTIONS,
    };
}