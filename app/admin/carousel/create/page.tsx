"use client";

import { useRouter } from "next/navigation";
import { ImageCropper } from "../_components/image-cropper";
import { useCreateCarousel } from "../_hooks/use-create-carousel";

export default function CreateCarouselPage() {

    const router = useRouter();

    const {
        image,
        titleInd,
        titleEng,
        isActive,
        loading,
        errors,
        setErrors,
        setImage,
        setCroppedBlob,
        setTitleInd,
        setTitleEng,
        setIsActive,
        handleSubmit,
    } = useCreateCarousel();

    return (
        <div className="space-y-5">

            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Add Carousel
                </h1>

                <p className="text-gray-500 dark:text-gray-400">
                    Add new carousel
                </p>
            </div>

            {/* FORM */}
            <div className="rounded-lg border bg-white p-6 dark:bg-gray-800 dark:border-gray-700">

                <form
                    className="space-y-5"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >

                    <div className="grid grid-cols-2 gap-4">
                        {/* TITLE IND */}
                        <div>
                            <label className="mb-2 block font-medium  text-gray-700 dark:text-gray-300">
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
                            <label className="mb-2 block font-medium  text-gray-700 dark:text-gray-300">
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
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                            Image
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];

                                if (!file) return;

                                const maxSize = 15 * 1024 * 1024;

                                if (file.size > maxSize) {
                                    setErrors((prev) => ({
                                        ...prev,
                                        image: "Maximum file size is 15 MB",
                                    }));

                                    e.target.value = "";
                                    setImage(null);

                                    return;
                                }

                                setErrors((prev) => ({
                                    ...prev,
                                    image: "",
                                }));

                                setImage(URL.createObjectURL(file));
                            }}
                            className="w-full rounded border p-3
                            bg-white text-gray-900
                            dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />

                        <small className="mt-1 block text-gray-500 dark:text-gray-400">
                            Maximum file size: 15 MB. Supported formats: JPG, JPEG, PNG.
                        </small>

                        {image && (
                            <ImageCropper
                                image={image}
                                setCroppedBlob={setCroppedBlob}
                            />
                        )}

                        {errors.image && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.image}
                            </p>
                        )}
                    </div>

                    {/* STATUS */}
                    <div>
                        <label className="mb-2 block font-medium  text-gray-700 dark:text-gray-300">
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
                            onClick={() => router.back()}
                            className="rounded-lg border px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer
                                dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50 cursor-pointer
                                dark:bg-blue-500 dark:hover:bg-blue-600"
                        >
                            {loading ? "Menyimpan..." : "Save"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}