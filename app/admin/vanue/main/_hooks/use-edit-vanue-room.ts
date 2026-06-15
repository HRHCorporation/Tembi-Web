"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getVenueById, updateVenue } from "../_services/vanue.service";

interface VenueFacility {
    value: number;
    label: string;
}

// ✅ TAMBAHKAN INTERFACE INI
interface SelectedFacility {
    facility_id: number;
    is_add_ons: boolean;
}

interface VenueGalleryImage {
    file?: File;
    preview: string;
    is_banner: boolean;
    id?: number;
}

interface VenueKey {
    id?: number;
    icon: string;
    label_ind: string;
    label_eng: string;
    value_ind: string;
    value_eng: string;
}

interface VenueService {
    id?: number;
    name_service_ind: string;
    name_service_eng: string;
    description_ind: string;
    description_eng: string;
}

interface VenueNote {
    id?: number;
    description_ind: string;
    description_eng: string;
}

interface ErrorState {
    name_ind?: string;
    name_eng?: string;
    description_ind?: string;
    description_eng?: string;
    selected_facilities?: string;
    images?: string;
    venue_keys?: string;
    venue_services?: string;
    venue_notes?: string;
}

export function useEditVenue(id: string) {
    const router = useRouter();

    // ✅ Main fields
    const [name_ind, setNameInd] = useState("");
    const [name_eng, setNameEng] = useState("");
    const [description_ind, setDescriptionInd] = useState("");
    const [description_eng, setDescriptionEng] = useState("");
    const [slug, setSlug] = useState("");

    // ✅ Children fields - UBAH TIPE DATA selectedFacilities
    const [selectedFacilities, setSelectedFacilities] = useState<SelectedFacility[]>([]);
    const [images, setImages] = useState<VenueGalleryImage[]>([]);
    const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);
    const [venueKeys, setVenueKeys] = useState<VenueKey[]>([]);
    const [deletedKeyIds, setDeletedKeyIds] = useState<number[]>([]);
    const [venueServices, setVenueServices] = useState<VenueService[]>([]);
    const [deletedServiceIds, setDeletedServiceIds] = useState<number[]>([]);
    const [venueNotes, setVenueNotes] = useState<VenueNote[]>([]);
    const [deletedNoteIds, setDeletedNoteIds] = useState<number[]>([]);

    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [errors, setErrors] = useState<ErrorState>({});

    /* =====================================
        FETCH DETAIL
    ===================================== */
    async function fetchDetail() {
        try {
            setFetchLoading(true);
            const result = await getVenueById(Number(id));
            if (result.success) {
                const data = result.data as Record<string, unknown>;
                setNameInd((data.name_ind as string) || "");
                setNameEng((data.name_eng as string) || "");
                setDescriptionInd((data.description_ind as string) || "");
                setDescriptionEng((data.description_eng as string) || "");
                setSlug((data.slug as string) || "");

                // ✅ Set facilities dengan structure {facility_id, is_add_ons}
                const facilityData = data.selected_facilities as Array<{
                    facility_id: number;
                    is_add_ons: boolean;
                }> || [];
                
                setSelectedFacilities(
                    facilityData.map((item) => ({
                        facility_id: item.facility_id,
                        is_add_ons: Boolean(item.is_add_ons),
                    }))
                );

                // ✅ Set images
                const imageData = data.images as Array<{ id: number; image: string; is_banner: boolean }> || [];
                setImages(
                    imageData.map((img) => ({
                        preview: img.image,
                        is_banner: Boolean(img.is_banner),
                        id: img.id,
                    }))
                );

                // ✅ Set keys
                const keysData = data.venue_keys as VenueKey[] || [];
                setVenueKeys(keysData);

                // ✅ Set services
                const servicesData = data.venue_services as VenueService[] || [];
                setVenueServices(servicesData);

                // ✅ Set notes
                const notesData = data.venue_notes as VenueNote[] || [];
                setVenueNotes(notesData);
            } else {
                toast.error("Data tidak ditemukan");
                router.push("/admin/vanue/main");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Gagal mengambil data");
        } finally {
            setFetchLoading(false);
        }
    }

    useEffect(() => {
        if (id) fetchDetail();
    }, [id]);

    /* =====================================
        GENERATE SLUG FROM NAME_ENG
    ===================================== */
    const handleNameEngChange = (value: string) => {
        setNameEng(value);
        const generatedSlug = value
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "")
            .replace(/-+/g, "-")
            .replace(/^-+|-+$/g, "");
        setSlug(generatedSlug);
    };

    /* =====================================
        VALIDATION
    ===================================== */
    function validate(): boolean {
        const newErrors: ErrorState = {};
        let hasError = false;

        if (!name_ind?.trim()) {
            newErrors.name_ind = "Nama Indonesia wajib diisi";
            hasError = true;
        }

        if (!name_eng?.trim()) {
            newErrors.name_eng = "Nama English wajib diisi";
            hasError = true;
        }

        if (!description_ind?.trim()) {
            newErrors.description_ind = "Deskripsi Indonesia wajib diisi";
            hasError = true;
        }

        if (!description_eng?.trim()) {
            newErrors.description_eng = "Deskripsi English wajib diisi";
            hasError = true;
        }

        if (selectedFacilities.length === 0) {
            newErrors.selected_facilities = "Minimal 1 fasilitas wajib dipilih";
            hasError = true;
        }

        if (images.length === 0) {
            newErrors.images = "Minimal 1 gambar wajib ada";
            hasError = true;
        }

        const hasBanner = images.some((img) => img.is_banner);
        if (!hasBanner) {
            newErrors.images = "Minimal 1 gambar harus dijadikan banner";
            hasError = true;
        }

        if (venueKeys.length === 0) {
            newErrors.venue_keys = "Minimal 1 key wajib ditambahkan";
            hasError = true;
        }

        if (venueServices.length === 0) {
            newErrors.venue_services = "Minimal 1 service wajib ditambahkan";
            hasError = true;
        }

        if (venueNotes.length === 0) {
            newErrors.venue_notes = "Minimal 1 note wajib ditambahkan";
            hasError = true;
        }

        setErrors(newErrors);
        return !hasError;
    }

    /* =====================================
        HANDLE DELETE IMAGE
    ===================================== */
    function handleDeleteImage(index: number) {
        const image = images[index];
        if (image.id) {
            setDeletedImageIds([...deletedImageIds, image.id]);
        }
        setImages(images.filter((_, i) => i !== index));
    }

    /* =====================================
        HANDLE DELETE KEY
    ===================================== */
    function handleDeleteKey(index: number) {
        const key = venueKeys[index];
        if (key.id) {
            setDeletedKeyIds([...deletedKeyIds, key.id]);
        }
        setVenueKeys(venueKeys.filter((_, i) => i !== index));
    }

    /* =====================================
        HANDLE DELETE SERVICE
    ===================================== */
    function handleDeleteService(index: number) {
        const service = venueServices[index];
        if (service.id) {
            setDeletedServiceIds([...deletedServiceIds, service.id]);
        }
        setVenueServices(venueServices.filter((_, i) => i !== index));
    }

    /* =====================================
        HANDLE DELETE NOTE
    ===================================== */
    function handleDeleteNote(index: number) {
        const note = venueNotes[index];
        if (note.id) {
            setDeletedNoteIds([...deletedNoteIds, note.id]);
        }
        setVenueNotes(venueNotes.filter((_, i) => i !== index));
    }

    /* =====================================
        SUBMIT
    ===================================== */
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErrors({});

        const isValid = validate();
        if (!isValid) return;

        try {
            setLoading(true);

            const result = await updateVenue(Number(id), {
                name_ind,
                name_eng,
                description_ind,
                description_eng,
                slug,
                selected_facilities: selectedFacilities, // Kirim dalam format {facility_id, is_add_ons}[]
                images,
                deleted_image_ids: deletedImageIds,
                venue_keys: venueKeys,
                deleted_key_ids: deletedKeyIds,
                venue_services: venueServices,
                deleted_service_ids: deletedServiceIds,
                venue_notes: venueNotes,
                deleted_note_ids: deletedNoteIds,
            });

            if (result.success) {
                toast.success("Venue berhasil diperbarui");

                setTimeout(() => {
                    router.push("/admin/vanue/main");
                }, 1000);
            } else {
                toast.error(result.message || "Gagal menyimpan data");
                if (result.errors) {
                    setErrors(result.errors);
                }
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Terjadi kesalahan server");
        } finally {
            setLoading(false);
        }
    }

    return {
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
    };
}