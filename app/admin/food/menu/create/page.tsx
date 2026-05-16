"use client";

import { FormPage } from "@/components/admin/global/FormPage";
import { FormActions } from "@/components/admin/global/FormActions";
import { useCreateMenu } from "../_hooks/use-create-menu-food";
import { useOptionList } from "../_hooks/use-option-list";
import { IconPicker } from "@/components/admin/global/IconPicker";
import { TagInput } from "@/components/admin/global/TagInput";

export default function CreateMenuPage() {
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
        errors,
        setFoodPackageId,
        setNameInd,
        setNameEng,
        setSubnameInd,
        setSubnameEng,
        setIcon,
        setOurMenuFood,
        handleSubmit,
    } = useCreateMenu();

    return (
        <FormPage
            title="Tambah Menu"
            description="Tambahkan data Menu baru"
        >
            <form
                className="space-y-5"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
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
                        <option value="">Pilih food package...</option>
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

                {/* NAMA (INDONESIA) */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Nama Menu (Indonesia)
                    </label>
                    <input
                        type="text"
                        value={name_ind}
                        onChange={(e) => setNameInd(e.target.value)}
                        className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Masukkan nama menu"
                    />
                    {errors.name_ind && (
                        <p className="mt-1 text-sm text-red-600">{errors.name_ind}</p>
                    )}
                </div>

                {/* NAMA (ENGLISH) */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Nama Menu (English)
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
                        placeholder="Masukkan subname menu"
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
                        placeholderInd="Masukkan nama menu food (Indonesia) lalu Enter"
                        placeholderEng="Enter menu food name (English) then Tab"
                        error={errors.our_menu_food}
                    />
                </div>

                {/* ACTIONS */}
                <FormActions loading={loading} />
            </form>
        </FormPage>
    );
}