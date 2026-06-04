"use client";

import { useParams, useRouter } from "next/navigation";
import { useEditFasilityRoom } from "../../_hooks/use-edit-fasilities-room";
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
        icon,
        setIcon,
        loading,
        errors,
        handleSubmit,
        setDescriptionInd,
        setDescriptionEng,
        description_ind,
        description_eng,
        fetchLoading, } = useEditFasilityRoom(id);

    const router = useRouter();
    if (fetchLoading) return (
        <div className="p-10 text-center text-gray-500 dark:text-gray-400">
            Loading...
        </div>
    );

    return (
        <FormPage
            title="Edit Venue Facilities"
            description="Edit Facility Venue Data"
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
                            Name of Venue Facilities (Indonesia)
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
                            Name of Venue Facilities (English)
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

                    {/* DESCRIPTION (Indonesia) */}
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                            Venue Facilities Description (Indonesia)
                        </label>
                        <textarea
                            value={description_ind}
                            onChange={(e) => setDescriptionInd(e.target.value)}
                            className="w-full rounded border p-3
                                bg-white text-gray-900
                                dark:bg-gray-700 dark:text-white dark:border-gray-600
                                focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {errors.description_ind && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.description_ind}
                        </p>
                    )}

                    {/* DESCRIPTION (English) */}
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                            Venue Facilities Description (English)
                        </label>
                        <textarea
                            value={description_eng}
                            onChange={(e) => setDescriptionEng(e.target.value)}
                            className="w-full rounded border p-3
                                bg-white text-gray-900
                                dark:bg-gray-700 dark:text-white dark:border-gray-600
                                focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {errors.description_eng && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.description_eng}
                        </p>
                    )}
                </div>




                {/* ICON */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Icon
                    </label>
                    <IconPicker
                        value={icon}
                        onChange={setIcon}
                        error={errors.icon}
                    />
                </div>
                {/* ACTIONS */}
                <FormActions loading={loading} />
            </form>

        </FormPage>

    );
}


