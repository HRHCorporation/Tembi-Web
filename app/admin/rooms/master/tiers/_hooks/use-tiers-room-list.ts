"use client";

import { useCallback, useEffect, useState } from "react";

export function useTiersRoomList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [sortBy, setSortBy] = useState("id");
    const [sortOrder, setSortOrder] = useState("DESC");
    const [pagination, setPagination] = useState({
        total: 0,
        totalPages: 1,
    });

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(
                `/api/admin/rooms/master/tiers?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}`
            );
            const result = await res.json();
            if (result.success) {
                setData(result.data);
                setPagination(result.pagination);
            }
        } catch (error) {
            console.error(error);
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