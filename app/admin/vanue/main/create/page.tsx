"use client";

import { FormPage } from "@/components/admin/global/FormPage";
import { FormActions } from "@/components/admin/global/FormActions";
import { useCreateVenue } from "../_hooks/use-create-vanue-room";
import { useVenueFacilities } from "../_hooks/use-venue-facilities";
import { MultiSelect } from "@/components/admin/global/MultiSelect";
import { ImageUploadVenue } from "@/components/admin/global/ImageUploadVenue";
import { VenueKeysManager } from "@/components/admin/global/VenueKeysManager";
import { VenueServicesManager } from "@/components/admin/global/VenueServicesManager";
import { VenueNotesManager } from "@/components/admin/global/VenueNotesManager";

export default function CreateVenuePage() {
    const {
        name_ind,
        name_eng,
        description_ind,
        description_eng,
        slug,
        selectedFacilities,
        images,
        venueKeys,
        venueServices,
        venueNotes,
        loading,
        errors,
        setNameInd,
        handleNameEngChange,
        setDescriptionInd,
        setDescriptionEng,
        setSelectedFacilities,
        setImages,
        setVenueKeys,
        setVenueServices,
        setVenueNotes,
        handleSubmit,
    } = useCreateVenue();

    const { facilities, loading: facilitiesLoading } = useVenueFacilities();

    return (
        <FormPage
            title="Tambah Venue"
            description="Tambahkan data Venue baru"
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
                        Informasi Dasar
                    </h2>

                    {/* Nama Indonesia */}
                    <div className="space-y-4">
                        <div>
                            <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                                Nama (Indonesia)
                            </label>
                            <input
                                type="text"
                                value={name_ind}
                                onChange={(e) => setNameInd(e.target.value)}
                                className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Masukkan nama venue"
                            />
                            {errors.name_ind && (
                                <p className="mt-1 text-sm text-red-600">{errors.name_ind}</p>
                            )}
                        </div>

                        {/* Nama English */}
                        <div>
                            <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                                Nama (English)
                            </label>
                            <input
                                type="text"
                                value={name_eng}
                                onChange={(e) => handleNameEngChange(e.target.value)}
                                className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter venue name"
                            />
                            {errors.name_eng && (
                                <p className="mt-1 text-sm text-red-600">{errors.name_eng}</p>
                            )}
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
                                placeholder="Auto-generated from English name"
                            />
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
                                placeholder="Masukkan deskripsi venue"
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
                                placeholder="Enter venue description"
                                rows={4}
                            />
                            {errors.description_eng && (
                                <p className="mt-1 text-sm text-red-600">{errors.description_eng}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* ===== FACILITIES ===== */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                        Fasilitas
                    </h2>

                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                            Pilih Fasilitas
                        </label>
                        <MultiSelect
                            options={facilities}
                            value={selectedFacilities}
                            onChange={setSelectedFacilities}
                            placeholder="Pilih fasilitas..."
                            error={errors.selected_facilities}
                        />
                    </div>
                </div>

                {/* ===== GALLERY ===== */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                        Galeri Foto
                    </h2>

                    <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">
                        Upload foto venue. Klik Set Banner untuk menandai foto utama. Maksimal 6 foto @ 5 MB per foto.
                    </p>
                    <ImageUploadVenue
                        value={images}
                        onChange={setImages}
                        error={errors.images}
                    />
                </div>

                {/* ===== VENUE KEYS ===== */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <VenueKeysManager
                        value={venueKeys}
                        onChange={setVenueKeys}
                        error={errors.venue_keys}
                    />
                </div>

                {/* ===== VENUE SERVICES ===== */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <VenueServicesManager
                        value={venueServices}
                        onChange={setVenueServices}
                        error={errors.venue_services}
                    />
                </div>

                {/* ===== VENUE NOTES ===== */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <VenueNotesManager
                        value={venueNotes}
                        onChange={setVenueNotes}
                        error={errors.venue_notes}
                    />
                </div>

                {/* ACTIONS */}
                <FormActions loading={loading} />
            </form>
        </FormPage>
    );
}