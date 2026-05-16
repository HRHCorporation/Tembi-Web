"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { getRoomById, updateRoom } from "../_services/rooms.service";
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

interface RoomData {
    id: number;
    title_ind: string;
    title_eng: string;
    subtitle_ind: string;
    subtitle_eng: string;
    description_ind: string;
    description_eng: string;
    matters_id: number;
    number_guest: number;
    spacious_room: number;
    room_price: number;
    slug: string;
    is_recomendation: boolean | number;
    tiers_id: number;
    facilities: Array<{ id: number }>;
    policies: Array<{ id: number }>;
    rules: Array<{ id: number }>;
    images: Array<{ id: number; url: string; is_banner: boolean | number }>;
}

interface ImageFileWithId extends ImageFile {
    id?: number;
}

export function useEditRoom() {
    const router = useRouter();
    const params = useParams();
    const roomId = params.id as string;



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
    const [images, setImages] = useState<ImageFileWithId[]>([]);
    const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);

    // ────────────────────────────────────────
    // UI STATE
    // ────────────────────────────────────────
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [errors, setErrors] = useState<ErrorState>({});

    // ════════════════════════════════════════
    // FETCH INITIAL DATA
    // ════════════════════════════════════════
    useEffect(() => {
        async function fetchRoom() {
            if (!roomId) return;

            try {
                setInitialLoading(true);
                const response = await getRoomById(Number(roomId));

                if (response.success && response.data) {
                    const room = response.data as unknown as RoomData;

                    // Set text fields
                    setTitleInd(room.title_ind || "");
                    setTitleEng(room.title_eng || "");
                    setSubtitleInd(room.subtitle_ind || "");
                    setSubtitleEng(room.subtitle_eng || "");
                    setDescriptionInd(room.description_ind || "");
                    setDescriptionEng(room.description_eng || "");

                    // Set room details
                    setMattressId(String(room.matters_id) || "");
                    setNumberGuest(room.number_guest || null);
                    setSpaciousRoom(room.spacious_room || null);
                    setRoomPrice(room.room_price || null);
                    setIsRecommendation(Boolean(room.is_recomendation) || false);
                    setTiersId(String(room.tiers_id) || "");

                    // Set relations
                    setSelectedFacilities(room.facilities?.map((f) => f.id) || []);
                    setSelectedPolicies(room.policies?.map((p) => p.id) || []);
                    setSelectedRules(room.rules?.map((r) => r.id) || []);

                    // Set images
                    setImages(
                        room.images?.map((img) => ({
                            file: undefined as unknown as File,
                            preview: img.url,
                            is_banner: Boolean(img.is_banner),
                            id: img.id,
                        })) || []
                    );
                } else {
                    toast.error("Gagal memuat data kamar");
                }
            } catch (error) {
                console.error("Error fetching room:", error);
                toast.error("Terjadi kesalahan saat memuat data");
            } finally {
                setInitialLoading(false);
            }
        }

        fetchRoom();
    }, [roomId]);

    /* =====================================
        VALIDATION
    ===================================== */
    function validate(): boolean {
        const newErrors: ErrorState = {};
        let hasError = false;

        if (!title_ind.trim()) {
            newErrors.title_ind = "Judul Kamar (Indonesia) wajib diisi";
            hasError = true;
        }
        if (!title_eng.trim()) {
            newErrors.title_eng = "Judul Kamar (English) wajib diisi";
            hasError = true;
        }
        if (!subtitle_ind.trim()) {
            newErrors.subtitle_ind = "Subjudul Kamar (Indonesia) wajib diisi";
            hasError = true;
        }
        if (!subtitle_eng.trim()) {
            newErrors.subtitle_eng = "Subjudul Kamar (English) wajib diisi";
            hasError = true;
        }
        if (!description_ind.trim()) {
            newErrors.description_ind = "Deskripsi (Indonesia) wajib diisi";
            hasError = true;
        }
        if (!description_eng.trim()) {
            newErrors.description_eng = "Deskripsi (English) wajib diisi";
            hasError = true;
        }
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
        if (images.length === 0) {
            newErrors.images = "Minimal harus ada 1 foto kamar";
            hasError = true;
        }
        const hasBanner = images.some((img) => img.is_banner);
        if (images.length > 0 && !hasBanner) {
            newErrors.images = "Pilih 1 foto sebagai banner utama";
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
        HANDLE SUBMIT
    ===================================== */
    async function handleSubmit() {
        setErrors({});

        const isValid = validate();
        if (!isValid) return;

        try {
            setLoading(true);

            const formData = new FormData();

            const bannerIndex = images.findIndex((img) => img.is_banner);
            const bannerImageId = bannerIndex !== -1 ? images[bannerIndex].id : null;

            // Text fields
            formData.append("title_ind", title_ind);
            formData.append("title_eng", title_eng);
            formData.append("subtitle_ind", subtitle_ind);
            formData.append("subtitle_eng", subtitle_eng);
            formData.append("description_ind", description_ind);
            formData.append("description_eng", description_eng);
            formData.append("is_recomendation", is_recomendation ? "1" : "0");
            formData.append("tiers_id", tiers_id);

            // Room details
            formData.append("mattress_id", mattress_id);
            formData.append("number_guest", String(number_guest));
            formData.append("spacious_room", String(spacious_room || 0));
            formData.append("room_price", String(room_price));

            // Relations
            selected_facilities.forEach((id) => {
                formData.append("facility_ids[]", String(id));
            });
            selected_policies.forEach((id) => {
                formData.append("policy_ids[]", String(id));
            });
            selected_rules.forEach((id) => {
                formData.append("rule_ids[]", String(id));
            });

            if (bannerImageId) {
                formData.append("banner_image_id", String(bannerImageId));
            }

            // Images - only new ones (with file)
            images.forEach((img, index) => {
                if (img.file) {
                    formData.append(`images[${index}]`, img.file);
                    formData.append(`images_banner[${index}]`, img.is_banner ? "1" : "0");
                }
            });

            // Deleted images
            deletedImageIds.forEach((id) => {
                formData.append("deleted_image_ids[]", String(id));
            });

            const result = await updateRoom(Number(roomId), formData);

            if (result.success) {
                toast.success("Kamar berhasil diperbarui");

                setTimeout(() => {
                    router.push("/admin/rooms/main");
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

    /* =====================================
        HANDLE DELETE IMAGE
    ===================================== */
    function handleDeleteImage(index: number) {
        const img = images[index];

        if (img.id) {
            setDeletedImageIds([...deletedImageIds, img.id]);
        }

        setImages(images.filter((_, i) => i !== index));
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
        deletedImageIds,

        // UI
        loading,
        initialLoading,
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
        handleDeleteImage,
    };
}