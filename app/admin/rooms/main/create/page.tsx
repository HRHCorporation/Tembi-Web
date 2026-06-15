"use client";

import { FormPage } from "@/components/admin/global/FormPage";
import { FormActions } from "@/components/admin/global/FormActions";
import { MultiSelect } from "@/components/admin/global/MultiSelect";
import { ImageUpload } from "@/components/admin/global/ImageUpload";
import { useCreateRoom } from "../_hooks/use-create-rooms";
import { useOptionList } from "../_hooks/use-option-list";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

interface EditorToolbarProps {
    editor: Editor | null;
}

const EditorToolbar = ({ editor }: EditorToolbarProps) => {
    if (!editor) return null;
    return (
        <div className="flex gap-1 mb-2 p-2 bg-gray-100 dark:bg-gray-700 rounded border flex-wrap">
            <button onClick={() => editor.chain().focus().toggleBold().run()} className={`px-2 py-1 rounded text-sm ${editor.isActive("bold") ? "bg-blue-500 text-white" : "bg-white dark:bg-gray-600"}`}><strong>B</strong></button>
            <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`px-2 py-1 rounded text-sm ${editor.isActive("italic") ? "bg-blue-500 text-white" : "bg-white dark:bg-gray-600"}`}><em>I</em></button>
            <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`px-2 py-1 rounded text-sm ${editor.isActive("bulletList") ? "bg-blue-500 text-white" : "bg-white dark:bg-gray-600"}`}>• List</button>
            <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`px-2 py-1 rounded text-sm ${editor.isActive("heading", { level: 2 }) ? "bg-blue-500 text-white" : "bg-white dark:bg-gray-600"}`}>H2</button>
            <button onClick={() => editor.chain().focus().clearNodes().run()} className="px-2 py-1 rounded text-sm bg-white dark:bg-gray-600">Clear</button>
        </div>
    );
};

