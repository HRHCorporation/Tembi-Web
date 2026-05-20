"use client";

import { useState, useEffect } from "react";

interface Facility {
    id: number;
    name: string;
}

export function useVenueFacilities() {
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFacilities() {
            try {
                const res = await fetch("/api/admin/vanue/facilities-list");
                const result = await res.json();

                if (result.success && Array.isArray(result.data)) {
                    // Transform dari {value, label} ke {id, name}
                    const transformedData = result.data.map((item: { value: number; label: string }) => ({
                        id: item.value,
                        name: item.label,
                    }));
                    setFacilities(transformedData);
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