"use client";

import { FormPage } from "@/components/admin/global/FormPage";
import { FormActions } from "@/components/admin/global/FormActions";
import { useCreateCollection } from "../_hooks/use-create-collection-main";
import { useOptionList } from "../_hooks/use-option-list";
import { ImageCropper } from "@/app/admin/carousel/_components/image-cropper";

export default function CreateCollectionPage() {
    const { collection } = useOptionList();
    const {
        mstr_collection_id,
        name_ind,
        name_eng,
        description_ind,
        description_eng,
        imagePreview,
        croppedBlob,
        loading,
        errors,
        setErrors,
        setMstrCollectionId,
        setNameInd,
        setNameEng,
        setDescriptionInd,
        setDescriptionEng,
        setImageFile,
        setImagePreview,
        setCroppedBlob,
        handleSubmit,
    } = useCreateCollection();

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
            title="Add Collection"
            description="Add new Collection data"
        >
            <form
                className="space-y-6"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                {/* ===== BASIC INFORMATION ===== */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                        Basic Information
                    </h2>

                    <div className="space-y-4">

                        {/* Master Collection */}
                        <div>
                            <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                                Collection Category
                            </label>
                            <select
                                value={mstr_collection_id}
                                onChange={(e) => setMstrCollectionId(e.target.value)}
                                className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select collection category...</option>
                                {collection.map((m) => (
                                    <option key={m.value} value={m.value}>
                                        {m.label}
                                    </option>
                                ))}
                            </select>
                            {errors.mstr_collection_id && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.mstr_collection_id}
                                </p>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            {/* Nama Indonesia */}
                            <div>
                                <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                                    Collection Name (Indonesia)
                                </label>
                                <input
                                    type="text"
                                    value={name_ind}
                                    onChange={(e) => setNameInd(e.target.value)}
                                    className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Masukkan nama collection"
                                />
                                {errors.name_ind && (
                                    <p className="mt-1 text-sm text-red-600">{errors.name_ind}</p>
                                )}
                            </div>

                            {/* Nama English */}
                            <div>
                                <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                                    Collection Name (English)
                                </label>
                                <input
                                    type="text"
                                    value={name_eng}
                                    onChange={(e) => setNameEng(e.target.value)}
                                    className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter collection name"
                                />
                                {errors.name_eng && (
                                    <p className="mt-1 text-sm text-red-600">{errors.name_eng}</p>
                                )}
                            </div>

                            {/* Deskripsi Indonesia */}
                            <div>
                                <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                                    Collection Description (Indonesia)
                                </label>
                                <textarea
                                    value={description_ind}
                                    onChange={(e) => setDescriptionInd(e.target.value)}
                                    className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Masukkan deskripsi collection"
                                    rows={4}
                                />
                                {errors.description_ind && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.description_ind}
                                    </p>
                                )}
                            </div>

                            {/* Deskripsi English */}
                            <div>
                                <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                                    Collection Description (English)
                                </label>
                                <textarea
                                    value={description_eng}
                                    onChange={(e) => setDescriptionEng(e.target.value)}
                                    className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter collection description"
                                    rows={4}
                                />
                                {errors.description_eng && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.description_eng}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===== IMAGE ===== */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                        Collection Image
                    </h2>

                    <div className="space-y-4">
                        {/* File Input */}
                        <div>
                            <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                                Upload Image
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            <small className="mt-1 block text-gray-500 dark:text-gray-400">
                                Maximum file size: 15 MB. Supported formats: JPG, JPEG, PNG.
                            </small>
                            {errors.image && (
                                <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                            )}
                        </div>



                        {/* Image Cropper */}
                        {imagePreview && (
                            <div>
                                <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                                    Crop Gambar
                                </label>
                                <ImageCropper
                                    image={imagePreview}
                                    setCroppedBlob={setCroppedBlob}
                                />
                            </div>
                        )}

                        {/* Cropped Image Preview */}
                        {croppedBlob && (
                            <div>
                                <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                                    Preview Hasil Crop
                                </label>
                                <img
                                    src={URL.createObjectURL(croppedBlob)}
                                    alt="cropped preview"
                                    className="h-64 w-full object-cover rounded border border-gray-200 dark:border-gray-600"
                                />
                                <p className="mt-2 text-xs text-green-600 dark:text-green-400">
                                    ✓ Gambar sudah siap untuk disimpan
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* ACTIONS */}
                <FormActions loading={loading} />
            </form>
        </FormPage>
    );
}