"use client";

import { useState } from "react";

interface TagInputProps {
    value: Array<{ name_ind: string; name_eng: string; id?: number }>;
    onChange: (value: Array<{ name_ind: string; name_eng: string; id?: number }>) => void;
    onDelete?: (index: number) => void;  // ✅ Add optional callback
    placeholderInd?: string;
    placeholderEng?: string;
    error?: string;
}

export function TagInput({
    value,
    onChange,
    onDelete,
    placeholderInd = "Masukkan nama (Indonesia) lalu Enter",
    placeholderEng = "Enter name (English) then Tab",
    error,
}: TagInputProps) {
    const [inputInd, setInputInd] = useState("");
    const [inputEng, setInputEng] = useState("");
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

    function handleAddTag(e: React.KeyboardEvent<HTMLInputElement>) {
        if ((e.key === "Enter" || e.key === "Tab") && inputInd.trim() && inputEng.trim()) {
            e.preventDefault();

            onChange([
                ...value,
                {
                    name_ind: inputInd.trim(),
                    name_eng: inputEng.trim(),
                },
            ]);

            setInputInd("");
            setInputEng("");
        }
    }

    function handleRemoveTag(index: number) {
        if (onDelete) {
            onDelete(index);  // ✅ Call callback untuk tracking deleted IDs
        } else {
            onChange(value.filter((_, i) => i !== index));
        }
    }

    return (
        <div className="space-y-3">
            {/* INPUT FIELDS */}
            <div className="grid grid-cols-2 gap-3">
                <input
                    type="text"
                    value={inputInd}
                    onChange={(e) => setInputInd(e.target.value)}
                    onKeyDown={handleAddTag}
                    className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={placeholderInd}
                />
                <input
                    type="text"
                    value={inputEng}
                    onChange={(e) => setInputEng(e.target.value)}
                    onKeyDown={handleAddTag}
                    className="w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={placeholderEng}
                />
            </div>

            {/* TAGS DISPLAY */}
            {value.length > 0 && (
                <div className="space-y-2">
                    {value.map((tag, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between gap-3 rounded bg-blue-50 p-3 dark:bg-blue-900/20"
                            onMouseEnter={() => setFocusedIndex(index)}
                            onMouseLeave={() => setFocusedIndex(null)}
                        >
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {tag.name_ind}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    {tag.name_eng}
                                </p>
                            </div>
                            {focusedIndex === index && (
                                <button
                                    type="button"
                                    onClick={() => handleRemoveTag(index)}
                                    className="rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* ERROR */}
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}