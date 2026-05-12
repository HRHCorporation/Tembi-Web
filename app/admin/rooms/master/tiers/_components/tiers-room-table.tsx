"use client";

import { createPortal } from "react-dom";
import { DataTable } from "./data-table";
import { getColumns } from "./columns";
import { useTiersRoomList } from "../_hooks/use-tiers-room-list";
import { useDeleteTiersRoom } from "../_hooks/use-delete-tiers-room";

export function TiersRoomTable() {

    const {
        data,
        loading,
        search,
        page,
        limit,
        sortOrder,
        pagination,
        setPage,
        handleSearch,
        handleLimit,
        handleSort,
        refetch,
    } = useTiersRoomList();

    const {
        deleteId,
        loading: deleteLoading,
        confirmDelete,
        cancelDelete,
        handleDelete,
    } = useDeleteTiersRoom(refetch);

    const columns = getColumns(confirmDelete, page, limit);

    return (
        <div className="space-y-4">

            {/* TOPBAR */}
            <div className="flex items-center justify-between gap-4">

                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full max-w-sm rounded border p-2
                        bg-white text-gray-900 placeholder-gray-400
                        dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:border-gray-600"
                />

                <select
                    value={limit}
                    onChange={(e) => handleLimit(Number(e.target.value))}
                    className="rounded border p-2
                        bg-white text-gray-900
                        dark:bg-gray-800 dark:text-white dark:border-gray-600"
                >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </select>

            </div>

            {/* SORT */}
            <div className="flex gap-2">
                <button
                    onClick={() => handleSort("title_ind")}
                    className="rounded border px-3 py-1
                        bg-white text-gray-900
                        dark:bg-gray-800 dark:text-white dark:border-gray-600
                        hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    Sort Title {sortOrder === "ASC" ? "↑" : "↓"}
                </button>
            </div>

            {/* TABLE */}
            {loading ? (
                <div className="rounded border p-10 text-center
                    bg-white text-gray-500
                    dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600">
                    Loading data...
                </div>
            ) : (
                <DataTable columns={columns} data={data} />
            )}

            {/* FOOTER */}
            <div className="flex items-center justify-between">

                <div className="text-sm text-gray-500 dark:text-gray-400">
                    Showing page {page} of {pagination.totalPages} ({pagination.total} data)
                </div>

                <div className="flex gap-2">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="rounded border px-3 py-1 disabled:opacity-50
                            bg-white text-gray-900
                            dark:bg-gray-800 dark:text-white dark:border-gray-600
                            hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        Prev
                    </button>
                    <button
                        disabled={page === pagination.totalPages}
                        onClick={() => setPage(page + 1)}
                        className="rounded border px-3 py-1 disabled:opacity-50
                            bg-white text-gray-900
                            dark:bg-gray-800 dark:text-white dark:border-gray-600
                            hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        Next
                    </button>
                </div>

            </div>

            {/* MODAL DELETE */}
            {deleteId && createPortal(
                <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50">
                    <div className="rounded-lg p-6 shadow-lg w-80 space-y-4
                        bg-white dark:bg-gray-800">

                        <h2 className="text-lg font-bold
                            text-gray-900 dark:text-white">
                            Konfirmasi Hapus
                        </h2>

                        <p className="text-gray-600 dark:text-gray-300">
                            Apakah kamu yakin ingin menghapus tiers room ini?
                            Tindakan ini tidak bisa dibatalkan.
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={cancelDelete}
                                className="rounded-lg border px-4 py-2
                                    text-gray-700 dark:text-gray-300
                                    dark:border-gray-600
                                    hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deleteLoading}
                                className="rounded-lg bg-red-500 px-4 py-2 text-white disabled:opacity-50
                                    hover:bg-red-600"
                            >
                                {deleteLoading ? "Menghapus..." : "Hapus"}
                            </button>
                        </div>

                    </div>
                </div>,
                document.body
            )}

        </div>
    );
}