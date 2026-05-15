"use client";

import { useState } from "react";
import { toast } from "sonner";
import { deletePolicy } from "../_services/policies.service";

export function useDeletePolicyRoom(onSuccess: () => void) {

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

            const result = await deletePolicy(deleteId);

            if (result.success) {
                toast.success("Kebijakan berhasil dihapus");
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