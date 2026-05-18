"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getCollectionById, updateCollection } from "../_services/collection.service";

export function useEditCollectionRoom(id: string) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [name_ind, setName_ind] = useState("");
    const [name_eng, setName_eng] = useState("");

    const [errors, setErrors] = useState({
        name_ind: "",
        name_eng: "",
    });

    /* =====================================
         FETCH DETAIL
    ===================================== */
    async function fetchDetail() {
        try {
            setFetchLoading(true);
            const result = await getCollectionById(Number(id));
            if (result.success) {
                const data = result.data;
                setName_ind(data.name_ind);
                setName_eng(data.name_eng);
            } else {
                toast.error("Data tidak ditemukan");
                router.push("/admin/collections/master");
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
        });

        let hasError = false;
        const newErrors = {
            name_ind: "",
            name_eng: "",
        };
        if (!name_ind) {
            newErrors.name_ind = "Nama fasilitas (Indonesian) harus diisi";
            hasError = true;
        }
        if (!name_eng) {
            newErrors.name_eng = "Nama fasilitas (English) harus diisi";
            hasError = true;
        }

        setErrors(newErrors);
        if (hasError) return;

        try {
            setLoading(true);

            const result = await updateCollection(Number(id), {
                name_ind: name_ind,
                name_eng: name_eng,
            });

            if (result.success) {
                toast.success("Master Collections berhasil diperbarui");
                setTimeout(() => {
                    router.push("/admin/collections/master");
                }, 1000);
            } else {
                toast.error(result.message || "Gagal memperbarui Master Collections");
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
        loading,
        errors,
        handleSubmit,
        fetchLoading,
    };
}
