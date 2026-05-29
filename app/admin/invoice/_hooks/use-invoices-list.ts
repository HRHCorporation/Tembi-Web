"use client";

import { useCallback, useEffect, useState } from "react";

interface Booking {
    id: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    roomName: string;
    roomSlug: string;
    checkInDate: string;
    checkOutDate: string;
    duration: number;
    adults: number;
    children: number;
    totalPrice: number;
    status: string;
    breakfast: number;
    extraBed: number;
    createdAt: string;
    updatedAt: string;
}

interface Pagination {
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
}

export function useInvoicesList() {
    const [data, setData] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("DESC");
    const [pagination, setPagination] = useState<Pagination>({
        total: 0,
        totalPages: 1,
        currentPage: 1,
        limit: 10,
    });

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(
                `/api/admin/invoice?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}`
            );
            const result = await res.json();
            
            if (result.success) {
                setData(result.data);
                setPagination(result.pagination);
            } else {
                console.error("Failed to fetch invoices:", result.message);
            }
        } catch (error) {
            console.error("Error fetching invoices:", error);
        } finally {
            setLoading(false);
        }
    }, [page, limit, search, sortBy, sortOrder]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    function handleSearch(value: string) {
        setSearch(value);
        setPage(1);
    }

    function handleLimit(value: number) {
        setLimit(value);
        setPage(1);
    }

    function handleSort(field: string) {
        if (sortBy === field) {
            setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
        } else {
            setSortBy(field);
            setSortOrder("DESC");
        }
    }

    return {
        data,
        loading,
        search,
        page,
        limit,
        sortBy,
        sortOrder,
        pagination,
        setPage,
        handleSearch,
        handleLimit,
        handleSort,
        refetch: fetchData,
    };
}