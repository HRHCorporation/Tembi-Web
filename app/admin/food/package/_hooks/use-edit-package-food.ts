"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getPackageById, updatePackage } from "../_services/package.service";

interface PackageInclude {
    id?: number;
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
}

const COLOR_OPTIONS = [
    { value: "#F9F8F3", label: "#F9F8F3 (Light)" },
    { value: "#8B9D61", label: "#8B9D61 (Green)" },
    { value: "#5c4d42", label: "#5c4d42 (Brown)" },
];

export function useEditPackage(id: string) {
    const router = useRouter();

    // ✅ Main fields
    const [food_package_id, setFoodPackageId] = useState("");
    const [name_ind, setNameInd] = useState("");
    const [name_eng, setNameEng] = useState("");
    const [description_ind, setDescriptionInd] = useState("");
    const [description_eng, setDescriptionEng] = useState("");
    const [icon, setIcon] = useState("");
    const [minimum_guest, setMinimumGuest] = useState<number | null>(null);
    const [is_popular, setIsPopular] = useState<boolean>(true);
    const [color, setColor] = useState("");

    // ✅ package_include (tags)
    const [packageInclude, setPackageInclude] = useState<PackageInclude[]>([]);
    const [deletedIncludeIds, setDeletedIncludeIds] = useState<number[]>([]);

    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [errors, setErrors] = useState<ErrorState>({});

    /* =====================================
        FETCH DETAIL
    ===================================== */
    async function fetchDetail() {
        try {
            setFetchLoading(true);
            const result = await getPackageById(Number(id));
            if (result.success) {
                const data = result.data as Record<string, unknown>;
                setFoodPackageId(String(data.food_package_id) || "");
                setNameInd((data.name_ind as string) || "");
                setNameEng((data.name_eng as string) || "");
                setDescriptionInd((data.description_ind as string) || "");
                setDescriptionEng((data.description_eng as string) || "");
                setIcon((data.icon as string) || "");
                setMinimumGuest((data.minimum_guest as number) || null);
                setIsPopular(Boolean(data.is_popular) || true);
                setColor((data.color as string) || "");

                // ✅ Set package_include
                const includeData = data.package_include as PackageInclude[] || [];
                setPackageInclude(includeData);
            } else {
                toast.error("Data tidak ditemukan");
                router.push("/admin/food/package");
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

        setErrors(newErrors);
        return !hasError;
    }

    /* =====================================
        HANDLE DELETE INCLUDE
    ===================================== */
    function handleDeleteInclude(index: number) {
        const include = packageInclude[index];

        // Track deleted ID if existing
        if (include.id) {
            setDeletedIncludeIds([...deletedIncludeIds, include.id]);
        }

        // Remove dari array
        setPackageInclude(packageInclude.filter((_, i) => i !== index));
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

            const result = await updatePackage(Number(id), {
                food_package_id,
                name_ind,
                name_eng,
                description_ind,
                description_eng,
                icon,
                minimum_guest: String(minimum_guest),
                is_popular,
                color,
                package_include: packageInclude,
                deleted_include_ids: deletedIncludeIds,
            });

            if (result.success) {
                toast.success("Package berhasil diperbarui");

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
        fetchLoading,
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
        handleDeleteInclude,
        COLOR_OPTIONS,
    };
}