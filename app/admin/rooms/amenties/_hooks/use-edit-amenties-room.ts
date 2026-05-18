"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getAmentiesById, updateAmenties } from "../_services/amenties.service";

interface AmenitiesItem {
    id?: number;
    name_ind: string;
    name_eng: string;
}

interface ErrorState {
    name_ind?: string;
    name_eng?: string;
    icon?: string;
    is_addition?: string;
    amenities?: string;
}

export function useEditAmentiesRoom(id: string) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [name_ind, setName_ind] = useState("");
    const [name_eng, setName_eng] = useState("");
    const [icon, setIcon] = useState("");
    const [is_addition, setIsAddition] = useState("");
    
    // ✅ Amenities state
    const [amenities, setAmenities] = useState<AmenitiesItem[]>([]);
    const [deletedAmenityIds, setDeletedAmenityIds] = useState<number[]>([]);
    
    const [errors, setErrors] = useState<ErrorState>({});

    /* =====================================
        FETCH DETAIL
    ===================================== */
    async function fetchDetail() {
        try {
            setFetchLoading(true);
            const result = await getAmentiesById(Number(id));
            if (result.success) {
                const data = result.data;
                setName_ind(data.name_ind);
                setName_eng(data.name_eng);
                setIcon(data.icon);
                setIsAddition(String(data.is_addition));
                
                // ✅ Set amenities from response
                setAmenities(data.amenities || []);
            } else {
                toast.error("Data tidak ditemukan");
                router.push("/admin/rooms/amenties");
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
        VALIDATION
    ===================================== */
    function validate(): boolean {
        const newErrors: ErrorState = {};
        let hasError = false;

        if (!name_ind?.trim()) {
            newErrors.name_ind = "Nama fasilitas (Indonesian) harus diisi";
            hasError = true;
        }
        if (!name_eng?.trim()) {
            newErrors.name_eng = "Nama fasilitas (English) harus diisi";
            hasError = true;
        }
        if (!icon?.trim()) {
            newErrors.icon = "Ikon fasilitas harus diisi";
            hasError = true;
        }
        if (!is_addition) {
            newErrors.is_addition = "Status tambahan fasilitas harus diisi";
            hasError = true;
        }
        
        // ✅ Validate amenities
        if (amenities.length === 0) {
            newErrors.amenities = "Minimal 1 amenities wajib ditambahkan";
            hasError = true;
        }

        setErrors(newErrors);
        return !hasError;
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

            const result = await updateAmenties(Number(id), {
                name_ind,
                name_eng,
                icon,
                is_addition,
                amenities,  // ✅ Include amenities
                deleted_amenity_ids: deletedAmenityIds,  // ✅ Include deleted IDs
            });

            if (result.success) {
                toast.success("Fasilitas berhasil diperbarui");
                setTimeout(() => {
                    router.push("/admin/rooms/amenties");
                }, 1000);
            } else {
                toast.error(result.message || "Gagal memperbarui fasilitas");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Gagal memperbarui fasilitas");
        } finally {
            setLoading(false);
        }
    }

    // ✅ Handle delete amenity
    function handleDeleteAmenity(index: number) {
        const amenity = amenities[index];
        
        // Track deleted ID if existing amenity
        if (amenity.id) {
            setDeletedAmenityIds([...deletedAmenityIds, amenity.id]);
        }
        
        // Remove dari array
        setAmenities(amenities.filter((_, i) => i !== index));
    }

    return {
        name_ind,
        setName_ind,
        name_eng,
        setName_eng,
        icon,
        setIcon,
        is_addition,
        setIsAddition,
        amenities,  // ✅ Export
        setAmenities,  // ✅ Export
        loading,
        errors,
        handleSubmit,
        fetchLoading,
        handleDeleteAmenity,  // ✅ Export
    };
}