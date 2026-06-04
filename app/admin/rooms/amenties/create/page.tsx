"use client";

import { FormPage } from "@/components/admin/global/FormPage";
import { FormActions } from "@/components/admin/global/FormActions";
import { useCreateAmenties } from "../_hooks/use-create-amenties-room";
import { IconPicker } from "@/components/admin/global/IconPicker";
import { TagInput } from "@/components/admin/global/TagInput";

export default function CreateAmentiesPage() {
    const {
        name_ind,
        name_eng,
        icon,
        is_addition,
        amenities,  // ✅ Add
        loading,
        errors,
        setNameInd,
        setNameEng,
        setIcon,
        setIsAddition,
        setAmenities,  // ✅ Add
        handleSubmit,
    } = useCreateAmenties();

    return (
        <FormPage title="Add Amenities"
            description="Add new amenities data"
        >
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>

                <div className="grid grid-cols-2 gap-5">
                    {/* NAMA (INDONESIA) */}
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                            Amenities Name (Indonesia)
                        </label>
                        <input
                            type="text"
                            value={name_ind}
                            onChange={(e) => setNameInd(e.target.value)}
                            className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Masukkan nama fasilitas"
                        />
                        {errors.name_ind && <p className="mt-1 text-sm text-red-600">{errors.name_ind}</p>}
                    </div>

                    {/* NAMA (ENGLISH) */}
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                            Amenities Name (English)
                        </label>
                        <input
                            type="text"
                            value={name_eng}
                            onChange={(e) => setNameEng(e.target.value)}
                            className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter facility name"
                        />
                        {errors.name_eng && <p className="mt-1 text-sm text-red-600">{errors.name_eng}</p>}
                    </div>
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
                        <option value="">-- Choose Additional --</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                    {errors.is_addition && <p className="mt-1 text-sm text-red-600">{errors.is_addition}</p>}
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
                        Amenities Tags
                    </label>
                    <TagInput
                        value={amenities}
                        onChange={setAmenities}
                        placeholderInd="Enter amenities name (Indonesia) then Enter"
                        placeholderEng="Enter amenities name (English) then Enter"
                        error={errors.amenities}
                    />
                </div>

                {/* ACTIONS */}
                <FormActions loading={loading} />
            </form>
        </FormPage>
    );
}
