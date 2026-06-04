"use client";

import { useState } from "react";
import { IconPicker } from "@/components/admin/global/IconPicker";

interface VenueKey {
    id?: number;
    icon: string;
    label_ind: string;
    label_eng: string;
    value_ind: string;
    value_eng: string;
}

interface VenueKeysManagerProps {
    value: VenueKey[];
    onChange: (value: VenueKey[]) => void;
    onDelete?: (index: number) => void;
    error?: string;
}

export function VenueKeysManager({ value, onChange, onDelete, error }: VenueKeysManagerProps) {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    function handleAddKey() {
        onChange([
            ...value,
            {
                icon: "",
                label_ind: "",
                label_eng: "",
                value_ind: "",
                value_eng: "",
            },
        ]);
        setExpandedIndex(value.length);
    }

    function handleUpdateKey(index: number, field: keyof VenueKey, fieldValue: string) {
        const updated = value.map((key, i) =>
            i === index ? { ...key, [field]: fieldValue } : key
        );
        onChange(updated);
    }

    function handleRemoveKey(index: number) {
        if (onDelete) {
            onDelete(index);
        } else {
            const updated = value.filter((_, i) => i !== index);
            onChange(updated);
        }
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <label className="font-medium text-gray-700 dark:text-gray-300">Venue Keys</label>
                <button
                    type="button"
                    onClick={handleAddKey}
                    className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                >
                    + Add Key
                </button>
            </div>

            {value.length > 0 && (
                <div className="space-y-2">
                    {value.map((key, index) => (
                        <div
                            key={index}
                            className="rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden"
                        >
                            {/* Header */}
                            <button
                                type="button"
                                onClick={() =>
                                    setExpandedIndex(expandedIndex === index ? null : index)
                                }
                                className="w-full px-4 py-2 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                            >
                                <span className="font-medium text-gray-700 dark:text-gray-300">
                                    {key.label_ind || `Key ${index + 1}`}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">{key.icon}</span>
                                    <svg
                                        className={`h-5 w-5 transition-transform ${
                                            expandedIndex === index ? "rotate-180" : ""
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                        />
                                    </svg>
                                </div>
                            </button>

                            {/* Content */}
                            {expandedIndex === index && (
                                <div className="border-t border-gray-200 dark:border-gray-600 p-4 space-y-3">
                                    {/* Icon Picker */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Icon
                                        </label>
                                        <IconPicker
                                            value={key.icon}
                                            onChange={(icon) => handleUpdateKey(index, "icon", icon)}
                                        />
                                    </div>

                                    {/* Label Indonesia */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Label (Indonesia)
                                        </label>
                                        <input
                                            type="text"
                                            value={key.label_ind}
                                            onChange={(e) =>
                                                handleUpdateKey(index, "label_ind", e.target.value)
                                            }
                                            className="w-full rounded border p-2 text-sm bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                            placeholder="e.g., Luas Kamar"
                                        />
                                    </div>

                                    {/* Label English */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Label (English)
                                        </label>
                                        <input
                                            type="text"
                                            value={key.label_eng}
                                            onChange={(e) =>
                                                handleUpdateKey(index, "label_eng", e.target.value)
                                            }
                                            className="w-full rounded border p-2 text-sm bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                            placeholder="e.g., Room Size"
                                        />
                                    </div>

                                    {/* Value Indonesia */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Value (Indonesia)
                                        </label>
                                        <input
                                            type="text"
                                            value={key.value_ind}
                                            onChange={(e) =>
                                                handleUpdateKey(index, "value_ind", e.target.value)
                                            }
                                            className="w-full rounded border p-2 text-sm bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                            placeholder="e.g., 25 m²"
                                        />
                                    </div>

                                    {/* Value English */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Value (English)
                                        </label>
                                        <input
                                            type="text"
                                            value={key.value_eng}
                                            onChange={(e) =>
                                                handleUpdateKey(index, "value_eng", e.target.value)
                                            }
                                            className="w-full rounded border p-2 text-sm bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                            placeholder="e.g., 25 m²"
                                        />
                                    </div>

                                    {/* Delete Button */}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveKey(index)}
                                        className="w-full rounded bg-red-500/10 py-2 text-sm text-red-600 hover:bg-red-500/20"
                                    >
                                        Hapus Key
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}