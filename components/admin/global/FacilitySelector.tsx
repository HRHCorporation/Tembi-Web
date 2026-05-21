"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronUp } from "../layouts/sidebar/icons";

interface Facility {
    id: number;
    name: string;
}

interface SelectedFacility {
    facility_id: number;
    is_add_ons: boolean;
}

interface FacilitySelectorProps {
    facilities: Facility[];
    value: SelectedFacility[];
    onChange: (value: SelectedFacility[]) => void;
    error?: string;
}

export function FacilitySelector({
    facilities,
    value,
    onChange,
    error,
}: FacilitySelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredFacilities = facilities.filter((facility) =>
        facility.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const isSelected = (facilityId: number) => {
        return value.some((item) => item.facility_id === facilityId);
    };

    const toggleFacility = (facilityId: number) => {
        if (isSelected(facilityId)) {
            // Remove facility
            onChange(value.filter((item) => item.facility_id !== facilityId));
        } else {
            // Add facility with default is_add_ons = false
            onChange([...value, { facility_id: facilityId, is_add_ons: false }]);
        }
    };

    const toggleAddOns = (facilityId: number) => {
        onChange(
            value.map((item) =>
                item.facility_id === facilityId
                    ? { ...item, is_add_ons: !item.is_add_ons }
                    : item
            )
        );
    };

    const getSelectedFacilityNames = () => {
        return value
            .map((selected) => {
                const facility = facilities.find((f) => f.id === selected.facility_id);
                return facility?.name;
            })
            .filter(Boolean)
            .join(", ");
    };

    const removeFacility = (facilityId: number, e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(value.filter((item) => item.facility_id !== facilityId));
    };

    return (
        <div className="space-y-3">
            {/* Dropdown Selector */}
            <div className="relative" ref={dropdownRef}>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full rounded border p-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between ${
                        error ? "border-red-500" : "border-gray-300"
                    }`}
                >
                    <span className="text-left flex-1 truncate">
                        {value.length > 0
                            ? `${value.length} fasilitas dipilih`
                            : "Pilih fasilitas..."}
                    </span>
                    <ChevronUp
                        className={`ml-2 size-4 transition-transform duration-200 ${
                            isOpen ? "rotate-0" : "rotate-180"
                        }`}
                    />
                </button>

                {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="absolute z-50 mt-2 w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-lg max-h-80 overflow-hidden">
                        {/* Search Input */}
                        <div className="p-3 border-b border-gray-200 dark:border-gray-600">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari fasilitas..."
                                className="w-full rounded border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>

                        {/* Options List */}
                        <div className="overflow-y-auto max-h-60">
                            {filteredFacilities.length === 0 ? (
                                <div className="p-3 text-center text-gray-500 dark:text-gray-400 text-sm">
                                    Tidak ada fasilitas ditemukan
                                </div>
                            ) : (
                                filteredFacilities.map((facility) => (
                                    <label
                                        key={facility.id}
                                        className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isSelected(facility.id)}
                                            onChange={() => toggleFacility(facility.id)}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                                        />
                                        <span className="ml-3 text-sm text-gray-900 dark:text-white">
                                            {facility.name}
                                        </span>
                                    </label>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Selected Facilities with Add-ons Toggle */}
            {value.length > 0 && (
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Fasilitas Terpilih & Pengaturan Add-ons
                    </label>
                    <div className="rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 p-4 space-y-2">
                        {value.map((selected) => {
                            const facility = facilities.find(
                                (f) => f.id === selected.facility_id
                            );
                            if (!facility) return null;

                            return (
                                <div
                                    key={selected.facility_id}
                                    className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                                >
                                    <div className="flex items-center gap-3 flex-1">
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                                            {facility.name}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        {/* Is Add-ons Toggle */}
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selected.is_add_ons}
                                                onChange={() => toggleAddOns(selected.facility_id)}
                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                                            />
                                            <span className="text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                                Fasilitas Tambahan
                                            </span>
                                        </label>

                                        {/* Remove Button */}
                                        <button
                                            type="button"
                                            onClick={(e) => removeFacility(selected.facility_id, e)}
                                            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}