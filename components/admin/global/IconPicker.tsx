"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { FACILITY_ICONS } from "@/components/admin/constants/facility-icons";

interface IconPickerProps {
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

export function IconPicker({ value, onChange, error }: IconPickerProps) {

    const [open, setOpen] = useState(false);
    const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selected = FACILITY_ICONS.find((icon) => icon.value === value);

    // Hitung posisi dropdown mengikuti posisi trigger
    function updatePosition() {
        if (!triggerRef.current) return;
        const rect = triggerRef.current.getBoundingClientRect();
        setDropdownStyle({
            position: "fixed",
            top: rect.bottom + 4,
            left: rect.left,
            width: rect.width,
            zIndex: 99999,
        });
    }

    function handleOpen() {
        updatePosition();
        setOpen((prev) => !prev);
    }

    // Tutup kalau klik di luar
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            const target = e.target as Node;
            if (
                triggerRef.current?.contains(target) ||
                dropdownRef.current?.contains(target)
            ) return;
            setOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Update posisi kalau scroll / resize
    useEffect(() => {
        if (!open) return;
        window.addEventListener("scroll", updatePosition, true);
        window.addEventListener("resize", updatePosition);
        return () => {
            window.removeEventListener("scroll", updatePosition, true);
            window.removeEventListener("resize", updatePosition);
        };
    }, [open]);

    return (
        <div>

            {/* TRIGGER */}
            <button
                ref={triggerRef}
                type="button"
                onClick={handleOpen}
                className={`flex w-full items-center gap-3 rounded border p-3 text-left
                    bg-white text-gray-900
                    dark:bg-gray-700 dark:text-white dark:border-gray-600
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${error ? "border-red-500" : ""}`}
            >
                {selected ? (
                    <>
                        <img
                            src={`/images/icons/${selected.value}`}
                            alt={selected.label}
                            className="h-6 w-6 object-contain"
                        />
                        <span>{selected.label}</span>
                    </>
                ) : (
                    <span className="text-gray-400 dark:text-gray-500">
                        Choose icon...
                    </span>
                )}
                <span className="ml-auto text-gray-400">▾</span>
            </button>

            {/* DROPDOWN via Portal — render di luar semua container */}
            {open && createPortal(
                <div
                    ref={dropdownRef}
                    style={dropdownStyle}
                    className="rounded-lg border shadow-lg
                        bg-white dark:bg-gray-800 dark:border-gray-700
                        max-h-64 overflow-y-auto"
                >
                    {FACILITY_ICONS.map((icon) => (
                        <button
                            key={icon.value}
                            type="button"
                            onClick={() => {
                                onChange(icon.value);
                                setOpen(false);
                            }}
                            className={`flex w-full items-center gap-3 px-4 py-2 text-left
                                hover:bg-gray-100 dark:hover:bg-gray-700
                                ${value === icon.value
                                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                    : "text-gray-900 dark:text-white"
                                }`}
                        >
                            <img
                                src={`/images/icons/${icon.value}`}
                                alt={icon.label}
                                className="h-6 w-6 object-contain"
                            />
                            <span className="text-sm">{icon.label}</span>
                        </button>
                    ))}
                </div>,
                document.body
            )}

            {/* ERROR */}
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}

        </div>
    );
}