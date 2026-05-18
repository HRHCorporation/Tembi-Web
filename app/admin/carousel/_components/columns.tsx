"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type Carousel = {
    id: number;
    title_ind: string;
    title_eng: string;
    is_active: boolean;
};

export function getColumns(
    onDelete: (id: number) => void,
    page: number,
    limit: number,
): ColumnDef<Carousel>[] {
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
            accessorKey: "title_ind",
            header: "Title Indonesia",
        },
        {
            accessorKey: "title_eng",
            header: "Title English",
        },
        {
            accessorKey: "is_active",
            header: "Status",
            cell: ({ row }) => row.original.is_active
                ? <span className="text-green-600 font-medium">Active</span>
                : <span className="text-red-500 font-medium">Inactive</span>,
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const item = row.original;
                return (
                    <div className="flex gap-2">
                        <Link
                            href={`/admin/carousel/edit/${item.id}`}
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