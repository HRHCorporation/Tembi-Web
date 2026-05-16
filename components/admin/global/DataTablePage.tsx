"use client";

import { createPortal } from "react-dom";
import { ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Pagination {
    total: number;
    totalPages: number;
}

interface DataTablePageProps {
    // Table content — inject <DataTable> dari page masing-masing via children
    children: ReactNode;

    loading?: boolean;
    loadingText?: string;

    // Search
    search?: string;
    onSearch?: (value: string) => void;
    searchPlaceholder?: string;

    // Limit / per-page
    limit?: number;
    onLimitChange?: (value: number) => void;
    limitOptions?: number[];

    // Sort
    sortLabel?: string;
    sortOrder?: "ASC" | "DESC";
    onSort?: () => void;

    // Pagination
    page?: number;
    pagination?: Pagination;
    onPageChange?: (page: number) => void;

    // Delete modal
    deleteId?: string | number | null;
    deleteLoading?: boolean;
    onDeleteConfirm?: () => void;
    onDeleteCancel?: () => void;

    // Slots
    topbarActions?: ReactNode;
    deleteModalContent?: ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function DataTablePage({
    children,

    loading = false,
    loadingText = "Loading data...",

    search = "",
    onSearch,
    searchPlaceholder = "Search...",

    limit = 10,
    onLimitChange,
    limitOptions = [10, 25, 50],

    sortLabel = "Sort",
    sortOrder = "ASC",
    onSort,

    page = 1,
    pagination = { total: 0, totalPages: 1 },
    onPageChange,

    deleteId = null,
    deleteLoading = false,
    onDeleteConfirm,
    onDeleteCancel,

    topbarActions,
    deleteModalContent,
}: DataTablePageProps) {
    return (
        <div className="space-y-4">

            {/* ── TOPBAR ─────────────────────────────────────────────────── */}
            <div className="flex items-center justify-between gap-4">


                {onSearch && (
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={search}
                        onChange={(e) => onSearch(e.target.value)}
                        className="w-full max-w-sm rounded border p-2
                                bg-white text-gray-900 placeholder-gray-400
                                dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:border-gray-600"
                    />
                )}

                {onLimitChange && (
                    <select
                        value={limit}
                        onChange={(e) => onLimitChange(Number(e.target.value))}
                        className="rounded border p-2
                                bg-white text-gray-900
                                dark:bg-gray-800 dark:text-white dark:border-gray-600"
                    >
                        {limitOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                )}


                {topbarActions && (
                    <div className="flex items-center gap-2">
                        {topbarActions}
                    </div>
                )}

            </div>

            {/* ── SORT ───────────────────────────────────────────────────── */}
            {onSort && (
                <div className="flex gap-2">
                    <button
                        onClick={onSort}
                        className="rounded border px-3 py-1
                            bg-white text-gray-900
                            dark:bg-gray-800 dark:text-white dark:border-gray-600
                            hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        {sortLabel} {sortOrder === "ASC" ? "↑" : "↓"}
                    </button>
                </div>
            )}

            {/* ── TABLE (inject dari luar via children) ──────────────────── */}
            {loading ? (
                <div className="rounded border p-10 text-center
                    bg-white text-gray-500
                    dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600">
                    {loadingText}
                </div>
            ) : (
                children
            )}

            {/* ── PAGINATION ─────────────────────────────────────────────── */}
            {onPageChange && (
                <div className="flex items-center justify-between">

                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Showing page {page} of {pagination.totalPages} ({pagination.total} data)
                    </div>

                    <div className="flex gap-2">
                        <button
                            disabled={page === 1}
                            onClick={() => onPageChange(page - 1)}
                            className="rounded border px-3 py-1 disabled:opacity-50
                                bg-white text-gray-900
                                dark:bg-gray-800 dark:text-white dark:border-gray-600
                                hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            Prev
                        </button>
                        <button
                            disabled={page === pagination.totalPages}
                            onClick={() => onPageChange(page + 1)}
                            className="rounded border px-3 py-1 disabled:opacity-50
                                bg-white text-gray-900
                                dark:bg-gray-800 dark:text-white dark:border-gray-600
                                hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            Next
                        </button>
                    </div>

                </div>
            )}

            {/* ── DELETE MODAL ───────────────────────────────────────────── */}
            {deleteId && createPortal(
                <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50">
                    <div className="rounded-lg p-6 shadow-lg w-80 space-y-4
                        bg-white dark:bg-gray-800">

                        {deleteModalContent ?? (
                            <>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                    Konfirmasi Hapus
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Apakah kamu yakin ingin menghapus data ini?
                                    Tindakan ini tidak bisa dibatalkan.
                                </p>
                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={onDeleteCancel}
                                        className="rounded-lg border px-4 py-2
                                            text-gray-700 dark:text-gray-300
                                            dark:border-gray-600
                                            hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        onClick={onDeleteConfirm}
                                        disabled={deleteLoading}
                                        className="rounded-lg bg-red-500 px-4 py-2 text-white
                                            disabled:opacity-50 hover:bg-red-600"
                                    >
                                        {deleteLoading ? "Menghapus..." : "Hapus"}
                                    </button>
                                </div>
                            </>
                        )}

                    </div>
                </div>,
                document.body
            )}

        </div>
    );
}