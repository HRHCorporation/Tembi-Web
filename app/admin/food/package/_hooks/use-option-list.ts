"use client";

import { useEffect, useState } from "react";

// ✅ Update interface untuk numeric values
export interface SelectOption {
    value: number; // ← UBAH dari string ke number
    label: string;
}

interface OptionListState {
    catering: SelectOption[];
}

export function useOptionList() {
    const [options, setOptions] = useState<OptionListState>({
        catering: [],
    });

    useEffect(() => {
        async function fetchAll() {
            const [cateringData] = await Promise.all([
                fetch("/api/admin/food/catering/options"),
            ]);

            const [catering] = await Promise.all([
                cateringData.json(),
            ]);

            setOptions({
                // ✅ API sudah return value & label, gunakan langsung
                catering: catering.data ?? [],
            });
        }

        fetchAll();
    }, []);

    return options;
}