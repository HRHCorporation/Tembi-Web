"use client";

import { useRef } from "react";

export interface ImageFile {
    file?: File;
    preview: string;
    is_banner: boolean;
    id?: number;
}

interface ImageUploadProps {
    value: ImageFile[];
    onChange: (value: ImageFile[]) => void;
    onDelete?: (index: number) => void;
    error?: string;
}

const MAX_IMAGES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export function ImageUpload({ value, onChange, onDelete, error }: ImageUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    function handleFiles(files: FileList | null) {
        if (!files) return;

        const currentCount = value.length;
        const remainingSlots = MAX_IMAGES - currentCount;

        if (remainingSlots <= 0) {
            alert("Maksimal 5 foto saja");
            return;
        }

        const filesToAdd = Array.from(files).slice(0, remainingSlots);

        const newImages: ImageFile[] = filesToAdd
            .filter((file) => {
                if (file.size > MAX_FILE_SIZE) {
                    alert(`File ${file.name} terlalu besar. Maksimal 5 MB per foto.`);
                    return false;
                }
                return true;
            })
            .map((file) => ({
                file,
                preview: URL.createObjectURL(file),
                is_banner: false,
            }));

        onChange([...value, ...newImages]);
    }

    function handleRemove(index: number) {
        if (onDelete) {
            onDelete(index);
        } else {
            const updated = value.filter((_, i) => i !== index);
            onChange(updated);
        }
    }

    function handleSetBanner(index: number) {
        const updated = value.map((img, i) => ({
            ...img,
            is_banner: i === index,
        }));
        onChange(updated);
    }

    function handleDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    }

    return (
        <div className="space-y-3">
            <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => value.length < MAX_IMAGES && inputRef.current?.click()}
                className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 ${
                    value.length >= MAX_IMAGES
                        ? "border-gray-300 bg-gray-50 text-gray-400 cursor-not-allowed opacity-50"
                        : "border-gray-300 bg-gray-50 text-gray-400 hover:border-blue-400 hover:bg-blue-50/30 dark:hover:border-blue-500 dark:hover:bg-blue-900/10"
                } dark:border-gray-600 dark:bg-gray-700/30 dark:text-gray-500 transition-colors`}
            >
                <svg className="mb-2 h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 16v-8m0 0l-3 3m3-3l3 3M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1" />
                </svg>
                <p className="text-sm font-medium">Klik atau drag & drop gambar</p>
                <p className="text-xs mt-1">PNG, JPG, WEBP — maksimal 5 MB per foto</p>
                <p className="text-xs mt-2 text-gray-500">
                    {value.length}/{MAX_IMAGES} foto ({MAX_IMAGES - value.length} tersisa)
                </p>
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                    disabled={value.length >= MAX_IMAGES}
                />
            </div>

            {value.length > 0 && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {value.map((img, index) => (
                        <div
                            key={index}
                            className={`relative rounded-lg border-2 overflow-hidden ${
                                img.is_banner ? "border-blue-500" : "border-gray-200 dark:border-gray-600"
                            }`}
                        >
                            <img src={img.preview} alt={`preview-${index}`} className="h-32 w-full object-cover" />

                            {img.is_banner && (
                                <span className="absolute left-1.5 top-1.5 rounded bg-blue-500 px-1.5 py-0.5 text-xs font-semibold text-white">
                                    Banner
                                </span>
                            )}

                            {img.id && !img.file && (
                                <span className="absolute right-1.5 top-1.5 rounded bg-green-500 px-1.5 py-0.5 text-xs font-semibold text-white">
                                    Existing
                                </span>
                            )}

                            <div className="absolute inset-x-0 bottom-0 flex justify-between gap-1 bg-black/50 p-1.5">
                                <button
                                    type="button"
                                    onClick={() => handleSetBanner(index)}
                                    disabled={img.is_banner}
                                    className={`flex-1 rounded px-1 py-1 text-xs font-medium ${
                                        img.is_banner
                                            ? "bg-blue-500 text-white cursor-default"
                                            : "bg-white/20 text-white hover:bg-blue-500"
                                    }`}
                                >
                                    {img.is_banner ? "✓ Banner" : "Set Banner"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleRemove(index)}
                                    className="rounded bg-red-500/80 px-2 py-1 text-xs text-white hover:bg-red-500"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

            {value.length >= MAX_IMAGES && (
                <p className="text-xs text-yellow-600 dark:text-yellow-400">
                    ⚠️ Sudah mencapai maksimal {MAX_IMAGES} foto
                </p>
            )}
        </div>
    );
}