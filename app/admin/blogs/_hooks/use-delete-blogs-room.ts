"use client";

import { useState } from "react";
import { toast } from "sonner";
import { deleteBlog } from "../_services/blogs.service";

export function useDeleteBlog(onSuccess: () => void) {

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

            const result = await deleteBlog(deleteId);

            if (result.success) {
                toast.success("Blog berhasil dihapus");
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