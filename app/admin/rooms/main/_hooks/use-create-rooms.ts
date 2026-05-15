"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createRoom } from "../_services/rooms.service";
import { ImageFile } from "@/components/admin/global/ImageUpload";

interface ErrorState {
    title_ind?: string;
    title_eng?: string;
    subtitle_ind?: string;
    subtitle_eng?: string;
    description_ind?: string;
    description_eng?: string;
    mattress_id?: string;
    number_guest?: string;
    spacious_room?: string;
    room_price?: string;
    is_recomendation?: string;
    tiers_id?: string;
    selected_facilities?: string;
    selected_policies?: string;
    selected_rules?: string;
    images?: string;
}

export function useCreateRoom() {
    const router = useRouter();

    // ────────────────────────────────────────
    // MAIN INFORMATION STATE
    // ────────────────────────────────────────
    const [title_ind, setTitleInd] = useState("");
    const [title_eng, setTitleEng] = useState("");
    const [subtitle_ind, setSubtitleInd] = useState("");
    const [subtitle_eng, setSubtitleEng] = useState("");
    const [description_ind, setDescriptionInd] = useState("");
    const [description_eng, setDescriptionEng] = useState("");

    // ────────────────────────────────────────
    // ROOM DETAILS STATE
    // ────────────────────────────────────────
    const [mattress_id, setMattressId] = useState("");
    const [number_guest, setNumberGuest] = useState<number | null>(null);
    const [spacious_room, setSpaciousRoom] = useState<number | null>(null);
    const [room_price, setRoomPrice] = useState<number | null>(null);
    const [is_recomendation, setIsRecommendation] = useState<boolean>(false);
    const [tiers_id, setTiersId] = useState("");
    // ────────────────────────────────────────
    // RELATIONS STATE
    // ────────────────────────────────────────
    const [selected_facilities, setSelectedFacilities] = useState<number[]>([]);
    const [selected_policies, setSelectedPolicies] = useState<number[]>([]);
    const [selected_rules, setSelectedRules] = useState<number[]>([]);

    // ────────────────────────────────────────
    // IMAGES STATE
    // ────────────────────────────────────────
    const [images, setImages] = useState<ImageFile[]>([]);

    // ────────────────────────────────────────
    // UI STATE
    // ────────────────────────────────────────
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ErrorState>({});

    /* =====================================
        UTILITY FUNCTIONS
    ===================================== */
    
    /**
     * Generate slug dari title_eng
     * Contoh: "Deluxe Room View" → "deluxe-room-view"
     */
    function generateSlug(text: string): string {
        return text
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-") // Replace spaces dengan dash
            .replace(/[^\w-]/g, "") // Remove special characters
            .replace(/-+/g, "-") // Replace multiple dashes dengan single dash
            .replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes
    }

    /**
     * Check jika sudah ada lebih dari 3 rekomendasi
     * Logic: Panggil API untuk count, atau bisa di-pass dari parent
     * Untuk sekarang, kita skip di frontend dan let backend handle
     */
    async function checkRecommendationLimit(): Promise<boolean> {
        // TODO: Call API to check current recommendation count
        // const res = await fetch("/api/admin/rooms/main/recommendations/count");
        // const data = await res.json();
        // return data.count < 3;
        
        // Untuk sekarang, return true (backend akan validate)
        return true;
    }

    /**
     * Validate images:
     * - Minimal 1 image
     * - Harus ada 1 banner
     * - Tidak boleh lebih dari 1 banner
     */
    function validateImages(): { valid: boolean; error?: string } {
        if (images.length === 0) {
            return { valid: false, error: "Upload minimal 1 foto kamar" };
        }

        const bannerCount = images.filter((img) => img.is_banner).length;
        if (bannerCount === 0) {
            return { valid: false, error: "Pilih 1 foto sebagai banner utama" };
        }

        if (bannerCount > 1) {
            return { valid: false, error: "Hanya boleh 1 foto sebagai banner" };
        }

        return { valid: true };
    }

    /* =====================================
        VALIDATION
    ===================================== */
    function validate(): boolean {
        const newErrors: ErrorState = {};
        let hasError = false;

        // Title validation
        if (!title_ind.trim()) {
            newErrors.title_ind = "Judul Kamar (Indonesia) wajib diisi";
            hasError = true;
        }

        if (!title_eng.trim()) {
            newErrors.title_eng = "Judul Kamar (English) wajib diisi";
            hasError = true;
        }

        // Subtitle validation
        if (!subtitle_ind.trim()) {
            newErrors.subtitle_ind = "Subjudul Kamar (Indonesia) wajib diisi";
            hasError = true;
        }

        if (!subtitle_eng.trim()) {
            newErrors.subtitle_eng = "Subjudul Kamar (English) wajib diisi";
            hasError = true;
        }

        // Description validation
        if (!description_ind.trim()) {
            newErrors.description_ind = "Deskripsi (Indonesia) wajib diisi";
            hasError = true;
        }

        if (!description_eng.trim()) {
            newErrors.description_eng = "Deskripsi (English) wajib diisi";
            hasError = true;
        }

        // Room details validation
        if (room_price === null || room_price < 0) {
            newErrors.room_price = "Harga kamar wajib diisi dan harus positif";
            hasError = true;
        }

        if (number_guest === null || number_guest < 1) {
            newErrors.number_guest = "Jumlah tamu wajib diisi minimal 1";
            hasError = true;
        }

        if (spacious_room === null || spacious_room <= 0) {
            newErrors.spacious_room = "Luas kamar wajib diisi dan harus positif";
            hasError = true;
        }

        if (!mattress_id.trim()) {
            newErrors.mattress_id = "Jenis kasur wajib dipilih";
            hasError = true;
        }

        // Relations validation
        if (selected_facilities.length === 0) {
            newErrors.selected_facilities = "Pilih minimal 1 fasilitas";
            hasError = true;
        }

        if (selected_policies.length === 0) {
            newErrors.selected_policies = "Pilih minimal 1 kebijakan";
            hasError = true;
        }

        if (selected_rules.length === 0) {
            newErrors.selected_rules = "Pilih minimal 1 aturan";
            hasError = true;
        }

        // Images validation (comprehensive)
        const imageValidation = validateImages();
        if (!imageValidation.valid) {
            newErrors.images = imageValidation.error;
            hasError = true;
        }

        if (!tiers_id) {
            newErrors.tiers_id = "Pilih tier kamar";
            hasError = true;
        }

        setErrors(newErrors);
        return !hasError;
    }

    /* =====================================
        RESET FORM
    ===================================== */
    function resetForm() {
        setTitleInd("");
        setTitleEng("");
        setSubtitleInd("");
        setSubtitleEng("");
        setDescriptionInd("");
        setDescriptionEng("");
        setMattressId("");
        setNumberGuest(null);
        setSpaciousRoom(null);
        setRoomPrice(null);
        setSelectedFacilities([]);
        setSelectedPolicies([]);
        setSelectedRules([]);
        setImages([]);
        setErrors({});
        setIsRecommendation(false);
        setTiersId("");
    }

    /* =====================================
        HANDLE SUBMIT
    ===================================== */
    async function handleSubmit() {
        // Clear previous errors
        setErrors({});

        // Validate form
        const isValid = validate();
        if (!isValid) return;

        // Check recommendation limit jika is_recomendation = true
        if (is_recomendation) {
            const canAddRecommendation = await checkRecommendationLimit();
            if (!canAddRecommendation) {
                toast.error("Sudah ada 3 kamar yang di-rekomendasi. Hapus salah satu untuk menambah baru.");
                return;
            }
        }

        try {
            setLoading(true);

            // Generate slug dari title_eng
            const generated_slug = generateSlug(title_eng);

            // Prepare form data
            const formData = new FormData();

            // Text fields
            formData.append("title_ind", title_ind);
            formData.append("title_eng", title_eng);
            formData.append("subtitle_ind", subtitle_ind);
            formData.append("subtitle_eng", subtitle_eng);
            formData.append("description_ind", description_ind);
            formData.append("description_eng", description_eng);
            formData.append("slug", generated_slug); // ← Auto-generated
            formData.append("is_recomendation", is_recomendation ? "1" : "0"); // ← Convert boolean to 1/0
            formData.append("tiers_id", tiers_id);
            // Room details
            formData.append("mattress_id", mattress_id);
            formData.append("number_guest", String(number_guest));
            formData.append("spacious_room", String(spacious_room || 0));
            formData.append("room_price", String(room_price));

            // Relations (array of IDs)
            selected_facilities.forEach((id) => {
                formData.append("facility_ids[]", String(id));
            });
            selected_policies.forEach((id) => {
                formData.append("policy_ids[]", String(id));
            });
            selected_rules.forEach((id) => {
                formData.append("rule_ids[]", String(id));
            });

            // Images with banner indicator
            images.forEach((img, index) => {
                formData.append(`images[${index}]`, img.file);
                formData.append(`images_banner[${index}]`, img.is_banner ? "1" : "0");
            });
            console.log("FormData entries:", Array.from(formData.entries()));
            const result = await createRoom(formData);

            if (result.success) {
                toast.success("Kamar berhasil ditambahkan");
                resetForm();

                setTimeout(() => {
                    router.push("/admin/rooms/main");
                }, 1000);
            } else {
                toast.error(result.message || "Gagal menyimpan data");

                // Jika server return validation errors
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
        // Main info
        title_ind,
        title_eng,
        subtitle_ind,
        subtitle_eng,
        description_ind,
        description_eng,
        is_recomendation,

        // Room details
        mattress_id,
        number_guest,
        spacious_room,
        room_price,

        // Relations
        selected_facilities,
        selected_policies,
        selected_rules,
        tiers_id,
        // Images
        images,

        // UI
        loading,
        errors,

        // Setters - Main info
        setTitleInd,
        setTitleEng,
        setSubtitleInd,
        setSubtitleEng,
        setDescriptionInd,
        setDescriptionEng,
        setIsRecommendation,

        // Setters - Room details
        setMattressId,
        setNumberGuest,
        setSpaciousRoom,
        setRoomPrice,

        // Setters - Relations
        setSelectedFacilities,
        setSelectedPolicies,
        setSelectedRules,
        setTiersId,
        // Setters - Images
        setImages,

        // Methods
        handleSubmit,
        generateSlug, // Export untuk testing atau preview di UI
    };
}