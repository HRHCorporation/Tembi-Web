"use client";

import { useRef, useEffect, useState } from "react";

interface CustomEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string;
}

export function CustomEditor({
    value,
    onChange,
    placeholder = "Tulis konten di sini...",
    error,
}: CustomEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedImage, setSelectedImage] = useState<HTMLImageElement | null>(null);
    const [imageSize, setImageSize] = useState(100);
    const [imageAlign, setImageAlign] = useState<"left" | "center" | "right">("left");

    // Set initial content
    useEffect(() => {
        if (editorRef.current && value && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value;
        }
    }, [value]);

    // Handle content change
    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    // Execute command
    const execCommand = (command: string, value?: string) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
    };

    // Handle image upload
    const handleImageUpload = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validasi
        if (!file.type.startsWith("image/")) {
            alert("File harus berupa gambar!");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("Ukuran gambar maksimal 5MB!");
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = document.createElement("img");
            img.src = event.target?.result as string;
            img.style.maxWidth = "100%";
            img.style.height = "auto";
            img.style.borderRadius = "0.5rem";
            img.style.margin = "1rem 0";
            img.style.cursor = "pointer";
            img.style.border = "2px solid #e5e7eb";
            img.className = "editor-image";

            // Insert image at cursor
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                range.insertNode(img);
                range.collapse(false);
            } else {
                editorRef.current?.appendChild(img);
            }

            handleInput();
        };
        reader.readAsDataURL(file);

        // Reset input
        e.target.value = "";
    };

    // Handle image click
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === "IMG" && target.classList.contains("editor-image")) {
                setSelectedImage(target as HTMLImageElement);
                
                // Get current size
                const currentWidth = target.style.width || "100%";
                const sizePercent = parseInt(currentWidth) || 100;
                setImageSize(sizePercent);

                // Get alignment
                const align = target.style.display === "block" 
                    ? target.style.marginLeft === "auto" && target.style.marginRight === "auto"
                        ? "center"
                        : target.style.marginLeft === "auto"
                        ? "right"
                        : "left"
                    : "left";
                setImageAlign(align);
            } else if (!target.closest(".image-toolbar")) {
                setSelectedImage(null);
            }
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    // Update image style
    const updateImageStyle = (size: number, align: "left" | "center" | "right") => {
        if (!selectedImage) return;

        selectedImage.style.width = `${size}%`;
        selectedImage.style.height = "auto";
        selectedImage.style.display = "block";

        if (align === "center") {
            selectedImage.style.marginLeft = "auto";
            selectedImage.style.marginRight = "auto";
        } else if (align === "right") {
            selectedImage.style.marginLeft = "auto";
            selectedImage.style.marginRight = "0";
        } else {
            selectedImage.style.marginLeft = "0";
            selectedImage.style.marginRight = "auto";
        }

        handleInput();
    };

    return (
        <div className="space-y-2 relative">
            {/* Toolbar */}
            <div className="flex gap-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 flex-wrap">
                {/* Bold */}
                <button
                    type="button"
                    onClick={() => execCommand("bold")}
                    className="px-3 py-1.5 rounded text-sm font-bold bg-white dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500"
                    title="Bold (Ctrl+B)"
                >
                    B
                </button>

                {/* Italic */}
                <button
                    type="button"
                    onClick={() => execCommand("italic")}
                    className="px-3 py-1.5 rounded text-sm italic bg-white dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500"
                    title="Italic (Ctrl+I)"
                >
                    I
                </button>

                {/* Underline */}
                <button
                    type="button"
                    onClick={() => execCommand("underline")}
                    className="px-3 py-1.5 rounded text-sm underline bg-white dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500"
                    title="Underline (Ctrl+U)"
                >
                    U
                </button>

                {/* Strikethrough */}
                <button
                    type="button"
                    onClick={() => execCommand("strikeThrough")}
                    className="px-3 py-1.5 rounded text-sm line-through bg-white dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500"
                    title="Strikethrough"
                >
                    S
                </button>

                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>

                {/* Headings */}
                <button
                    type="button"
                    onClick={() => execCommand("formatBlock", "h1")}
                    className="px-3 py-1.5 rounded text-sm font-bold bg-white dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500"
                    title="Heading 1"
                >
                    H1
                </button>
                <button
                    type="button"
                    onClick={() => execCommand("formatBlock", "h2")}
                    className="px-3 py-1.5 rounded text-sm font-semibold bg-white dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500"
                    title="Heading 2"
                >
                    H2
                </button>
                <button
                    type="button"
                    onClick={() => execCommand("formatBlock", "h3")}
                    className="px-3 py-1.5 rounded text-sm font-medium bg-white dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500"
                    title="Heading 3"
                >
                    H3
                </button>
                <button
                    type="button"
                    onClick={() => execCommand("formatBlock", "p")}
                    className="px-3 py-1.5 rounded text-sm bg-white dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500"
                    title="Paragraph"
                >
                    P
                </button>

                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>

                {/* Lists */}
                <button
                    type="button"
                    onClick={() => execCommand("insertUnorderedList")}
                    className="px-3 py-1.5 rounded text-sm bg-white dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500"
                    title="Bullet List"
                >
                    • List
                </button>
                <button
                    type="button"
                    onClick={() => execCommand("insertOrderedList")}
                    className="px-3 py-1.5 rounded text-sm bg-white dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500"
                    title="Numbered List"
                >
                    1. List
                </button>

                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>

                {/* Alignment */}
                <button
                    type="button"
                    onClick={() => execCommand("justifyLeft")}
                    className="px-3 py-1.5 rounded text-sm bg-white dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500"
                    title="Align Left"
                >
                    ⬅️
                </button>
                <button
                    type="button"
                    onClick={() => execCommand("justifyCenter")}
                    className="px-3 py-1.5 rounded text-sm bg-white dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500"
                    title="Align Center"
                >
                    ⬌
                </button>
                <button
                    type="button"
                    onClick={() => execCommand("justifyRight")}
                    className="px-3 py-1.5 rounded text-sm bg-white dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500"
                    title="Align Right"
                >
                    ➡️
                </button>

                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>

                {/* Image */}
                <button
                    type="button"
                    onClick={handleImageUpload}
                    className="px-3 py-1.5 rounded text-sm font-medium bg-green-500 text-white hover:bg-green-600"
                    title="Insert Image"
                >
                    🖼️ Image
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />

                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>

                {/* Link */}
                <button
                    type="button"
                    onClick={() => {
                        const url = prompt("Masukkan URL:");
                        if (url) execCommand("createLink", url);
                    }}
                    className="px-3 py-1.5 rounded text-sm bg-white dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500"
                    title="Insert Link"
                >
                    🔗
                </button>

                {/* Horizontal Rule */}
                <button
                    type="button"
                    onClick={() => execCommand("insertHorizontalRule")}
                    className="px-3 py-1.5 rounded text-sm bg-white dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500"
                    title="Horizontal Line"
                >
                    ―
                </button>

                {/* Clear Formatting */}
                <button
                    type="button"
                    onClick={() => execCommand("removeFormat")}
                    className="px-3 py-1.5 rounded text-sm bg-white dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500"
                    title="Clear Formatting"
                >
                    ✕
                </button>

                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>

                {/* Undo/Redo */}
                <button
                    type="button"
                    onClick={() => execCommand("undo")}
                    className="px-3 py-1.5 rounded text-sm bg-white dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500"
                    title="Undo"
                >
                    ↶
                </button>
                <button
                    type="button"
                    onClick={() => execCommand("redo")}
                    className="px-3 py-1.5 rounded text-sm bg-white dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500"
                    title="Redo"
                >
                    ↷
                </button>
            </div>

            {/* Editor */}
            <div
                className={`rounded-lg border bg-white dark:bg-gray-800 ${
                    error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                }`}
            >
                <div
                    ref={editorRef}
                    contentEditable
                    onInput={handleInput}
                    className="min-h-[400px] p-4 focus:outline-none prose dark:prose-invert max-w-none prose-sm"
                    data-placeholder={placeholder}
                />
            </div>

            {error && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                    <span>⚠️</span> {error}
                </p>
            )}

            {/* Image Toolbar */}
            {selectedImage && (
                <div className="image-toolbar fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-4 border border-gray-300 dark:border-gray-600 z-50 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium">Ukuran:</label>
                        <input
                            type="range"
                            min="20"
                            max="100"
                            value={imageSize}
                            onChange={(e) => {
                                const size = parseInt(e.target.value);
                                setImageSize(size);
                                updateImageStyle(size, imageAlign);
                            }}
                            className="w-32"
                        />
                        <span className="text-sm w-12">{imageSize}%</span>
                    </div>

                    <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>

                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium">Posisi:</label>
                        <button
                            type="button"
                            onClick={() => {
                                setImageAlign("left");
                                updateImageStyle(imageSize, "left");
                            }}
                            className={`px-3 py-1.5 rounded ${
                                imageAlign === "left"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 dark:bg-gray-600"
                            }`}
                        >
                            ⬅️
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setImageAlign("center");
                                updateImageStyle(imageSize, "center");
                            }}
                            className={`px-3 py-1.5 rounded ${
                                imageAlign === "center"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 dark:bg-gray-600"
                            }`}
                        >
                            ⬌
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setImageAlign("right");
                                updateImageStyle(imageSize, "right");
                            }}
                            className={`px-3 py-1.5 rounded ${
                                imageAlign === "right"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 dark:bg-gray-600"
                            }`}
                        >
                            ➡️
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            selectedImage.remove();
                            setSelectedImage(null);
                            handleInput();
                        }}
                        className="px-3 py-1.5 rounded bg-red-500 text-white hover:bg-red-600"
                    >
                        🗑️ Hapus
                    </button>

                    <button
                        type="button"
                        onClick={() => setSelectedImage(null)}
                        className="px-3 py-1.5 rounded bg-gray-500 text-white hover:bg-gray-600"
                    >
                        ✕
                    </button>
                </div>
            )}

            <style jsx global>{`
                [contenteditable][data-placeholder]:empty:before {
                    content: attr(data-placeholder);
                    color: #9ca3af;
                    pointer-events: none;
                }

                .editor-image:hover {
                    border-color: #3b82f6 !important;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }

                .dark .editor-image {
                    border-color: #4b5563 !important;
                }
            `}</style>
        </div>
    );
}