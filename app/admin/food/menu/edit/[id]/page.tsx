"use client";

import { useParams } from "next/navigation";
import { FormPage } from "@/components/admin/global/FormPage";
import { FormActions } from "@/components/admin/global/FormActions";
import { useEditMenu } from "../../_hooks/use-edit-menu-food";
import { useOptionList } from "../../_hooks/use-option-list";
import { IconPicker } from "@/components/admin/global/IconPicker";
import { TagInput } from "@/components/admin/global/TagInput";

export default function EditMenuPage() {
    const params = useParams();
    const id = params.id as string;
    const { catering } = useOptionList();

    const {
        food_package_id,
        name_ind,
        name_eng,
        subname_ind,
        subname_eng,
        icon,
        ourMenuFood,
        loading,
        fetchLoading,
        errors,
        setFoodPackageId,
        setNameInd,
        setNameEng,
        setSubnameInd,
        setSubnameEng,
        setIcon,
        setOurMenuFood,
        handleSubmit,
        handleDeleteFood,
    } = useEditMenu(id);

    if (fetchLoading) {
        return (
            <FormPage title="Edit Menu" description="Memuat data...">
                <div className="flex items-center justify-center py-12">
                    <div className="text-gray-600 dark:text-gray-400">Loading...</div>
                </div>
            </FormPage>
        );
    }

    return (
        <FormPage title="Edit Menu" description="Edit data Menu">
            <form
                className="space-y-5"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                }}
            >
                {/* Food Package Dropdown */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Food Package
                    </label>
                    <select
                        value={food_package_id}
                        onChange={(e) => setFoodPackageId(e.target.value)}
                        className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select food package...</option>
                        {catering.map((m) => (
                            <option key={m.value} value={m.value}>
                                {m.label}
                            </option>
                        ))}
                    </select>
                    {errors.food_package_id && (
                        <p className="mt-1 text-sm text-red-600">{errors.food_package_id}</p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-5">
                    {/* NAMA (INDONESIA) */}
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                            Menu Name (Indonesia)
                        </label>
                        <input
                            type="text"
                            value={name_ind}
                            onChange={(e) => setNameInd(e.target.value)}
                            className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter menu name"
                        />
                        {errors.name_ind && (
                            <p className="mt-1 text-sm text-red-600">{errors.name_ind}</p>
                        )}
                    </div>

                    {/* NAMA (ENGLISH) */}
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                            Menu Name (English)
                        </label>
                        <input
                            type="text"
                            value={name_eng}
                            onChange={(e) => setNameEng(e.target.value)}
                            className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter menu name"
                        />
                        {errors.name_eng && (
                            <p className="mt-1 text-sm text-red-600">{errors.name_eng}</p>
                        )}
                    </div>

                    {/* SUBNAME (INDONESIA) */}
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                            Subname Menu (Indonesia)
                        </label>
                        <input
                            type="text"
                            value={subname_ind}
                            onChange={(e) => setSubnameInd(e.target.value)}
                            className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter menu subname"
                        />
                        {errors.subname_ind && (
                            <p className="mt-1 text-sm text-red-600">{errors.subname_ind}</p>
                        )}
                    </div>

                    {/* SUBNAME (ENGLISH) */}
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                            Subname Menu (English)
                        </label>
                        <input
                            type="text"
                            value={subname_eng}
                            onChange={(e) => setSubnameEng(e.target.value)}
                            className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter menu subname"
                        />
                        {errors.subname_eng && (
                            <p className="mt-1 text-sm text-red-600">{errors.subname_eng}</p>
                        )}
                    </div>
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

                {/* Our Menu Food Tags */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Menu Food (Indonesia & English)
                    </label>
                    <TagInput
                        value={ourMenuFood}
                        onChange={setOurMenuFood}
                        onDelete={handleDeleteFood}
                        placeholderInd="Enter menu food name (Indonesia) then Enter"
                        placeholderEng="Enter menu food name (English) then Enter"
                        error={errors.our_menu_food}
                    />
                </div>

                {/* ACTIONS */}
                <FormActions loading={loading} />
            </form>
        </FormPage>
    );
}