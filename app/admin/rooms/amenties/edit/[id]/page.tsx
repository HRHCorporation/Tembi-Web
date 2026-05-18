"use client";

import { useParams, useRouter } from "next/navigation";
import { useEditAmentiesRoom } from "../../_hooks/use-edit-amenties-room";
import { FormPage } from "@/components/admin/global/FormPage";
import { FormActions } from "@/components/admin/global/FormActions";
import { IconPicker } from "@/components/admin/global/IconPicker";
import { TagInput } from "@/components/admin/global/TagInput";

export default function EditAmentiesPage() {
    const params = useParams();
    const id = params.id as string;
    
    const {
        name_ind,
        setName_ind,
        name_eng,
        setName_eng,
        icon,
        setIcon,
        is_addition,
        setIsAddition,
        amenities,  // ✅ Add
        setAmenities,  // ✅ Add
        loading,
        errors,
        handleSubmit,
        fetchLoading,
        handleDeleteAmenity,  // ✅ Add
    } = useEditAmentiesRoom(id);

    const router = useRouter();
    
    if (fetchLoading) {
        return (
            <div className="p-10 text-center text-gray-500 dark:text-gray-400">
                Loading...
            </div>
        );
    }

    return (
        <FormPage title="Edit Fasilitas" description="Update data fasilitas">
            <form className="space-y-5" onSubmit={handleSubmit}>
                
                {/* NAME (Indonesia) */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Nama Fasilitas (Indonesia)
                    </label>
                    <input
                        type="text"
                        value={name_ind}
                        onChange={(e) => setName_ind(e.target.value)}
                        className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.name_ind && (
                        <p className="mt-1 text-sm text-red-600">{errors.name_ind}</p>
                    )}
                </div>

                {/* NAME (English) */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Nama Fasilitas (English)
                    </label>
                    <input
                        type="text"
                        value={name_eng}
                        onChange={(e) => setName_eng(e.target.value)}
                        className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.name_eng && (
                        <p className="mt-1 text-sm text-red-600">{errors.name_eng}</p>
                    )}
                </div>

                {/* IS ADDITIONAL */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Is Additional
                    </label>
                    <select
                        value={is_addition}
                        onChange={(e) => setIsAddition(e.target.value)}
                        className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">-- Pilih --</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                    {errors.is_addition && (
                        <p className="mt-1 text-sm text-red-600">{errors.is_addition}</p>
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

                {/* ✅ AMENITIES TAGS */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Amenities
                    </label>
                    <TagInput
                        value={amenities}
                        onChange={setAmenities}
                        onDelete={handleDeleteAmenity}
                        placeholderInd="Masukkan nama amenities (Indonesia) lalu Enter"
                        placeholderEng="Enter amenities name (English) then Tab"
                        error={errors.amenities}
                    />
                </div>

                {/* ACTIONS */}
                <FormActions loading={loading} />
            </form>
        </FormPage>
    );
}