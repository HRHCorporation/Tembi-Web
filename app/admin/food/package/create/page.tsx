"use client";

import { FormPage } from "@/components/admin/global/FormPage";
import { FormActions } from "@/components/admin/global/FormActions";
import { useCreatePackage } from "../_hooks/use-create-package-food";
import { useOptionList } from "../_hooks/use-option-list";
import { IconPicker } from "@/components/admin/global/IconPicker";
import { TagInput } from "@/components/admin/global/TagInput";

export default function CreatePackagePage() {
    const { catering } = useOptionList();
    const {
        food_package_id,
        name_ind,
        name_eng,
        description_ind,
        description_eng,
        icon,
        minimum_guest,
        is_popular,
        color,
        packageInclude,
        loading,
        errors,
        setFoodPackageId,
        setNameInd,
        setNameEng,
        setDescriptionInd,
        setDescriptionEng,
        setIcon,
        setMinimumGuest,
        setIsPopular,
        setColor,
        setPackageInclude,
        handleSubmit,
        COLOR_OPTIONS,
    } = useCreatePackage();

    return (
        <FormPage
            title="Add Package"
            description="Add a new package"
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
                    {/* Nama Indonesia */}
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                            Package Name (Indonesia)
                        </label>
                        <input
                            type="text"
                            value={name_ind}
                            onChange={(e) => setNameInd(e.target.value)}
                            className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Masukkan nama package"
                        />
                        {errors.name_ind && (
                            <p className="mt-1 text-sm text-red-600">{errors.name_ind}</p>
                        )}
                    </div>

                    {/* Nama English */}
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                            Package Name (English)
                        </label>
                        <input
                            type="text"
                            value={name_eng}
                            onChange={(e) => setNameEng(e.target.value)}
                            className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter package name"
                        />
                        {errors.name_eng && (
                            <p className="mt-1 text-sm text-red-600">{errors.name_eng}</p>
                        )}
                    </div>

                    {/* Deskripsi Indonesia */}
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                            Package Description (Indonesia)
                        </label>
                        <textarea
                            value={description_ind}
                            onChange={(e) => setDescriptionInd(e.target.value)}
                            className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Masukkan deskripsi package"
                            rows={4}
                        />
                        {errors.description_ind && (
                            <p className="mt-1 text-sm text-red-600">{errors.description_ind}</p>
                        )}
                    </div>

                    {/* Deskripsi English */}
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                            Package Description (English)
                        </label>
                        <textarea
                            value={description_eng}
                            onChange={(e) => setDescriptionEng(e.target.value)}
                            className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter package description"
                            rows={4}
                        />
                        {errors.description_eng && (
                            <p className="mt-1 text-sm text-red-600">{errors.description_eng}</p>
                        )}
                    </div>
                </div>

                {/* Icon */}
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

                {/* Minimum Guest */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Minimum Guest
                    </label>
                    <input
                        type="number"
                        value={minimum_guest ?? ""}
                        onChange={(e) => setMinimumGuest(e.target.value ? Number(e.target.value) : null)}
                        className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter minimum guest"
                    />
                    {errors.minimum_guest && (
                        <p className="mt-1 text-sm text-red-600">{errors.minimum_guest}</p>
                    )}
                </div>

                {/* Is Popular */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Is Popular?
                    </label>
                    <select
                        value={is_popular ? "1" : "0"}
                        onChange={(e) => setIsPopular(e.target.value === "1")}
                        className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="0">Not Popular</option>
                        <option value="1">Popular</option>
                    </select>
                </div>

                {/* Color Dropdown */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Warna
                    </label>
                    <select
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select a color...</option>
                        {COLOR_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    {color && (
                        <div className="mt-2 flex items-center gap-2">
                            <div
                                className="h-8 w-8 rounded border"
                                style={{ backgroundColor: color }}
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{color}</span>
                        </div>
                    )}
                    {errors.color && (
                        <p className="mt-1 text-sm text-red-600">{errors.color}</p>
                    )}
                </div>

                {/* Package Include Tags */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Package Include (Indonesia & English)
                    </label>
                    <TagInput
                        value={packageInclude}
                        onChange={setPackageInclude}
                        placeholderInd="Enter package include name (Indonesia) then Enter"
                        placeholderEng="Enter package include name (English) then Enter"
                        error={errors.package_include}
                    />
                </div>

                {/* ACTIONS */}
                <FormActions loading={loading} />
            </form>
        </FormPage>
    );
}