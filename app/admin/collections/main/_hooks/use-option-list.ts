"use client";

import { useEffect, useState } from "react";

// ✅ Update interface untuk numeric values
export interface SelectOption {
    value: number; // ← UBAH dari string ke number
    label: string;
}

interface OptionListState {
    collection: SelectOption[];
}

export function useOptionList() {
    const [options, setOptions] = useState<OptionListState>({
        collection: [],
    });

    useEffect(() => {
        async function fetchAll() {
            const [collectionData] = await Promise.all([
                fetch("/api/admin/collections/main/options"),
            ]);

            const [collection] = await Promise.all([
                collectionData.json(),
            ]);

            setOptions({
                // ✅ API sudah return value & label, gunakan langsung
                collection: collection.data ?? [],
            });
        }

        fetchAll();
    }, []);

    return options;
}