"use client";

import { useRouter } from "next/navigation";
import { useCreateTiersRoom } from "../_hooks/use-create-tiers-room";

export default function CreateTierPage() {

    const router = useRouter();

    const { nameId, loading, errors, setNameId, handleSubmit } = useCreateTiersRoom();

    return (
        <div className="space-y-5">
            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Tambah Tier Kamar
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Tambahkan data tier kamar baru
                </p>
            </div>

            {/* FORM */}
            <div className="rounded-lg border bg-white p-6 dark:bg-gray-800 dark:border-gray-700">
                <form
                    className="space-y-5"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    {/* NAME ID */}
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                            Nama Tier
                        </label>
                        <input
                            type="text"
                            value={nameId}
                            onChange={(e) => setNameId(e.target.value)}
                            className="w-full rounded border p-3
                                    bg-white text-gray-900
                                    dark:bg-gray-700 dark:text-white dark:border-gray-600
                                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Masukkan nama tier kamar"
                        />
                        {errors.name_id && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.name_id}
                            </p>
                        )}
                    </div>
                    {/* ACTIONS */}
                    <div className="flex gap-3">
                        <button

                            type="button"
                            onClick={() => router.back()}
                            className="rounded-lg border px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer
                                dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50 cursor-pointer
                                dark:bg-blue-500 dark:hover:bg-blue-600"
                        >
                            {loading ? "Menyimpan..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}