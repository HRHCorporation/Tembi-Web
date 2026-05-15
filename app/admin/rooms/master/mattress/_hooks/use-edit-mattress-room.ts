"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getMattressById, updateMattress } from "../_services/mattress.service";

export function useEditMattressRoom(id: string) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [name, setName] = useState("");
    const [errors, setErrors] = useState({
        name: "",
    });

    /* =====================================
         FETCH DETAIL
    ===================================== */
    async function fetchDetail() {
        try {
            setFetchLoading(true);
            const result = await getMattressById(Number(id));
            if (result.success) {
                const data = result.data;
                setName(data.name);
            } else {
                toast.error("Data tidak ditemukan");
                router.push("/admin/rooms/master/mattress");
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
            name: "",
        });

        let hasError = false;
        const newErrors = {
            name: "",
        };
        if (!name) {
            newErrors.name = "Nama kasur harus diisi";
            hasError = true;
        }
        setErrors(newErrors);
        if (hasError) return;

        try {
            setLoading(true);

            const result = await updateMattress(Number(id), {
                name: name,
            });

            if (result.success) {
                toast.success("Kasur berhasil diperbarui");
                setTimeout(() => {
                    router.push("/admin/rooms/master/mattress");
                }, 1000);
            } else {
                toast.error(result.message || "Gagal memperbarui kasur");
            }
        } catch (error) {
            toast.error("Gagal memperbarui kasur");
        }
        finally {
            setLoading(false);
        }
    }

    return {
        name,
        setName,
        loading,
        errors,
        handleSubmit,
        fetchLoading,
    };
}
