"use client";

import { useState } from "react";

interface VenueService {
    id?: number;
    name_service_ind: string;
    name_service_eng: string;
    description_ind: string;
    description_eng: string;
}

interface VenueServicesManagerProps {
    value: VenueService[];
    onChange: (value: VenueService[]) => void;
    onDelete?: (index: number) => void;
    error?: string;
}

export function VenueServicesManager({ value, onChange, onDelete, error }: VenueServicesManagerProps) {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    function handleAddService() {
        onChange([
            ...value,
            {
                name_service_ind: "",
                name_service_eng: "",
                description_ind: "",
                description_eng: "",
            },
        ]);
        setExpandedIndex(value.length);
    }

    function handleUpdateService(
        index: number,
        field: keyof VenueService,
        fieldValue: string
    ) {
        const updated = value.map((service, i) =>
            i === index ? { ...service, [field]: fieldValue } : service
        );
        onChange(updated);
    }

    function handleRemoveService(index: number) {
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
                <label className="font-medium text-gray-700 dark:text-gray-300">Venue Services</label>
                <button
                    type="button"
                    onClick={handleAddService}
                    className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                >
                    + Add Service
                </button>
            </div>

            {value.length > 0 && (
                <div className="space-y-2">
                    {value.map((service, index) => (
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
                                    {service.name_service_ind || `Service ${index + 1}`}
                                </span>
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
                            </button>

                            {/* Content */}
                            {expandedIndex === index && (
                                <div className="border-t border-gray-200 dark:border-gray-600 p-4 space-y-3">
                                    {/* Name Indonesia */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Service Name (Indonesia)
                                        </label>
                                        <input
                                            type="text"
                                            value={service.name_service_ind}
                                            onChange={(e) =>
                                                handleUpdateService(
                                                    index,
                                                    "name_service_ind",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full rounded border p-2 text-sm bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                            placeholder="e.g., WiFi Gratis"
                                        />
                                    </div>

                                    {/* Name English */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Service Name (English)
                                        </label>
                                        <input
                                            type="text"
                                            value={service.name_service_eng}
                                            onChange={(e) =>
                                                handleUpdateService(
                                                    index,
                                                    "name_service_eng",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full rounded border p-2 text-sm bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                            placeholder="e.g., Free WiFi"
                                        />
                                    </div>

                                    {/* Description Indonesia */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Deskripsi Service (Indonesia)
                                        </label>
                                        <textarea
                                            value={service.description_ind}
                                            onChange={(e) =>
                                                handleUpdateService(
                                                    index,
                                                    "description_ind",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full rounded border p-2 text-sm bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                            placeholder="Describe this service"
                                            rows={3}
                                        />
                                    </div>

                                    {/* Description English */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Deskripsi Service (English)
                                        </label>
                                        <textarea
                                            value={service.description_eng}
                                            onChange={(e) =>
                                                handleUpdateService(
                                                    index,
                                                    "description_eng",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full rounded border p-2 text-sm bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                            placeholder="Describe this service"
                                            rows={3}
                                        />
                                    </div>

                                    {/* Delete Button */}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveService(index)}
                                        className="w-full rounded bg-red-500/10 py-2 text-sm text-red-600 hover:bg-red-500/20"
                                    >
                                        Hapus Service
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