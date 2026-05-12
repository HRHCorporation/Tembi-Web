"use client";

import { useParams, useRouter } from "next/navigation";
import { useEditTiersRoom } from "../../_hooks/use-edit-tiers-room";

export default function EditTierPage() {

    const params = useParams();
    const id = params.id as string;
    const { loading, fetchLoading, nameId, errors, setNameId, handleSubmit } = useEditTiersRoom(id);

    const router = useRouter();
    if (fetchLoading) return (
        <div className="p-10 text-center text-gray-500 dark:text-gray-400">
            Loading...
        </div>
    );

    return (
        <div className="space-y-5">
            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Edit Tier Kamar
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Update data tier kamar
                </p>
            </div>

            {/* FORM */}
            <div className="rounded-lg border bg-white p-6 dark:bg-gray-800 dark:border-gray-700">
                <form
                    className="space-y-5"
                    onSubmit={handleSubmit}
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
                        />
                    </div>
                    {errors.name_id && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.name_id}
                        </p>
                    )}
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
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700
                                dark:bg-blue-500 dark:hover:bg-blue-600"
                        >
                            {loading ? "Updating..." : "Update"}
                        </button>
                    </div>
                </form>

            </div>

        </div>
    );
}


