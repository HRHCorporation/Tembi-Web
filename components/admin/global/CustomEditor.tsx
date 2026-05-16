"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useRef } from "react";

interface EditorToolbarProps {
    editor: Editor | null;
}

interface CustomEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string;
}

const EditorToolbar = ({ editor }: EditorToolbarProps) => {
    const imageInputRef = useRef<HTMLInputElement>(null);

    if (!editor) return null;

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const src = event.target?.result as string;
            // Insert HTML image tag directly
            editor.chain().focus().insertContent(`<img src="${src}" style="max-width: 100%; border-radius: 0.5rem; margin: 0.5rem 0;" />`).run();
        };
        reader.readAsDataURL(file);

        if (imageInputRef.current) {
            imageInputRef.current.value = "";
        }
    };

    return (
        <div className="flex gap-1 mb-2 p-2 bg-gray-100 dark:bg-gray-700 rounded border flex-wrap items-center">
            {/* Bold */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`px-2 py-1 rounded text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    editor.isActive("bold")
                        ? "bg-blue-500 text-white"
                        : "bg-white dark:bg-gray-600 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500"
                }`}
                title="Bold (Ctrl+B)"
            >
                B
            </button>

            {/* Italic */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={`px-2 py-1 rounded text-sm italic transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    editor.isActive("italic")
                        ? "bg-blue-500 text-white"
                        : "bg-white dark:bg-gray-600 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500"
                }`}
                title="Italic (Ctrl+I)"
            >
                I
            </button>

            {/* Strike */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={`px-2 py-1 rounded text-sm line-through transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    editor.isActive("strike")
                        ? "bg-blue-500 text-white"
                        : "bg-white dark:bg-gray-600 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500"
                }`}
                title="Strikethrough"
            >
                S
            </button>

            {/* Separator */}
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>

            {/* Heading 2 */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                disabled={!editor.can().chain().focus().toggleHeading({ level: 2 }).run()}
                className={`px-2 py-1 rounded text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    editor.isActive("heading", { level: 2 })
                        ? "bg-blue-500 text-white"
                        : "bg-white dark:bg-gray-600 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500"
                }`}
                title="Heading 2"
            >
                H2
            </button>

            {/* Bullet List */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                disabled={!editor.can().chain().focus().toggleBulletList().run()}
                className={`px-2 py-1 rounded text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    editor.isActive("bulletList")
                        ? "bg-blue-500 text-white"
                        : "bg-white dark:bg-gray-600 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500"
                }`}
                title="Bullet List"
            >
                • List
            </button>

            {/* Ordered List */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                disabled={!editor.can().chain().focus().toggleOrderedList().run()}
                className={`px-2 py-1 rounded text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    editor.isActive("orderedList")
                        ? "bg-blue-500 text-white"
                        : "bg-white dark:bg-gray-600 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500"
                }`}
                title="Ordered List"
            >
                1. List
            </button>

            {/* Separator */}
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>

            {/* Image Upload */}
            <label
                className="px-2 py-1 rounded text-sm bg-white dark:bg-gray-600 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500 cursor-pointer transition-colors"
                title="Insert Image"
            >
                🖼️ Image
                <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                />
            </label>

            {/* Separator */}
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>

            {/* Clear Formatting */}
            <button
                type="button"
                onClick={() => editor.chain().focus().clearNodes().run()}
                disabled={!editor.can().chain().focus().clearNodes().run()}
                className="px-2 py-1 rounded text-sm bg-white dark:bg-gray-600 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Clear Formatting"
            >
                Clear
            </button>

            {/* Undo */}
            <button
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
                className="px-2 py-1 rounded text-sm bg-white dark:bg-gray-600 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Undo"
            >
                ↶
            </button>

            {/* Redo */}
            <button
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
                className="px-2 py-1 rounded text-sm bg-white dark:bg-gray-600 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Redo"
            >
                ↷
            </button>
        </div>
    );
};

export function CustomEditor({
    value,
    onChange,
    placeholder = "Tulis konten di sini...",
    error,
}: CustomEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    return (
        <div className="space-y-2">
            <EditorToolbar editor={editor} />
            <div
                className={`rounded border p-3 bg-white dark:bg-gray-700 dark:border-gray-600 focus-within:ring-2 focus-within:ring-blue-500 min-h-64 ${
                    error ? "border-red-500" : "border-gray-200 dark:border-gray-600"
                }`}
            >
                <EditorContent
                    editor={editor}
                    className="prose dark:prose-invert max-w-none prose-sm prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 [&_img]:rounded [&_img]:border [&_img]:border-gray-200 [&_img]:dark:border-gray-600 [&_ol]:list-decimal [&_ul]:list-disc"
                />
            </div>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}