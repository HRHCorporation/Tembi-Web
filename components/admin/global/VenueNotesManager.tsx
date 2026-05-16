"use client";

interface VenueNote {
    id?: number;
    description_ind: string;
    description_eng: string;
}

interface VenueNotesManagerProps {
    value: VenueNote[];
    onChange: (value: VenueNote[]) => void;
    onDelete?: (index: number) => void;
    error?: string;
}

export function VenueNotesManager({ value, onChange, onDelete, error }: VenueNotesManagerProps) {
    function handleAddNote() {
        onChange([
            ...value,
            {
                description_ind: "",
                description_eng: "",
            },
        ]);
    }

    function handleUpdateNote(
        index: number,
        field: keyof VenueNote,
        fieldValue: string
    ) {
        const updated = value.map((note, i) =>
            i === index ? { ...note, [field]: fieldValue } : note
        );
        onChange(updated);
    }

    function handleRemoveNote(index: number) {
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
                <label className="font-medium text-gray-700 dark:text-gray-300">Venue Notes</label>
                <button
                    type="button"
                    onClick={handleAddNote}
                    className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                >
                    + Tambah Note
                </button>
            </div>

            {value.length > 0 && (
                <div className="space-y-3">
                    {value.map((note, index) => (
                        <div
                            key={index}
                            className="rounded-lg border border-gray-200 dark:border-gray-600 p-4 space-y-3"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <label className="font-medium text-sm text-gray-700 dark:text-gray-300">
                                    Note {index + 1}
                                </label>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveNote(index)}
                                    className="rounded bg-red-500/10 px-2 py-1 text-xs text-red-600 hover:bg-red-500/20"
                                >
                                    Hapus
                                </button>
                            </div>

                            {/* Description Indonesia */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Deskripsi (Indonesia)
                                </label>
                                <textarea
                                    value={note.description_ind}
                                    onChange={(e) =>
                                        handleUpdateNote(index, "description_ind", e.target.value)
                                    }
                                    className="w-full rounded border p-2 text-sm bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                    placeholder="Masukkan catatan dalam bahasa Indonesia"
                                    rows={3}
                                />
                            </div>

                            {/* Description English */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Deskripsi (English)
                                </label>
                                <textarea
                                    value={note.description_eng}
                                    onChange={(e) =>
                                        handleUpdateNote(index, "description_eng", e.target.value)
                                    }
                                    className="w-full rounded border p-2 text-sm bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                    placeholder="Enter note in English"
                                    rows={3}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}