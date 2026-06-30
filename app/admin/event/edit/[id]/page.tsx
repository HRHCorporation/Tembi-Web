"use client";

import { useParams } from "next/navigation";
import { FormPage } from "@/components/admin/global/FormPage";
import { FormActions } from "@/components/admin/global/FormActions";
import { useEditEvent } from "../../_hooks/use-edit-event";
import { CustomEditor } from "@/components/admin/global/Customeditornative";
import { ImageCropper } from "@/app/admin/carousel/_components/image-cropper";

export default function EditEventPage() {
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
        setErrors,
        setTitleInd,
        handleTitleEngChange,
        setDescriptionInd,
        setDescriptionEng,
        setThumbnailFile,
        setThumbnailPreview,
        setCroppedBlob,
        setExistingThumbnail,
        handleSubmit,
        hosted_by,
        setHostedBy,
        date_event,
        setDateEvent,
        time_event,
        setTimeEvent,
        location,
        setLocation
    } = useEditEvent(id);

    const handleThumbnailChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const maxSize = 15 * 1024 * 1024; // 15 MB

        if (file.size > maxSize) {
            setErrors((prev) => ({
                ...prev,
                thumbnail: "Maximum file size is 15 MB",
            }));

            e.target.value = "";
            setThumbnailFile(null);
            setThumbnailPreview("");

            return;
        }

        setErrors((prev) => ({
            ...prev,
            thumbnail: "",
        }));

        setThumbnailFile(file);

        const reader = new FileReader();

        reader.onload = (event) => {
            setThumbnailPreview(event.target?.result as string);
        };

        reader.readAsDataURL(file);
    };

    if (fetchLoading) {
        return (
            <FormPage title="Edit Event" description="Memuat data...">
                <div className="flex items-center justify-center py-12">
                    <div className="text-gray-600 dark:text-gray-400">Loading...</div>
                </div>
            </FormPage>
        );
    }

    return (
        <FormPage
            title="Edit Event"
            description="Perbarui artikel event"
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
                        Basic Information
                    </h2>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-5">
                            {/* Judul Indonesia */}
                            <div>
                                <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                                    Title (Indonesia)
                                </label>
                                <input
                                    type="text"
                                    value={title_ind}
                                    onChange={(e) => setTitleInd(e.target.value)}
                                    className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter the event title"
                                />
                                {errors.title_ind && (
                                    <p className="mt-1 text-sm text-red-600">{errors.title_ind}</p>
                                )}
                            </div>

                            {/* Judul English */}
                            <div>
                                <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                                    Title (English)
                                </label>
                                <input
                                    type="text"
                                    value={title_eng}
                                    onChange={(e) => handleTitleEngChange(e.target.value)}
                                    className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter event title"
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

                        {/* Hosted By */}
                        <div>
                            <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                                Hosted By
                            </label>
                            <input
                                type="text"
                                value={hosted_by}
                                onChange={(e) => setHostedBy(e.target.value)}
                                className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter name of event host"
                            />
                            {errors.hosted_by && (
                                <p className="mt-1 text-sm text-red-600">{errors.hosted_by}</p>
                            )}
                        </div>

                        {/* Date */}
                        <div>
                            <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                                Date Event
                            </label>
                            <input
                                type="date"
                                value={date_event}
                                onChange={(e) => setDateEvent(e.target.value)}
                                className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.date_event && (
                                <p className="mt-1 text-sm text-red-600">{errors.date_event}</p>
                            )}
                        </div>

                        {/* Time */}
                        <div>
                            <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                                Time Event
                            </label>
                            <input
                                type="time"
                                value={time_event}
                                onChange={(e) => setTimeEvent(e.target.value)}
                                className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.time_event && (
                                <p className="mt-1 text-sm text-red-600">{errors.time_event}</p>
                            )}
                        </div>

                        {/* Hosted By */}
                        <div>
                            <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                                Location
                            </label>
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter location"
                            />
                            {errors.location && (
                                <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                            )}
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
                            placeholder="Tulis konten event dalam bahasa Indonesia..."
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
                            placeholder="Write event content in English..."
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
                                    className="max-h-96 w-auto max-w-full rounded border border-gray-200 dark:border-gray-600"
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
                            <small className="mt-1 block text-gray-500 dark:text-gray-400">
                                Maximum file size: 15 MB. Supported formats: JPG, JPEG, PNG.
                            </small>
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
                    </div>
                </div>

                {/* ACTIONS */}
                <FormActions loading={loading} />
            </form>
        </FormPage>
    );
}