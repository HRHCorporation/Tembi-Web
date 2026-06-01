"use client";

import { FormPage } from "@/components/admin/global/FormPage";
import { FormActions } from "@/components/admin/global/FormActions";
import { useCreateCollection } from "../_hooks/use-create-collection-room";
import { IconPicker } from "@/components/admin/global/IconPicker";

export default function CreateCollectionPage() {

    const {
        name_ind,
        name_eng,
        loading,
        errors,
        setNameInd,
        setNameEng,
        handleSubmit,
    } = useCreateCollection();

    return (
        <FormPage
            title="Add Collection"
            description="Add new Collection data"
        >
            <form
                className="space-y-5"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <div className="grid grid-cols-2 gap-5">
                    {/* NAMA (INDONESIA) */}
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                            Collection Name (Indonesia)
                        </label>
                        <input
                            type="text"
                            value={name_ind}
                            onChange={(e) => setNameInd(e.target.value)}
                            className="w-full rounded border p-3
                            bg-white text-gray-900
                            dark:bg-gray-700 dark:text-white dark:border-gray-600
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter collection name"
                        />
                        {errors.name_ind && (
                            <p className="mt-1 text-sm text-red-600">{errors.name_ind}</p>
                        )}
                    </div>

                    {/* NAMA (ENGLISH) */}
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                            Collection Name (English)
                        </label>
                        <input
                            type="text"
                            value={name_eng}
                            onChange={(e) => setNameEng(e.target.value)}
                            className="w-full rounded border p-3
                            bg-white text-gray-900
                            dark:bg-gray-700 dark:text-white dark:border-gray-600
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter collection name"
                        />
                        {errors.name_eng && (
                            <p className="mt-1 text-sm text-red-600">{errors.name_eng}</p>
                        )}
                    </div>
                </div>


                {/* ACTIONS */}
                <FormActions loading={loading} />
            </form>
        </FormPage>
    );
}