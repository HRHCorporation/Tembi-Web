"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getTiersRoomById, updateTiersRoom } from "../_services/tiersroom.service";

export function useEditTiersRoom(id: string) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [nameId, setNameId] = useState("");
    const [errors, setErrors] = useState({
        name_id: "",
    });

    /* =====================================
         FETCH DETAIL
    ===================================== */
    async function fetchDetail() {
        try {
            setFetchLoading(true);
            const result = await getTiersRoomById(Number(id));
            if (result.success) {
                const data = result.data;
                setNameId(data.name_id);
            } else {
                toast.error("Data tidak ditemukan");
                router.push("/admin/rooms/master/tiers");
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
            name_id: "",
        });

        let hasError = false;
        const newErrors = {
            name_id: "",
        };
        if (!nameId) {
            newErrors.name_id = "Nama tier kamar harus diisi";
            hasError = true;
        }
        setErrors(newErrors);
        if (hasError) return;

        try {
            setLoading(true);

            const result = await updateTiersRoom(Number(id), {
                name_id: nameId,
            });

            if (result.success) {
                toast.success("Tier kamar berhasil diperbarui");
                setTimeout(() => {
                    router.push("/admin/rooms/master/tiers");
                }, 1000);
            } else {
                toast.error(result.message || "Gagal memperbarui tier kamar");
            }
        } catch (error) {
            toast.error("Gagal memperbarui tier kamar");
        }
        finally {
            setLoading(false);
        }
    }

    return {
        nameId,
        setNameId,
        loading,
        errors,
        handleSubmit,
        fetchLoading,
    };
}
