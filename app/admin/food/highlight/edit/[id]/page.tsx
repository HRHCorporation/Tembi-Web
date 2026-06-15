"use client";

import { useParams } from "next/navigation";
import { FormPage } from "@/components/admin/global/FormPage";
import { FormActions } from "@/components/admin/global/FormActions";
import { useEditHighlight } from "../../_hooks/use-edit-highlight-food";
import { useHighlightOptionList } from "../../_hooks/use-option-list-highlight";
import { ImageCropper } from "@/app/admin/carousel/_components/image-cropper";
import { useEffect } from "react";

export default function EditHighlightPage() {
    const params = useParams();
    const id = params.id as string;

    const {
        food_package_id,
        our_menu_food_id,
        imageFile,
        imagePreview,
        croppedBlob,
        existingImage,
        description_ind,
        description_eng,
        loading,
        fetchLoading,
        errors,
        setErrors,
        setFoodPackageId,
        setOurMenuFoodId,
        setImageFile,
        setImagePreview,
        setCroppedBlob,
        setExistingImage,
        setDescriptionInd,
        setDescriptionEng,
        handleSubmit,
    } = useEditHighlight(id);

    const {
        foodPackages,
        menuFoods,
        loadingPackages,
        loadingFoods,
        fetchMenuFoodsByPackage,
    } = useHighlightOptionList();

    // ✅ Handle food package change
    const handleFoodPackageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const packageId = e.target.value;
        setFoodPackageId(packageId);
        setOurMenuFoodId(""); // Reset menu food
        fetchMenuFoodsByPackage(packageId);
    };

    // ✅ Handle image file selection
    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const maxSize = 15 * 1024 * 1024; // 15 MB

        if (file.size > maxSize) {
            setErrors((prev) => ({
                ...prev,
                image: "Maximum file size is 15 MB",
            }));

            e.target.value = "";
            setImageFile(null);
            setImagePreview("");

            return;
        }

        setErrors((prev) => ({
            ...prev,
            image: "",
        }));

        setImageFile(file);

        const reader = new FileReader();

        reader.onload = (event) => {
            setImagePreview(event.target?.result as string);
        };

        reader.readAsDataURL(file);
    };

    // ✅ Fetch menu foods when food_package_id is loaded from detail
    useEffect(() => {
        if (food_package_id && !fetchLoading) {
            fetchMenuFoodsByPackage(food_package_id);
        }
    }, [food_package_id, fetchLoading]);

    if (fetchLoading) {
        return (
            <FormPage title="Edit Highlight" description="Memuat data...">
                <div className="flex items-center justify-center py-12">
                    <div className="text-gray-600 dark:text-gray-400">Loading...</div>
                </div>
            </FormPage>
        );
    }

    return (
        <FormPage title="Edit Highlight" description="Perbarui data Highlight">
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
                        onChange={handleFoodPackageChange}
                        disabled={loadingPackages}
                        className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        <option value="">Select food package...</option>
                        {foodPackages.map((fp) => (
                            <option key={fp.value} value={fp.value}>
                                {fp.label}
                            </option>
                        ))}
                    </select>
                    {errors.food_package_id && (
                        <p className="mt-1 text-sm text-red-600">{errors.food_package_id}</p>
                    )}
                </div>

                {/* Menu Food Dropdown (Cascading) */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Menu Food
                    </label>
                    <select
                        value={our_menu_food_id}
                        onChange={(e) => setOurMenuFoodId(e.target.value)}
                        disabled={!food_package_id || loadingFoods}
                        className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        <option value="">Pilih menu food...</option>
                        {menuFoods.map((mf) => (
                            <option key={mf.value} value={mf.value}>
                                {mf.label}
                            </option>
                        ))}
                    </select>
                    {errors.our_menu_food_id && (
                        <p className="mt-1 text-sm text-red-600">{errors.our_menu_food_id}</p>
                    )}
                </div>

                {/* Existing Image Display */}
                {existingImage && !imagePreview && (
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                            Current Image
                        </label>
                        <img
                            src={existingImage}
                            alt="Current highlight"
                            className="h-64 w-full rounded-lg object-cover"
                        />
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Upload gambar baru untuk mengganti
                        </p>
                    </div>
                )}

                {/* Image Upload */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Upload Image {existingImage && !imagePreview && "(Optional)"}
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <small className="mt-1 block text-gray-500 dark:text-gray-400">
                    Maximum file size: 15 MB. Supported formats: JPG, JPEG, PNG.
                </small>

                {/* Image Cropper */}
                {imagePreview && (
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                            Crop Image (Square Format)
                        </label>
                        <ImageCropper
                            image={imagePreview}
                            setCroppedBlob={setCroppedBlob}
                        />
                        {errors.image && (
                            <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                        )}
                    </div>
                )}

                {errors.image && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.image}
                    </p>
                )}

                <div className="grid grid-cols-2 gap-5">
                    {/* Description Indonesia */}
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                            Description Highlights (Indonesia)
                        </label>
                        <textarea
                            value={description_ind}
                            onChange={(e) => setDescriptionInd(e.target.value)}
                            className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Masukkan deskripsi highlight"
                            rows={4}
                        />
                        {errors.description_ind && (
                            <p className="mt-1 text-sm text-red-600">{errors.description_ind}</p>
                        )}
                    </div>

                    {/* Description English */}
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                            Description Highlights (English)
                        </label>
                        <textarea
                            value={description_eng}
                            onChange={(e) => setDescriptionEng(e.target.value)}
                            className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter highlight description"
                            rows={4}
                        />
                        {errors.description_eng && (
                            <p className="mt-1 text-sm text-red-600">{errors.description_eng}</p>
                        )}
                    </div>

                </div>



                {/* ACTIONS */}
                <FormActions loading={loading} />
            </form>
        </FormPage>
    );
}