"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { useRef, useState, useCallback, useEffect } from "react";

interface EditorToolbarProps {
    editor: Editor | null;
}

interface CustomEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string;
}

// Image Resize Handler Component
const ImageResizeHandler = ({ editor }: { editor: Editor }) => {
    const [selectedImage, setSelectedImage] = useState<HTMLImageElement | null>(null);
    const [imageWidth, setImageWidth] = useState<number>(100);
    const [imageAlign, setImageAlign] = useState<"left" | "center" | "right">("left");

    const handleImageClick = useCallback((e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.tagName === "IMG") {
            const img = target as HTMLImageElement;
            setSelectedImage(img);
            
            // Get current width
            const currentWidth = img.style.width || "100%";
            const widthPercent = parseInt(currentWidth) || 100;
            setImageWidth(widthPercent);

            // Get current alignment
            const parent = img.parentElement;
            if (parent?.style.textAlign) {
                setImageAlign(parent.style.textAlign as "left" | "center" | "right");
            }
        } else {
            setSelectedImage(null);
        }
    }, []);

    // Add click listener
    useEffect(() => {
        const editorElement = editor.view.dom;
        editorElement.addEventListener("click", handleImageClick);
        return () => {
            editorElement.removeEventListener("click", handleImageClick);
        };
    }, [editor, handleImageClick]);

    const updateImageStyle = (width: number, align: "left" | "center" | "right") => {
        if (!selectedImage) return;

        // Update width
        selectedImage.style.width = `${width}%`;
        selectedImage.style.height = "auto";

        // Update alignment
        const parent = selectedImage.parentElement;
        if (parent) {
            parent.style.textAlign = align;
            parent.style.display = "block";
        }

        // Update editor content
        editor.commands.focus();
    };

    if (!selectedImage) return null;

    return (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 border border-gray-300 dark:border-gray-600 z-50 flex items-center gap-4">
            <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Ukuran:
                </label>
                <input
                    type="range"
                    min="20"
                    max="100"
                    value={imageWidth}
                    onChange={(e) => {
                        const width = parseInt(e.target.value);
                        setImageWidth(width);
                        updateImageStyle(width, imageAlign);
                    }}
                    className="w-32"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400 w-12">
                    {imageWidth}%
                </span>
            </div>

            <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>

            <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Posisi:
                </label>
                <button
                    type="button"
                    onClick={() => {
                        setImageAlign("left");
                        updateImageStyle(imageWidth, "left");
                    }}
                    className={`px-3 py-1.5 rounded text-sm transition-colors ${
                        imageAlign === "left"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500"
                    }`}
                    title="Kiri"
                >
                    ⬅️
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setImageAlign("center");
                        updateImageStyle(imageWidth, "center");
                    }}
                    className={`px-3 py-1.5 rounded text-sm transition-colors ${
                        imageAlign === "center"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500"
                    }`}
                    title="Tengah"
                >
                    ⬌
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setImageAlign("right");
                        updateImageStyle(imageWidth, "right");
                    }}
                    className={`px-3 py-1.5 rounded text-sm transition-colors ${
                        imageAlign === "right"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500"
                    }`}
                    title="Kanan"
                >
                    ➡️
                </button>
            </div>

            <button
                type="button"
                onClick={() => {
                    if (selectedImage) {
                        selectedImage.remove();
                        editor.commands.focus();
                    }
                    setSelectedImage(null);
                }}
                className="px-3 py-1.5 rounded text-sm bg-red-500 text-white hover:bg-red-600 transition-colors"
                title="Hapus Gambar"
            >
                🗑️ Hapus
            </button>

            <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="px-3 py-1.5 rounded text-sm bg-gray-500 text-white hover:bg-gray-600 transition-colors"
            >
                ✕
            </button>
        </div>
    );
};

