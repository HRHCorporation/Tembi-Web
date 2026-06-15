"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createVenue } from "../_services/vanue.service";

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

export function useCreateVenue() {
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
    const [venueKeys, setVenueKeys] = useState<VenueKey[]>([]);
    const [venueServices, setVenueServices] = useState<VenueService[]>([]);
    const [venueNotes, setVenueNotes] = useState<VenueNote[]>([]);

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ErrorState>({});

    // ✅ Generate slug from name_eng
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
            newErrors.images = "Minimal 1 gambar wajib diupload";
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

    function resetForm() {
        setNameInd("");
        setNameEng("");
        setDescriptionInd("");
        setDescriptionEng("");
        setSlug("");
        setSelectedFacilities([]);
        setImages([]);
        setVenueKeys([]);
        setVenueServices([]);
        setVenueNotes([]);
        setErrors({});
    }

    async function handleSubmit() {
        setErrors({});

        const isValid = validate();
        if (!isValid) return;

        try {
            setLoading(true);

            const result = await createVenue({
                name_ind,
                name_eng,
                description_ind,
                description_eng,
                slug,
                selected_facilities: selectedFacilities, // Kirim dalam format {facility_id, is_add_ons}[]
                images,
                venue_keys: venueKeys,
                venue_services: venueServices,
                venue_notes: venueNotes,
            });

            if (result.success) {
                toast.success("Venue berhasil ditambahkan");
                resetForm();

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
    };
}