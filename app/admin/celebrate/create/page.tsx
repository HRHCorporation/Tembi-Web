"use client";

import { FormPage } from "@/components/admin/global/FormPage";
import { FormActions } from "@/components/admin/global/FormActions";
import { useCreateCelebrate } from "../_hooks/use-create-celebrate-room";
import { ImageCropper } from "@/app/admin/carousel/_components/image-cropper";
import { TagInput } from "@/components/admin/global/TagInput";

export default function CreateCelebratePage() {
    const {
        name_ind,
        name_eng,
        description_ind,
        description_eng,
        imageFile,
        imagePreview,
        croppedBlob,
        celebrateMomentList,
        loading,
        errors,
        setErrors,
        setNameInd,
        setNameEng,
        setDescriptionInd,
        setDescriptionEng,
        setImageFile,
        setImagePreview,
        setCroppedBlob,
        setCelebrateMomentList,
        handleSubmit,
    } = useCreateCelebrate();

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

    return (
        <FormPage
            title="Add Celebrate Moment"
            description="Add new Celebrate Moment data"
        >
            <form
                className="space-y-5"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >

                <div className="grid grid-cols-2 gap-5">

                    {/* Nama Indonesia */}
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                            Celebrate Name (Indonesia)
                        </label>
                        <input
                            type="text"
                            value={name_ind}
                            onChange={(e) => setNameInd(e.target.value)}
                            className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter celebrate moment name"
                        />
                        {errors.name_ind && (
                            <p className="mt-1 text-sm text-red-600">{errors.name_ind}</p>
                        )}
                    </div>

                    {/* Nama English */}
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                            Celebrate Name (English)
                        </label>
                        <input
                            type="text"
                            value={name_eng}
                            onChange={(e) => setNameEng(e.target.value)}
                            className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter celebrate moment name"
                        />
                        {errors.name_eng && (
                            <p className="mt-1 text-sm text-red-600">{errors.name_eng}</p>
                        )}
                    </div>

                    {/* Deskripsi Indonesia */}
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                            Celebrate Description (Indonesia)
                        </label>
                        <textarea
                            value={description_ind}
                            onChange={(e) => setDescriptionInd(e.target.value)}
                            className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter celebrate moment description"
                            rows={4}
                        />
                        {errors.description_ind && (
                            <p className="mt-1 text-sm text-red-600">{errors.description_ind}</p>
                        )}
                    </div>

                    {/* Deskripsi English */}
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                            Celebrate Description (English)
                        </label>
                        <textarea
                            value={description_eng}
                            onChange={(e) => setDescriptionEng(e.target.value)}
                            className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter celebrate moment description"
                            rows={4}
                        />
                        {errors.description_eng && (
                            <p className="mt-1 text-sm text-red-600">{errors.description_eng}</p>
                        )}
                    </div>
                </div>




                {/* Image Upload */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Upload Image
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
                            Crop Image
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

                {/* Celebrate Moment List Tags */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Celebrate Moment Items (Indonesia & English)
                    </label>
                    <TagInput
                        value={celebrateMomentList}
                        onChange={setCelebrateMomentList}
                        placeholderInd="Enter item name (Indonesia) then Enter"
                        placeholderEng="Enter item name (English) then Tab"
                        error={errors.celebrate_moment_list}
                    />
                </div>

                {/* ACTIONS */}
                <FormActions loading={loading} />
            </form>
        </FormPage>
    );
}