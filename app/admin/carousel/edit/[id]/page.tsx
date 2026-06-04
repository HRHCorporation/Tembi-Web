"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ImageCropper } from "../../_components/image-cropper";
import { useEditCarousel } from "../../_hooks/use-edit-carousel";

export default function EditCarouselPage() {

    const params = useParams();
    const id = params.id as string;

    const {
        loading, fetchLoading,
        image, previewImage,
        titleInd, titleEng, isActive, errors,
        setImage, setCroppedBlob,
        setTitleInd, setTitleEng, setIsActive,
        handleSubmit,
    } = useEditCarousel(id);

    const router = useRouter();

    if (fetchLoading) return (
        <div className="p-10 text-center text-gray-500 dark:text-gray-400">
            Loading...
        </div>
    );

    return (
        <div className="space-y-5">

            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Edit Carousel
                </h1>

                <p className="text-gray-500 dark:text-gray-400">
                    Update data carousel
                </p>
            </div>

            {/* FORM */}
            <div className="rounded-lg border bg-white p-6
                dark:bg-gray-800 dark:border-gray-700">

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">


                        {/* TITLE IND */}
                        <div>
                            <label className="mb-2 block font-medium
                            text-gray-700 dark:text-gray-300">
                                Title Indonesia
                            </label>

                            <input
                                type="text"
                                value={titleInd}
                                onChange={(e) => setTitleInd(e.target.value)}
                                className="w-full rounded border p-3
                                bg-white text-gray-900
                                dark:bg-gray-700 dark:text-white dark:border-gray-600
                                focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter the title in Indonesian"
                            />

                            {errors.title_ind && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.title_ind}
                                </p>
                            )}
                        </div>

                        {/* TITLE ENG */}
                        <div>
                            <label className="mb-2 block font-medium
                            text-gray-700 dark:text-gray-300">
                                Title English
                            </label>

                            <input
                                type="text"
                                value={titleEng}
                                onChange={(e) => setTitleEng(e.target.value)}
                                className="w-full rounded border p-3
                                bg-white text-gray-900
                                dark:bg-gray-700 dark:text-white dark:border-gray-600
                                focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter the title in English"
                            />

                            {errors.title_eng && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.title_eng}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* IMAGE */}
                    <div>
                        <label className="mb-2 block font-medium
                            text-gray-700 dark:text-gray-300">
                            Image
                        </label>

                        {/* IMAGE LAMA */}
                        {!image && previewImage && (
                            <div className="mb-4">
                                <Image
                                    src={previewImage}
                                    alt="Preview"
                                    width={400}
                                    height={200}
                                    className="rounded-lg border dark:border-gray-600"
                                />
                            </div>
                        )}

                        {/* INPUT FILE */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                setImage(URL.createObjectURL(file));
                            }}
                            className="w-full rounded border p-3
                                bg-white text-gray-900
                                dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                        />

                        {/* CROPPER */}
                        {image && (
                            <ImageCropper
                                image={image}
                                setCroppedBlob={setCroppedBlob}
                            />
                        )}
                    </div>

                    {/* STATUS */}
                    <div>
                        <label className="mb-2 block font-medium
                            text-gray-700 dark:text-gray-300">
                            Status
                        </label>

                        <select
                            value={isActive}
                            onChange={(e) => setIsActive(e.target.value)}
                            className="w-full rounded border p-3
                                bg-white text-gray-900
                                dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        >
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </div>

                    {/* BUTTON */}
                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={() => router.push("/admin/carousel")}
                            className="rounded-lg border px-4 py-2 cursor-pointer
                                text-gray-700 hover:bg-gray-100
                                dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="rounded-lg px-4 py-2 text-white cursor-pointer disabled:opacity-50
                                bg-blue-600 hover:bg-blue-700
                                dark:bg-blue-500 dark:hover:bg-blue-600"
                        >
                            {loading ? "Updating..." : "Update"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}