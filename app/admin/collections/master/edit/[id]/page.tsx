"use client";

import { useParams, useRouter } from "next/navigation";
import { useEditCollectionRoom } from "../../_hooks/use-edit-collection-room";
import { FormPage } from "@/components/admin/global/FormPage";
import { FormActions } from "@/components/admin/global/FormActions";
import { IconPicker } from "@/components/admin/global/IconPicker";

export default function EditFasilitiesPage() {

    const params = useParams();
    const id = params.id as string;
    const { name_ind,
        setName_ind,
        name_eng,
        setName_eng,
        loading,
        errors,
        handleSubmit,
        fetchLoading, } = useEditCollectionRoom(id);

    const router = useRouter();
    if (fetchLoading) return (
        <div className="p-10 text-center text-gray-500 dark:text-gray-400">
            Loading...
        </div>
    );

    return (
        <FormPage
            title="Edit Collection"
            description="Update data collection"
        >

            {/* FORM */}
            <form
                className="space-y-5"
                onSubmit={handleSubmit}
            >
                <div className="grid grid-cols-2 gap-5">
                    {/* NAME (Indonesia) */}
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                            Collection Name (Indonesia)
                        </label>
                        <input
                            type="text"
                            value={name_ind}
                            onChange={(e) => setName_ind(e.target.value)}
                            className="w-full rounded border p-3
                                bg-white text-gray-900
                                dark:bg-gray-700 dark:text-white dark:border-gray-600
                                focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {errors.name_ind && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.name_ind}
                        </p>
                    )}
                    {/* NAME (English) */}
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                            Collection Name (English)
                        </label>
                        <input
                            type="text"
                            value={name_eng}
                            onChange={(e) => setName_eng(e.target.value)}
                            className="w-full rounded border p-3
                                bg-white text-gray-900
                                dark:bg-gray-700 dark:text-white dark:border-gray-600
                                focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {errors.name_eng && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.name_eng}
                        </p>
                    )}
                </div>


                {/* ACTIONS */}
                <FormActions loading={loading} />
            </form>

        </FormPage>

    );
}


