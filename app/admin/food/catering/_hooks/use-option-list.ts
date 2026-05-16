"use client";

import { useEffect, useState } from "react";

// ✅ Update interface untuk numeric values
export interface SelectOption {
    value: number; // ← UBAH dari string ke number
    label: string;
}

interface OptionListState {
    type_catering_service: SelectOption[];
}

export function useOptionList() {
    const [options, setOptions] = useState<OptionListState>({
        type_catering_service: [],
    });

    useEffect(() => {
        async function fetchAll() {
            const [typeCateringData] = await Promise.all([
                fetch("/api/admin/rooms/master/type-catering-service/options"),
            ]);

            const [type_catering_service] = await Promise.all([
                typeCateringData.json(),
            ]);

            setOptions({
                // ✅ API sudah return value & label, gunakan langsung
                type_catering_service: type_catering_service.data ?? [],
            });
        }

        fetchAll();
    }, []);

    return options;
}