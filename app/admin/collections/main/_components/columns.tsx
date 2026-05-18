"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type Collection = {
    id: number;
    name_ind: string;
    name_eng: string;
    mstr_collection_name: string;
}

export function getColumns(
    onDelete: (id: number) => void,
    page: number,
    limit: number,
): ColumnDef<Collection>[] {
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
            accessorKey: "mstr_collection_name",
            header: "Master Collection (Indonesia)",
        },
        {
            accessorKey: "name_ind",
            header: "Nama Collection (Indonesia)",
        },
        {
            accessorKey: "name_eng",
            header: "Nama Collection (English)",
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const item = row.original;
                return (
                    <div className="flex gap-2">
                        <Link
                            href={`/admin/collections/main/edit/${item.id}`}
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