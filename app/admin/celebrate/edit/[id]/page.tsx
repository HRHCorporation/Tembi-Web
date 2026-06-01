"use client";

import { useParams } from "next/navigation";
import { FormPage } from "@/components/admin/global/FormPage";
import { FormActions } from "@/components/admin/global/FormActions";
import { useEditCelebrate } from "../../_hooks/use-edit-celebrate-room";
import { ImageCropper } from "@/app/admin/carousel/_components/image-cropper";
import { TagInput } from "@/components/admin/global/TagInput";

export default function EditCelebratePage() {
    const params = useParams();
    const id = params.id as string;

    const {
        name_ind,
        name_eng,
        description_ind,
        description_eng,
        imageFile,
        imagePreview,
        croppedBlob,
        existingImage,
        celebrateMomentList,
        loading,
        fetchLoading,
        errors,
        setNameInd,
        setNameEng,
        setDescriptionInd,
        setDescriptionEng,
        setImageFile,
        setImagePreview,
        setCroppedBlob,
        setExistingImage,
        setCelebrateMomentList,
        handleSubmit,
        handleDeleteList,
    } = useEditCelebrate(id);

    // ✅ Handle image file selection
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setExistingImage(""); // Clear existing image when new image is selected
            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    if (fetchLoading) {
        return (
            <FormPage title="Edit Celebrate Moment" description="Memuat data...">
                <div className="flex items-center justify-center py-12">
                    <div className="text-gray-600 dark:text-gray-400">Loading...</div>
                </div>
            </FormPage>
        );
    }

    return (
        <FormPage
            title="Edit Celebrate Moment"
            description="Update Celebrate Moment data"
        >
            <form
                className="space-y-5"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
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




                {/* Existing Image Display */}
                {existingImage && !imagePreview && (
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                            Current Image
                        </label>
                        <img
                            src={existingImage}
                            alt="Current celebrate moment"
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

                {/* Celebrate Moment List Tags */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Celebrate Moment Items (Indonesia & English)
                    </label>
                    <TagInput
                        value={celebrateMomentList}
                        onChange={setCelebrateMomentList}
                        onDelete={handleDeleteList}
                        placeholderInd="Enter item name (Indonesia) then Tab"
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