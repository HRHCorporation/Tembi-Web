"use client";

import { FormPage } from "@/components/admin/global/FormPage";
import { FormActions } from "@/components/admin/global/FormActions";
import { useCreateFasility } from "../_hooks/use-create-fasilities-room";
import { IconPicker } from "@/components/admin/global/IconPicker";

export default function CreateFasilityPage() {
 
    const {
        name_ind,
        name_eng,
        icon,
        description_ind,
        description_eng,
        loading,
        errors,
        setNameInd,
        setNameEng,
        setIcon,
        setDescriptionInd,
        setDescriptionEng,
        handleSubmit,
    } = useCreateFasility();
 
    return (
        <FormPage
            title="Tambah Fasilitas"
            description="Tambahkan data Fasilitas baru"
        >
            <form
                className="space-y-5"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                {/* NAMA (INDONESIA) */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Nama (Indonesia)
                    </label>
                    <input
                        type="text"
                        value={name_ind}
                        onChange={(e) => setNameInd(e.target.value)}
                        className="w-full rounded border p-3
                            bg-white text-gray-900
                            dark:bg-gray-700 dark:text-white dark:border-gray-600
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Masukkan nama fasilitas"
                    />
                    {errors.name_ind && (
                        <p className="mt-1 text-sm text-red-600">{errors.name_ind}</p>
                    )}
                </div>
 
                {/* NAMA (ENGLISH) */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Nama (English)
                    </label>
                    <input
                        type="text"
                        value={name_eng}
                        onChange={(e) => setNameEng(e.target.value)}
                        className="w-full rounded border p-3
                            bg-white text-gray-900
                            dark:bg-gray-700 dark:text-white dark:border-gray-600
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter facility name"
                    />
                    {errors.name_eng && (
                        <p className="mt-1 text-sm text-red-600">{errors.name_eng}</p>
                    )}
                </div>

                {/* DESCRIPTION (INDONESIA) */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Deskripsi (Indonesia)
                    </label>
                    <textarea
                        value={description_ind}
                        onChange={(e) => setDescriptionInd(e.target.value)}
                        className="w-full rounded border p-3
                            bg-white text-gray-900
                            dark:bg-gray-700 dark:text-white dark:border-gray-600
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Masukkan deskripsi fasilitas"
                        rows={4}
                    />
                    {errors.description_ind && (
                        <p className="mt-1 text-sm text-red-600">{errors.description_ind}</p>
                    )}
                </div>

                {/* DESCRIPTION (ENGLISH) */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Description (English)
                    </label>
                    <textarea
                        value={description_eng}
                        onChange={(e) => setDescriptionEng(e.target.value)}
                        className="w-full rounded border p-3
                            bg-white text-gray-900
                            dark:bg-gray-700 dark:text-white dark:border-gray-600
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter facility description"
                        rows={4}
                    />
                    {errors.description_eng && (
                        <p className="mt-1 text-sm text-red-600">{errors.description_eng}</p>
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