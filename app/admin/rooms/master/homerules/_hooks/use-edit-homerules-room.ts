"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getHomeRuleById, updateHomeRule } from "../_services/homerules.service";

export function useEditHomeRuleRoom(id: string) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [name_ind, setName_ind] = useState("");
    const [name_eng, setName_eng] = useState("");
    const [icon, setIcon] = useState("");
    const [errors, setErrors] = useState({
        name_ind: "",
        name_eng: "",
        icon: "",
    });

    /* =====================================
         FETCH DETAIL
    ===================================== */
    async function fetchDetail() {
        try {
            setFetchLoading(true);
            const result = await getHomeRuleById(Number(id));
            if (result.success) {
                const data = result.data;
                setName_ind(data.name_ind);
                setName_eng(data.name_eng);
                setIcon(data.icon);
            } else {
                toast.error("Data tidak ditemukan");
                router.push("/admin/rooms/master/homerules");
            }
        } catch (error) {
            toast.error("Gagal mengambil data");
        } finally {
            setFetchLoading(false);
        }
    }

    useEffect(() => {
        if (id) fetchDetail();
    }, [id]);

    /* =====================================
       SUBMIT
    ===================================== */
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErrors({
            name_ind: "",
            name_eng: "",
            icon: "",
        });

        let hasError = false;
        const newErrors = {
            name_ind: "",
            name_eng: "",
            icon: "",
        };
        if (!name_ind) {
            newErrors.name_ind = "Nama fasilitas (Indonesian) harus diisi";
            hasError = true;
        }
        if (!name_eng) {
            newErrors.name_eng = "Nama fasilitas (English) harus diisi";
            hasError = true;
        }
        if (!icon) {
            newErrors.icon = "Ikon fasilitas harus diisi";
            hasError = true;
        }
        setErrors(newErrors);
        if (hasError) return;

        try {
            setLoading(true);

            const result = await updateHomeRule(Number(id), {
                name_ind: name_ind,
                name_eng: name_eng,
                icon: icon,
            });

            if (result.success) {
                toast.success("Fasilitas berhasil diperbarui");
                setTimeout(() => {
                    router.push("/admin/rooms/master/homerules");
                }, 1000);
            } else {
                toast.error(result.message || "Gagal memperbarui fasilitas");
            }
        } catch (error) {
            toast.error("Gagal memperbarui fasilitas");
        }
        finally {
            setLoading(false);
        }
    }

    return {
        name_ind,
        setName_ind,
        name_eng,
        setName_eng,
        icon,
        setIcon,
        loading,
        errors,
        handleSubmit,
        fetchLoading,
    };
}
