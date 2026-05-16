"use client";

import { useRouter } from "next/navigation";

interface FormActionsProps {
    loading?: boolean;
    onCancel?: () => void;         // default: router.back()
    cancelLabel?: string;
    submitLabel?: string;
    loadingLabel?: string;
}

export function FormActions({
    loading = false,
    onCancel,
    cancelLabel = "Cancel",
    submitLabel = "Save",
    loadingLabel = "Menyimpan...",
}: FormActionsProps) {

    const router = useRouter();

    return (
        <div className="flex justify-end gap-3">
            <button
                type="button"
                onClick={onCancel ?? (() => router.back())}
                className="rounded-lg border px-4 py-2 cursor-pointer
                    text-gray-700 hover:bg-gray-100
                    dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
            >
                {cancelLabel}
            </button>
            <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white cursor-pointer
                    disabled:opacity-50 hover:bg-blue-700
                    dark:bg-blue-500 dark:hover:bg-blue-600"
            >
                {loading ? loadingLabel : submitLabel}
            </button>
        </div>
    );
}