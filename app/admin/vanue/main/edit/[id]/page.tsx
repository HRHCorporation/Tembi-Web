"use client";

import { useParams } from "next/navigation";
import { FormPage } from "@/components/admin/global/FormPage";
import { FormActions } from "@/components/admin/global/FormActions";
import { useEditVenue } from "../../_hooks/use-edit-vanue-room";
import { useVenueFacilities } from "../../_hooks/use-venue-facilities";
import { FacilitySelector } from "@/components/admin/global/FacilitySelector";
import { ImageUploadVenue } from "@/components/admin/global/ImageUploadVenue";
import { VenueKeysManager } from "@/components/admin/global/VenueKeysManager";
import { VenueServicesManager } from "@/components/admin/global/VenueServicesManager";
import { VenueNotesManager } from "@/components/admin/global/VenueNotesManager";

export default function EditVenuePage() {
    const params = useParams();
    const id = params.id as string;

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
        fetchLoading,
        errors,
        setErrors,
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
        handleDeleteImage,
        handleDeleteKey,
        handleDeleteService,
        handleDeleteNote,
    } = useEditVenue(id);

    const { facilities, loading: facilitiesLoading } = useVenueFacilities();

    if (fetchLoading) {
        return (
            <FormPage title="Edit Venue" description="Memuat data...">
                <div className="flex items-center justify-center py-12">
                    <div className="text-gray-600 dark:text-gray-400">Loading...</div>
                </div>
            </FormPage>
        );
    }

    return (
        <FormPage
            title="Edit Venue"
            description="Perbarui data Venue"
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

                    {/* Nama Indonesia */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                                    Venue Name (Indonesia)
                                </label>
                                <input
                                    type="text"
                                    value={name_ind}
                                    onChange={(e) => setNameInd(e.target.value)}
                                    className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter venue name"
                                />
                                {errors.name_ind && (
                                    <p className="mt-1 text-sm text-red-600">{errors.name_ind}</p>
                                )}
                            </div>

                            {/* Nama English */}
                            <div>
                                <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                                    Venue Name (English)
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
                            <div className="hidden">
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
                                    Venue Description (Indonesia)
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
                                    Venue Description (English)
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
                        <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
                            Pilih fasilitas yang tersedia dan tandai mana yang merupakan fasilitas tambahan (add-ons)
                        </p>
                        <FacilitySelector
                            facilities={facilities}
                            value={selectedFacilities}
                            onChange={setSelectedFacilities}
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
                        Upload foto venue. Klik Set Banner untuk menandai foto utama. Maksimal 10 foto @ 30 MB per foto.
                    </p>
                    <ImageUploadVenue
                        value={images}
                        onChange={setImages}
                        onDelete={handleDeleteImage}
                        error={errors.images}
                    />
                </div>

                {/* ===== VENUE KEYS ===== */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <VenueKeysManager
                        value={venueKeys}
                        onChange={setVenueKeys}
                        onDelete={handleDeleteKey}
                        error={errors.venue_keys}
                    />
                </div>

                {/* ===== VENUE SERVICES ===== */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <VenueServicesManager
                        value={venueServices}
                        onChange={setVenueServices}
                        onDelete={handleDeleteService}
                        error={errors.venue_services}
                    />
                </div>

                {/* ===== VENUE NOTES ===== */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <VenueNotesManager
                        value={venueNotes}
                        onChange={setVenueNotes}
                        onDelete={handleDeleteNote}
                        error={errors.venue_notes}
                    />
                </div>

                {/* ACTIONS */}
                <FormActions loading={loading} />
            </form>
        </FormPage>
    );
}