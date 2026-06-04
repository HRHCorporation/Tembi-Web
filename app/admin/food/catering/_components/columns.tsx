"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type Catering = {
    id: number;
    name_ind: string;
    name_eng: string;
    minimum_pax: number;
    hours_service_min: number;
    hours_service_max: number;
    type_catering_service: string;
}

export function getColumns(
    onDelete: (id: number) => void,
    page: number,
    limit: number,
): ColumnDef<Catering>[] {
    return [
        {
            id: "no",
            header: "No",
            cell: ({ row }) => (
                <span>
                    {(page - 1) * limit + row.index + 1}
                </span>
            ),
        },
        {
            accessorKey: "type_catering_service",
            header: "Type Catering Service",
        },
        {
            accessorKey: "name_ind",
            header: "Name Catering (Indonesia)",
        },
        {
            accessorKey: "name_eng",
            header: "Name Catering (English)",
        },
        {
            accessorKey: "minimum_pax",
            header: "Minimum Pax",
        },
        {
            accessorKey: "hours_service_min",
            header: "Hours of Service (Min)",
        },
        {
            accessorKey: "hours_service_max",
            header: "Hours of Service (Max)",
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const item = row.original;
                return (
                    <div className="flex gap-2">
                        <Link
                            href={`/admin/food/catering/edit/${item.id}`}
                            className="rounded bg-blue-500 px-3 py-1 text-white"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => onDelete(item.id)}
                            className="rounded bg-red-500 px-3 py-1 text-white cursor-pointer"
                        >
                            Delete
                        </button>
                    </div>
                );
            },
        },
    ];
}