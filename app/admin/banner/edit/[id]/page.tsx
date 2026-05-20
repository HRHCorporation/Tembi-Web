"use client";

import { useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useEditBannerRoom } from "../../_hooks/use-edit-banner-page";
import { FormPage } from "@/components/admin/global/FormPage";
import { FormActions } from "@/components/admin/global/FormActions";
import { ImageCropper } from "@/app/admin/carousel/_components/image-cropper";
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
            <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`px-2 py-1 rounded text-sm ${editor.isActive("bold") ? "bg-blue-500 text-white" : "bg-white dark:bg-gray-600"}`}><strong>B</strong></button>
            <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`px-2 py-1 rounded text-sm ${editor.isActive("italic") ? "bg-blue-500 text-white" : "bg-white dark:bg-gray-600"}`}><em>I</em></button>
            <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`px-2 py-1 rounded text-sm ${editor.isActive("bulletList") ? "bg-blue-500 text-white" : "bg-white dark:bg-gray-600"}`}>• List</button>
            <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`px-2 py-1 rounded text-sm ${editor.isActive("heading", { level: 2 }) ? "bg-blue-500 text-white" : "bg-white dark:bg-gray-600"}`}>H2</button>
            <button type="button" onClick={() => editor.chain().focus().clearNodes().run()} className="px-2 py-1 rounded text-sm bg-white dark:bg-gray-600">Clear</button>
        </div>
    );
};


export default function EditFasilitiesPage() {

    const params = useParams();
    const id = params.id as string;
    const { title_eng, title_ind, description_eng, description_ind,
        setTitle_ind, setTitle_eng, setDescriptionInd, setDescriptionEng,
        image, setImage, croppedBlob, setCroppedBlob, existingImage,
        subtitle_ind,
        setSubtitle_ind,
        subtitle_eng,
        setSubtitle_eng,
        loading,
        errors,
        handleSubmit,
        fetchLoading, } = useEditBannerRoom(id);


    const hasLoadedInd = useRef(false);
    const hasLoadedEng = useRef(false);

    const editorInd = useEditor({
        extensions: [StarterKit, Link.configure({ openOnClick: false })],
        onUpdate: ({ editor }) => setDescriptionInd(editor.getHTML()),
    });

    const editorEng = useEditor({
        extensions: [StarterKit, Link.configure({ openOnClick: false })],
        onUpdate: ({ editor }) => setDescriptionEng(editor.getHTML()),
    });

    // ✅ Load content sekali saja setelah fetch selesai
    useEffect(() => {
        if (editorInd && description_ind && !fetchLoading && !hasLoadedInd.current) {
            editorInd.commands.setContent(description_ind);
            hasLoadedInd.current = true;
        }
    }, [editorInd, description_ind, fetchLoading]);

    useEffect(() => {
        if (editorEng && description_eng && !fetchLoading && !hasLoadedEng.current) {
            editorEng.commands.setContent(description_eng);
            hasLoadedEng.current = true;
        }
    }, [editorEng, description_eng, fetchLoading]);

    if (fetchLoading) {
        return (
            <FormPage title="Edit Food Package" description="Memuat data...">
                <div className="flex items-center justify-center py-12">
                    <div className="text-gray-600 dark:text-gray-400">Loading...</div>
                </div>
            </FormPage>
        );
    }

    return (
        <FormPage
            title="Edit Banner Page"
            description="Update data Banner Page"
        >

            {/* FORM */}
            <form
                className="space-y-5"
                onSubmit={handleSubmit}
            >
                {/* Image */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Image
                    </label>

                    {existingImage && !image && (
                        <div className="mb-3 rounded border p-3">
                            <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Current Image:</p>
                            <img src={existingImage} alt="current" className="h-32 w-32 rounded object-cover" />
                        </div>
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            setImage(URL.createObjectURL(file));
                        }}
                        className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />

                    {image && (
                        <ImageCropper
                            image={image}
                            setCroppedBlob={setCroppedBlob}
                        />
                    )}

                    {errors.image && (
                        <p className="mt-1 text-sm text-red-500">{errors.image}</p>
                    )}
                </div>
                {/* TITLE (Indonesia) */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Title Banner (Indonesia)
                    </label>
                    <input
                        type="text"
                        value={title_ind}
                        onChange={(e) => setTitle_ind(e.target.value)}
                        className="w-full rounded border p-3
                                bg-white text-gray-900
                                dark:bg-gray-700 dark:text-white dark:border-gray-600
                                focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {errors.title_ind && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.title_ind}
                    </p>
                )}
                {/* TITLE (English) */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Title Banner (English)
                    </label>
                    <input
                        type="text"
                        value={title_eng}
                        onChange={(e) => setTitle_eng(e.target.value)}
                        className="w-full rounded border p-3
                                bg-white text-gray-900
                                dark:bg-gray-700 dark:text-white dark:border-gray-600
                                focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {errors.title_eng && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.title_eng}
                    </p>
                )}

                {/* Subtitle (Indonesia) */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Subtitle (Indonesia)
                    </label>
                    <input
                        type="text"
                        value={subtitle_ind}
                        onChange={(e) => setSubtitle_ind(e.target.value)}
                        className="w-full rounded border p-3
                                bg-white text-gray-900
                                dark:bg-gray-700 dark:text-white dark:border-gray-600
                                focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        (Optional)
                    </span>
                </div>

                {/* Subtitle (English) */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                        Subtitle (English)
                    </label>
                    <input
                        type="text"
                        value={subtitle_eng}
                        onChange={(e) => setSubtitle_eng(e.target.value)}
                        className="w-full rounded border p-3
                                bg-white text-gray-900
                                dark:bg-gray-700 dark:text-white dark:border-gray-600
                                focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        (Optional)
                    </span>
                </div>



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



                {/* ACTIONS */}
                <FormActions loading={loading} />
            </form>

        </FormPage>

    );
}


