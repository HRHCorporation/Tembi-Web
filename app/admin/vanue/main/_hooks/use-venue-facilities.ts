"use client";

import { useState, useEffect } from "react";

interface FacilityOption {
    value: number;
    label: string;
}

export function useVenueFacilities() {
    const [facilities, setFacilities] = useState<FacilityOption[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFacilities() {
            try {
                const res = await fetch("/api/admin/vanue/facilities-list");
                const result = await res.json();

                if (result.success && Array.isArray(result.data)) {
                    setFacilities(result.data);
                }
            } catch (error) {
                console.error("Error fetching facilities:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchFacilities();
    }, []);

    return { facilities, loading };
}