"use client";

import { FormPage } from "@/components/admin/global/FormPage";
import { FormActions } from "@/components/admin/global/FormActions";
import { useCreateCatering } from "../_hooks/use-create-catering-room";
import { useOptionList } from "../_hooks/use-option-list";
import { TagInput } from "@/components/admin/global/TagInput";
import { ImageCropper } from "@/app/admin/carousel/_components/image-cropper";

export default function CreateCateringPage() {
    const { type_catering_service } = useOptionList();
    const {
        type_catering_service_id,
        name_ind,
        name_eng,
        description_ind,
        description_eng,
        minimum_pax,
        hours_service_min,
        hours_service_max,
        title_menu_ind,
        title_menu_eng,
        description_menu_ind,
        description_menu_eng,
        description_card_ind,
        description_card_eng,
        foodPackagesPrimary,
        loading,
        errors,
        setTypeCateringServiceId,
        setNameInd,
        setNameEng,
        setDescriptionInd,
        setDescriptionEng,
        setMinimumPax,
        setHoursServiceMin,
        setHoursServiceMax,
        setTitleMenuInd,
        setTitleMenuEng,
        setDescriptionMenuInd,
        setDescriptionMenuEng,
        setDescriptionCardInd,
        setDescriptionCardEng,
        setFoodPackagesPrimary,
        handleSubmit,
        setSubtitleMenuInd,
        setSubtitleMenuEng,
        subtitle_menu_ind,
        subtitle_menu_eng,
        image,
        setImage,
        setCroppedBlob,
        description_menu_highlight_ind,
        description_menu_highlight_eng,
        setDescriptionMenuHighlightInd,
        setDescriptionMenuHighlightEng
    } = useCreateCatering();

    return (
        <FormPage
            title="Tambah Food Package"
            description="Tambahkan data Food Package baru"
        >
            <form
                className="space-y-5"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >

                <div>
                    <label className="mb-2 block font-medium  text-gray-700 dark:text-gray-300">
                        Image
                    </label>

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
                                                dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />

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
                {/* Jenis Catering */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Jenis Catering
                    </label>
                    <select
                        value={type_catering_service_id}
                        onChange={(e) => setTypeCateringServiceId(e.target.value)}
                        className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Pilih jenis catering...</option>
                        {type_catering_service.map((m) => (
                            <option key={m.value} value={m.value}>{m.label}</option>
                        ))}
                    </select>
                    {errors.type_catering_service_id && (
                        <p className="mt-1 text-sm text-red-600">{errors.type_catering_service_id}</p>
                    )}
                </div>

                {/* Nama Indonesia */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Nama Food Package (Indonesia)
                    </label>
                    <input
                        type="text"
                        value={name_ind}
                        onChange={(e) => setNameInd(e.target.value)}
                        className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Masukkan nama food package"
                    />
                    {errors.name_ind && (
                        <p className="mt-1 text-sm text-red-600">{errors.name_ind}</p>
                    )}
                </div>

                {/* Nama English */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Nama Food Package (English)
                    </label>
                    <input
                        type="text"
                        value={name_eng}
                        onChange={(e) => setNameEng(e.target.value)}
                        className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter food package name"
                    />
                    {errors.name_eng && (
                        <p className="mt-1 text-sm text-red-600">{errors.name_eng}</p>
                    )}
                </div>

                {/* Deskripsi Indonesia */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Deskripsi (Indonesia)
                    </label>
                    <textarea
                        value={description_ind}
                        onChange={(e) => setDescriptionInd(e.target.value)}
                        className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Masukkan deskripsi food package"
                        rows={4}
                    />
                    {errors.description_ind && (
                        <p className="mt-1 text-sm text-red-600">{errors.description_ind}</p>
                    )}
                </div>

                {/* Deskripsi English */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Deskripsi (English)
                    </label>
                    <textarea
                        value={description_eng}
                        onChange={(e) => setDescriptionEng(e.target.value)}
                        className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter food package description"
                        rows={4}
                    />
                    {errors.description_eng && (
                        <p className="mt-1 text-sm text-red-600">{errors.description_eng}</p>
                    )}
                </div>

                {/* Minimum Pax */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Minimum Pax
                    </label>
                    <input
                        type="number"
                        value={minimum_pax ?? ""}
                        onChange={(e) => setMinimumPax(e.target.value ? Number(e.target.value) : null)}
                        className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter minimum pax"
                    />
                    {errors.minimum_pax && (
                        <p className="mt-1 text-sm text-red-600">{errors.minimum_pax}</p>
                    )}
                </div>

                {/* Hours of Service */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Hours of Service
                    </label>
                    <div className="flex gap-3">
                        <div className="flex-1">
                            <input
                                type="number"
                                value={hours_service_min ?? ""}
                                onChange={(e) => setHoursServiceMin(e.target.value ? Number(e.target.value) : null)}
                                className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Min hours"
                            />
                        </div>
                        <div className="flex-1">
                            <input
                                type="number"
                                value={hours_service_max ?? ""}
                                onChange={(e) => setHoursServiceMax(e.target.value ? Number(e.target.value) : null)}
                                className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Max hours"
                            />
                        </div>
                    </div>
                    {(errors.hours_service_min || errors.hours_service_max) && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.hours_service_min || errors.hours_service_max}
                        </p>
                    )}
                </div>

                {/* Title Menu Indonesia */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Title Menu (Indonesia)
                    </label>
                    <input
                        type="text"
                        value={title_menu_ind}
                        onChange={(e) => setTitleMenuInd(e.target.value)}
                        className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Masukkan title menu"
                    />
                    {errors.title_menu_ind && (
                        <p className="mt-1 text-sm text-red-600">{errors.title_menu_ind}</p>
                    )}
                </div>

                {/* Title Menu English */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Title Menu (English)
                    </label>
                    <input
                        type="text"
                        value={title_menu_eng}
                        onChange={(e) => setTitleMenuEng(e.target.value)}
                        className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter menu title"
                    />
                    {errors.title_menu_eng && (
                        <p className="mt-1 text-sm text-red-600">{errors.title_menu_eng}</p>
                    )}
                </div>

                {/* Subtitle Menu Indonesia */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Subtitle Menu (Indonesia)
                    </label>
                    <input
                        type="text"
                        value={subtitle_menu_ind}
                        onChange={(e) => setSubtitleMenuInd(e.target.value)}
                        className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Masukkan subtitle menu"
                    />
                    {errors.subtitle_menu_ind && (
                        <p className="mt-1 text-sm text-red-600">{errors.subtitle_menu_ind}</p>
                    )}
                </div>

                {/* Subtitle Menu English */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Subtitle Menu (English)
                    </label>
                    <input
                        type="text"
                        value={subtitle_menu_eng}
                        onChange={(e) => setSubtitleMenuEng(e.target.value)}
                        className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter subtitle menu"
                    />
                    {errors.subtitle_menu_eng && (
                        <p className="mt-1 text-sm text-red-600">{errors.subtitle_menu_eng}</p>
                    )}
                </div>

                {/* Description Menu Indonesia */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Deskripsi Menu (Indonesia)
                    </label>
                    <textarea
                        value={description_menu_ind}
                        onChange={(e) => setDescriptionMenuInd(e.target.value)}
                        className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Masukkan deskripsi menu"
                        rows={4}
                    />
                    {errors.description_menu_ind && (
                        <p className="mt-1 text-sm text-red-600">{errors.description_menu_ind}</p>
                    )}
                </div>

                {/* Description Menu English */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Deskripsi Menu (English)
                    </label>
                    <textarea
                        value={description_menu_eng}
                        onChange={(e) => setDescriptionMenuEng(e.target.value)}
                        className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter menu description"
                        rows={4}
                    />
                    {errors.description_menu_eng && (
                        <p className="mt-1 text-sm text-red-600">{errors.description_menu_eng}</p>
                    )}
                </div>

                {/* Description Card Indonesia */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Deskripsi Card (Indonesia)
                    </label>
                    <textarea
                        value={description_card_ind}
                        onChange={(e) => setDescriptionCardInd(e.target.value)}
                        className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Masukkan deskripsi card"
                        rows={4}
                    />
                    {errors.description_card_ind && (
                        <p className="mt-1 text-sm text-red-600">{errors.description_card_ind}</p>
                    )}
                </div>

                {/* Description Card English */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Deskripsi Card (English)
                    </label>
                    <textarea
                        value={description_card_eng}
                        onChange={(e) => setDescriptionCardEng(e.target.value)}
                        className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter card description"
                        rows={4}
                    />
                    {errors.description_card_eng && (
                        <p className="mt-1 text-sm text-red-600">{errors.description_card_eng}</p>
                    )}
                </div>

                {/* Description Menu Highlight Indonesia */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Deskripsi Menu Highlight (Indonesia)
                    </label>
                    <input
                        type="text"
                        value={description_menu_highlight_ind}
                        onChange={(e) => setDescriptionMenuHighlightInd(e.target.value)}
                        className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter description menu highlight"
                    />
                    {errors.description_menu_highlight_ind && (
                        <p className="mt-1 text-sm text-red-600">{errors.description_menu_highlight_ind}</p>
                    )}
                </div>

                {/* Description Menu Highlight English */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Deskripsi Menu Highlight (English)
                    </label>
                    <input
                        type="text"
                        value={description_menu_highlight_eng}
                        onChange={(e) => setDescriptionMenuHighlightEng(e.target.value)}
                        className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter description menu highlight"
                    />
                    {errors.description_menu_highlight_eng && (
                        <p className="mt-1 text-sm text-red-600">{errors.description_menu_highlight_eng}</p>
                    )}
                </div>

                {/* Food Package Primary Tags */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Food Package Primary (Indonesia & English)
                    </label>
                    <TagInput
                        value={foodPackagesPrimary}
                        onChange={setFoodPackagesPrimary}
                        placeholderInd="Masukkan nama food package primary (Indonesia) lalu Enter"
                        placeholderEng="Enter food package primary name (English) then Tab"
                        error={errors.food_packages_primary}
                    />
                </div>

                {/* ACTIONS */}
                <FormActions loading={loading} />
            </form>
        </FormPage>
    );
}