const EditorToolbar = ({ editor }: EditorToolbarProps) => {
    const imageInputRef = useRef<HTMLInputElement>(null);

    if (!editor) return null;

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validasi tipe file
        if (!file.type.startsWith("image/")) {
            alert("File harus berupa gambar!");
            return;
        }

        // Validasi ukuran file (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert("Ukuran gambar maksimal 5MB!");
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const src = event.target?.result as string;
            
            // Insert image menggunakan setImage() yang benar
            editor.chain().focus().setImage({ src, alt: file.name, title: file.name }).run();
        };
        reader.readAsDataURL(file);

        // Reset input
        if (imageInputRef.current) {
            imageInputRef.current.value = "";
        }
    };

    return (
        <div className="flex gap-1 mb-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 flex-wrap items-center">
            {/* Bold */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`px-3 py-1.5 rounded text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
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
                className={`px-3 py-1.5 rounded text-sm italic transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
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
                className={`px-3 py-1.5 rounded text-sm line-through transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    editor.isActive("strike")
                        ? "bg-blue-500 text-white"
                        : "bg-white dark:bg-gray-600 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500"
                }`}
                title="Strikethrough"
            >
                S
            </button>

            {/* Separator */}
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>

            {/* Heading 1 */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`px-3 py-1.5 rounded text-sm font-bold transition-colors ${
                    editor.isActive("heading", { level: 1 })
                        ? "bg-blue-500 text-white"
                        : "bg-white dark:bg-gray-600 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500"
                }`}
                title="Heading 1"
            >
                H1
            </button>

            {/* Heading 2 */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`px-3 py-1.5 rounded text-sm font-semibold transition-colors ${
                    editor.isActive("heading", { level: 2 })
                        ? "bg-blue-500 text-white"
                        : "bg-white dark:bg-gray-600 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500"
                }`}
                title="Heading 2"
            >
                H2
            </button>

            {/* Heading 3 */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                    editor.isActive("heading", { level: 3 })
                        ? "bg-blue-500 text-white"
                        : "bg-white dark:bg-gray-600 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500"
                }`}
                title="Heading 3"
            >
                H3
            </button>

            {/* Separator */}
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>

            {/* Paragraph */}
            <button
                type="button"
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={`px-3 py-1.5 rounded text-sm transition-colors ${
                    editor.isActive("paragraph")
                        ? "bg-blue-500 text-white"
                        : "bg-white dark:bg-gray-600 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500"
                }`}
                title="Paragraph"
            >
                P
            </button>

            {/* Bullet List */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`px-3 py-1.5 rounded text-sm transition-colors ${
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
                className={`px-3 py-1.5 rounded text-sm transition-colors ${
                    editor.isActive("orderedList")
                        ? "bg-blue-500 text-white"
                        : "bg-white dark:bg-gray-600 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500"
                }`}
                title="Ordered List"
            >
                1. List
            </button>

            {/* Separator */}
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>

            {/* Blockquote */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`px-3 py-1.5 rounded text-sm transition-colors ${
                    editor.isActive("blockquote")
                        ? "bg-blue-500 text-white"
                        : "bg-white dark:bg-gray-600 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500"
                }`}
                title="Blockquote"
            >
                ❝❞
            </button>

            {/* Code Block */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={`px-3 py-1.5 rounded text-sm transition-colors ${
                    editor.isActive("codeBlock")
                        ? "bg-blue-500 text-white"
                        : "bg-white dark:bg-gray-600 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500"
                }`}
                title="Code Block"
            >
                {'</>'}
            </button>

            {/* Separator */}
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>

            {/* Image Upload */}
            <label
                className="px-3 py-1.5 rounded text-sm bg-green-500 text-white hover:bg-green-600 cursor-pointer transition-colors font-medium"
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
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>

            {/* Horizontal Rule */}
            <button
                type="button"
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                className="px-3 py-1.5 rounded text-sm bg-white dark:bg-gray-600 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
                title="Horizontal Line"
            >
                ―
            </button>

            {/* Clear Formatting */}
            <button
                type="button"
                onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
                className="px-3 py-1.5 rounded text-sm bg-white dark:bg-gray-600 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
                title="Clear Formatting"
            >
                ✕ Clear
            </button>

            {/* Separator */}
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>

            {/* Undo */}
            <button
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
                className="px-3 py-1.5 rounded text-sm bg-white dark:bg-gray-600 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Undo (Ctrl+Z)"
            >
                ↶
            </button>

            {/* Redo */}
            <button
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
                className="px-3 py-1.5 rounded text-sm bg-white dark:bg-gray-600 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Redo (Ctrl+Y)"
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
                HTMLAttributes: {
                    class: "text-blue-500 hover:text-blue-600 underline",
                },
            }),
            Image.configure({
                inline: true,
                allowBase64: true,
                HTMLAttributes: {
                    class: "rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer hover:border-blue-500 transition-all",
                },
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: "prose dark:prose-invert max-w-none focus:outline-none min-h-[300px]",
            },
        },
    });

    return (
        <div className="space-y-2 relative">
            <EditorToolbar editor={editor} />
            <div
                className={`rounded-lg border p-4 bg-white dark:bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500 transition-all ${
                    error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                }`}
            >
                <EditorContent
                    editor={editor}
                    className="prose prose-sm dark:prose-invert max-w-none 
                    prose-headings:text-gray-900 dark:prose-headings:text-white 
                    prose-p:text-gray-700 dark:prose-p:text-gray-300
                    prose-strong:text-gray-900 dark:prose-strong:text-white
                    prose-code:text-gray-800 dark:prose-code:text-gray-200
                    prose-code:bg-gray-100 dark:prose-code:bg-gray-700
                    prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950
                    prose-blockquote:border-blue-500 dark:prose-blockquote:border-blue-400
                    prose-ol:list-decimal prose-ul:list-disc
                    prose-li:text-gray-700 dark:prose-li:text-gray-300
                    [&_img]:rounded-lg [&_img]:border [&_img]:border-gray-200 
                    [&_img]:dark:border-gray-600 [&_img]:cursor-pointer 
                    [&_img]:hover:border-blue-500 [&_img]:transition-all
                    [&_img]:max-w-full [&_img]:h-auto [&_img]:my-4"
                />
                {!editor?.getText() && (
                    <div className="absolute top-20 left-8 text-gray-400 dark:text-gray-500 pointer-events-none">
                        {placeholder}
                    </div>
                )}
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                    <span>⚠️</span> {error}
                </p>
            )}
            
            {/* Image Resize Handler */}
            {editor && <ImageResizeHandler editor={editor} />}
        </div>
    );
}