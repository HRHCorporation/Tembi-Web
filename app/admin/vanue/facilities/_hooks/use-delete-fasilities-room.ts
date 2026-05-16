"use client";

import { useState } from "react";
import { toast } from "sonner";
import { deleteFasility } from "../_services/fasilities.service";

export function useDeleteFasilityRoom(onSuccess: () => void) {

    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    function confirmDelete(id: number) {
        setDeleteId(id);
    }

    function cancelDelete() {
        setDeleteId(null);
    }

    async function handleDelete() {
        if (!deleteId) return;

        try {
            setLoading(true);

            const result = await deleteFasility(deleteId);

            if (result.success) {
                toast.success("Fasilitas berhasil dihapus");
                setDeleteId(null);
                onSuccess(); // refresh table
            } else {
                toast.error(result.message || "Gagal menghapus data");
            }

        } catch (error) {
            toast.error("Terjadi kesalahan server");
        } finally {
            setLoading(false);
        }
    }

    return {
        deleteId,
        loading,
        confirmDelete,
        cancelDelete,
        handleDelete,
    };
}