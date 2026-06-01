"use client";

import { useParams } from "next/navigation";
import { FormPage } from "@/components/admin/global/FormPage";
import { FormActions } from "@/components/admin/global/FormActions";
import { useEditBlog } from "../../_hooks/use-edit-blogs-room";
import { CustomEditor } from "@/components/admin/global/Customeditornative";
import { ImageCropper } from "@/app/admin/carousel/_components/image-cropper";

export default function EditBlogPage() {
    const params = useParams();
    const id = params.id as string;

    const {
        title_ind,
        title_eng,
        description_ind,
        description_eng,
        slug,
        thumbnailPreview,
        croppedBlob,
        existingThumbnail,
        loading,
        fetchLoading,
        errors,
        setTitleInd,
        handleTitleEngChange,
        setDescriptionInd,
        setDescriptionEng,
        setThumbnailFile,
        setThumbnailPreview,
        setCroppedBlob,
        setExistingThumbnail,
        handleSubmit,
    } = useEditBlog(id);

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setThumbnailFile(file);
            setExistingThumbnail("");
            const reader = new FileReader();
            reader.onload = (event) => {
                setThumbnailPreview(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    if (fetchLoading) {
        return (
            <FormPage title="Edit Blog" description="Memuat data...">
                <div className="flex items-center justify-center py-12">
                    <div className="text-gray-600 dark:text-gray-400">Loading...</div>
                </div>
            </FormPage>
        );
    }

    return (
        <FormPage
            title="Edit Blog"
            description="Update blog articles"
        >
            <form
                className="space-y-6"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                }}
            >
                {/* ===== BASIC INFORMATION ===== */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                        Informasi Dasar
                    </h2>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-5">
                            {/* Judul Indonesia */}
                            <div>
                                <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                                    Judul (Indonesia)
                                </label>
                                <input
                                    type="text"
                                    value={title_ind}
                                    onChange={(e) => setTitleInd(e.target.value)}
                                    className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Masukkan judul blog"
                                />
                                {errors.title_ind && (
                                    <p className="mt-1 text-sm text-red-600">{errors.title_ind}</p>
                                )}
                            </div>

                            {/* Judul English */}
                            <div>
                                <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                                    Judul (English)
                                </label>
                                <input
                                    type="text"
                                    value={title_eng}
                                    onChange={(e) => handleTitleEngChange(e.target.value)}
                                    className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter blog title"
                                />
                                {errors.title_eng && (
                                    <p className="mt-1 text-sm text-red-600">{errors.title_eng}</p>
                                )}
                            </div>
                        </div>


                        {/* Slug (Auto-generated) */}
                        <div>
                            <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                                Slug (Auto-generated)
                            </label>
                            <input
                                type="text"
                                value={slug}
                                disabled
                                className="w-full rounded border p-3 bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-gray-300 dark:border-gray-500 cursor-not-allowed opacity-50"
                                placeholder="Auto-generated from English title"
                            />
                        </div>
                    </div>
                </div>

                {/* ===== CONTENT INDONESIA ===== */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                        Konten (Indonesia)
                    </h2>

                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                            Deskripsi & Konten
                        </label>
                        <CustomEditor
                            value={description_ind}
                            onChange={setDescriptionInd}
                            placeholder="Tulis konten blog dalam bahasa Indonesia..."
                            error={errors.description_ind}
                        />
                    </div>
                </div>

                {/* ===== CONTENT ENGLISH ===== */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                        Konten (English)
                    </h2>

                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                            Description & Content
                        </label>
                        <CustomEditor
                            value={description_eng}
                            onChange={setDescriptionEng}
                            placeholder="Write blog content in English..."
                            error={errors.description_eng}
                        />
                    </div>
                </div>

                {/* ===== THUMBNAIL ===== */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                        Thumbnail
                    </h2>

                    <div className="space-y-4">
                        {/* Existing Thumbnail */}
                        {existingThumbnail && !thumbnailPreview && (
                            <div>
                                <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                                    Thumbnail Saat Ini
                                </label>
                                <img
                                    src={existingThumbnail}
                                    alt="existing thumbnail"
                                    className="h-64 w-full object-cover rounded border border-gray-200 dark:border-gray-600"
                                />
                                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                    Upload thumbnail baru untuk mengganti
                                </p>
                            </div>
                        )}

                        {/* File Input */}
                        <div>
                            <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                                {existingThumbnail && !thumbnailPreview
                                    ? "Ganti Thumbnail"
                                    : "Upload Thumbnail"}
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleThumbnailChange}
                                className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {errors.thumbnail && (
                                <p className="mt-1 text-sm text-red-600">{errors.thumbnail}</p>
                            )}
                        </div>

                        {/* Image Cropper */}
                        {thumbnailPreview && (
                            <div>
                                <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                                    Crop Thumbnail
                                </label>
                                <ImageCropper
                                    image={thumbnailPreview}
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
                                    ✓ Thumbnail baru siap untuk disimpan
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