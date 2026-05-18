"use client";

import { useEffect, useState } from "react";

// ✅ Update interface untuk numeric values
export interface SelectOption {
    value: number; // ← UBAH dari string ke number
    label: string;
}

interface OptionListState {
    mattresses: SelectOption[];
    facilities: SelectOption[];
    policies: SelectOption[];
    rules: SelectOption[];
    tiers: SelectOption[];
}

export function useOptionList() {
    const [options, setOptions] = useState<OptionListState>({
        mattresses: [],
        facilities: [],
        policies: [],
        rules: [],
        tiers: [],
    });

    useEffect(() => {
        async function fetchAll() {
            const [mattressRes, facilityRes, policyRes, ruleRes, tiers] = await Promise.all([
                fetch("/api/admin/rooms/master/mattress/options"),
                fetch("/api/admin/rooms/master/fasilities/options"),
                fetch("/api/admin/rooms/master/policies/options"),
                fetch("/api/admin/rooms/master/homerules/options"),
                fetch("/api/admin/rooms/master/tiers/options"),
            ]);

            const [mattressData, facilityData, policyData, ruleData, tierData] = await Promise.all([
                mattressRes.json(),
                facilityRes.json(),
                policyRes.json(),
                ruleRes.json(),
                tiers.json(),
            ]);

            setOptions({
                // ✅ API sudah return value & label, gunakan langsung
                mattresses: mattressData.data ?? [],
                facilities: facilityData.data ?? [],
                policies: policyData.data ?? [],
                rules: ruleData.data ?? [],
                tiers: tierData.data ?? [],
            });
        }

        fetchAll();
    }, []);

    return options;
}