export default function CreateRoomPage() {
    const { mattresses, facilities, policies, rules, tiers } = useOptionList();

    const {
        title_ind, title_eng, subtitle_ind, subtitle_eng,
        description_ind, description_eng, mattress_id, number_guest,
        spacious_room, room_price, is_recomendation, tiers_id,
        selected_facilities, selected_policies, selected_rules,
        images, loading, errors,
        setTitleInd, setTitleEng, setSubtitleInd, setSubtitleEng,
        setDescriptionInd, setDescriptionEng, setMattressId, setNumberGuest,
        setSpaciousRoom, setRoomPrice, setIsRecommendation, setTiersId,
        setSelectedFacilities, setSelectedPolicies, setSelectedRules,
        setImages, handleSubmit,
    } = useCreateRoom();

    const editorInd = useEditor({
        extensions: [StarterKit, Link.configure({ openOnClick: false })],
        content: description_ind,
        onUpdate: ({ editor }) => setDescriptionInd(editor.getHTML()),
    });

    const editorEng = useEditor({
        extensions: [StarterKit, Link.configure({ openOnClick: false })],
        content: description_eng,
        onUpdate: ({ editor }) => setDescriptionEng(editor.getHTML()),
    });

    return (
        <FormPage title="Add Room" description="Add new Room data">
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                
                {/* ── INFORMASI UTAMA ──────────────────────────────────── */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">Title (Indonesia)</label>
                        <input type="text" value={title_ind} onChange={(e) => setTitleInd(e.target.value)} className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Masukkan title kamar" />
                        {errors.title_ind && <p className="mt-1 text-sm text-red-600">{errors.title_ind}</p>}
                    </div>
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">Title (English)</label>
                        <input type="text" value={title_eng} onChange={(e) => setTitleEng(e.target.value)} className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter room title" />
                        {errors.title_eng && <p className="mt-1 text-sm text-red-600">{errors.title_eng}</p>}
                    </div>
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">Subtitle (Indonesia)</label>
                        <input type="text" value={subtitle_ind} onChange={(e) => setSubtitleInd(e.target.value)} className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Masukkan subtitle kamar" />
                        {errors.subtitle_ind && <p className="mt-1 text-sm text-red-600">{errors.subtitle_ind}</p>}
                    </div>
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">Subtitle (English)</label>
                        <input type="text" value={subtitle_eng} onChange={(e) => setSubtitleEng(e.target.value)} className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter room subtitle" />
                        {errors.subtitle_eng && <p className="mt-1 text-sm text-red-600">{errors.subtitle_eng}</p>}
                    </div>
                </div>

                {/* ── DESKRIPSI ────────────────────────────────────────── */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">Deskripsi (Indonesia)</label>
                        <EditorToolbar editor={editorInd} />
                        <EditorContent editor={editorInd} className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 [&_.ProseMirror]:min-h-[200px] [&_.ProseMirror]:outline-none" />
                        {errors.description_ind && <p className="mt-2 text-sm text-red-600">{errors.description_ind}</p>}
                    </div>
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">Deskripsi (English)</label>
                        <EditorToolbar editor={editorEng} />
                        <EditorContent editor={editorEng} className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 [&_.ProseMirror]:min-h-[200px] [&_.ProseMirror]:outline-none" />
                        {errors.description_eng && <p className="mt-2 text-sm text-red-600">{errors.description_eng}</p>}
                    </div>
                </div>

                {/* ── DETAIL KAMAR ─────────────────────────────────────── */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">Price (Rp)</label>
                        <input type="text" value={room_price ? new Intl.NumberFormat('id-ID').format(room_price) : ""} onChange={(e) => { const value = e.target.value.replace(/\D/g, ""); setRoomPrice(value ? Number(value) : null); }} className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0" />
                        {errors.room_price && <p className="mt-1 text-sm text-red-600">{errors.room_price}</p>}
                    </div>
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">Number of Guest</label>
                        <input type="number" value={number_guest ?? ""} onChange={(e) => setNumberGuest(Number(e.target.value))} className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0" />
                        {errors.number_guest && <p className="mt-1 text-sm text-red-600">{errors.number_guest}</p>}
                    </div>
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">Room Size (m²)</label>
                        <input type="number" step="any" value={spacious_room ?? ""} onChange={(e) => setSpaciousRoom(Number(e.target.value))} className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0" />
                        {errors.spacious_room && <p className="mt-1 text-sm text-red-600">{errors.spacious_room}</p>}
                    </div>
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">Matterss Type</label>
                        <select value={mattress_id} onChange={(e) => setMattressId(e.target.value)} className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Pilih kasur...</option>
                            {mattresses.map((m) => (<option key={m.value} value={m.value}>{m.label}</option>))}
                        </select>
                        {errors.mattress_id && <p className="mt-1 text-sm text-red-600">{errors.mattress_id}</p>}
                    </div>
                </div>

                {/* ── RELASI MULTI-SELECT ───────────────────────────────── */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">Facility</label>
                        <MultiSelect options={facilities} value={selected_facilities} onChange={setSelectedFacilities} placeholder="Pilih fasilitas..." error={errors.selected_facilities} />
                    </div>
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">Policy</label>
                        <MultiSelect options={policies} value={selected_policies} onChange={setSelectedPolicies} placeholder="Pilih kebijakan..." error={errors.selected_policies} />
                    </div>
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">Room Rules</label>
                        <MultiSelect options={rules} value={selected_rules} onChange={setSelectedRules} placeholder="Pilih peraturan..." error={errors.selected_rules} />
                    </div>
                </div>

                {/* ── REKOMENDASI & TIER */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">Recommendation</label>
                        <select value={is_recomendation ? "1" : "0"} onChange={(e) => setIsRecommendation(e.target.value === "1")} className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="0">Bukan Rekomendasi</option>
                            <option value="1">Rekomendasi</option>
                        </select>
                        {errors.is_recomendation && <p className="mt-1 text-sm text-red-600">{errors.is_recomendation}</p>}
                    </div>
                    <div>
                        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">Room Tier</label>
                        <select value={tiers_id} onChange={(e) => setTiersId(e.target.value)} className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Pilih Tier</option>
                            {tiers.map((t) => (<option key={t.value} value={t.value}>{t.label}</option>))}
                        </select>
                        {errors.tiers_id && <p className="mt-1 text-sm text-red-600">{errors.tiers_id}</p>}
                    </div>
                </div>

                {/* ── GALERI ───────────────────────────────────────────── */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">Photo Gallery</label>
                    <p className="mb-2 text-xs text-gray-400 dark:text-gray-500">Upload a photo of your room. Click Set Banner to highlight the main photo. Maximum 10 photos, 30 MB each.</p>
                    <ImageUpload value={images} onChange={setImages} error={errors.images} />
                </div>

                {/* ── ACTIONS ──────────────────────────────────────────── */}
                <FormActions loading={loading} />
            </form>
        </FormPage>
    );
}