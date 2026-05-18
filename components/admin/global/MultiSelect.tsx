"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export interface SelectOption {
    value: number;
    label: string;
}

interface MultiSelectProps {
    options: SelectOption[];
    value: number[];
    onChange: (value: number[]) => void;
    placeholder?: string;
    error?: string;
}

export function MultiSelect({
    options,
    value,
    onChange,
    placeholder = "Pilih...",
    error,
}: MultiSelectProps) {

    const [open, setOpen] = useState(false);
    const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedLabels = options
        .filter((opt) => value.includes(opt.value))
        .map((opt) => opt.label);

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

    function toggleOption(optValue: number) {
        if (value.includes(optValue)) {
            onChange(value.filter((v) => v !== optValue));
        } else {
            onChange([...value, optValue]);
        }
    }

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
                className={`flex w-full min-h-[46px] flex-wrap items-center gap-1.5 rounded border p-2 text-left
                    bg-white text-gray-900
                    dark:bg-gray-700 dark:text-white dark:border-gray-600
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${error ? "border-red-500" : ""}`}
            >
                {selectedLabels.length > 0 ? (
                    <>
                        {value.map((val) => {
                            const opt = options.find((o) => o.value == val);
                            return (
                                <span
                                    key={val}  // ← Unique, bukan dari index
                                    className="rounded bg-blue-100 px-2 py-0.5 text-sm text-blue-700
                                        dark:bg-blue-900/40 dark:text-blue-300"
                                >
                                    {opt?.label}
                                </span>
                            );
                        })}
                    </>
                ) : (
                    <span className="px-1 text-gray-400 dark:text-gray-500">
                        {placeholder}
                    </span>
                )}
                <span className="ml-auto pl-2 text-gray-400">▾</span>
            </button>

            {/* DROPDOWN via Portal */}
            {open && createPortal(
                <div
                    ref={dropdownRef}
                    style={dropdownStyle}
                    className="rounded-lg border shadow-lg
                        bg-white dark:bg-gray-800 dark:border-gray-700
                        max-h-60 overflow-y-auto"
                >
                    {options.length === 0 ? (
                        <div className="px-4 py-3 text-sm text-gray-400">
                            Tidak ada data
                        </div>
                    ) : (
                        options.map((opt) => {
                            const isSelected = value.includes(opt.value);
                            return (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => toggleOption(opt.value)}
                                    className={`flex w-full items-center gap-3 px-4 py-2 text-left text-sm
                                        hover:bg-gray-100 dark:hover:bg-gray-700
                                        ${isSelected
                                            ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                            : "text-gray-900 dark:text-white"
                                        }`}
                                >
                                    {/* Checkbox visual */}
                                    <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border
                                        ${isSelected
                                            ? "border-blue-500 bg-blue-500"
                                            : "border-gray-300 dark:border-gray-500"
                                        }`}
                                    >
                                        {isSelected && (
                                            <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none">
                                                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </span>
                                    {opt.label}
                                </button>
                            );
                        })
                    )}
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