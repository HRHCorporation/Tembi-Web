"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type Collection = {
    id: number;
    name_id: string;
    name_eng: string;
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
            accessorKey: "name_ind",
            header: "Collection Name (Indonesia)",
        },
        {
            accessorKey: "name_eng",
            header: "Collection Name (English)",
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const item = row.original;
                return (
                    <div className="flex gap-2">
                        <Link
                            href={`/admin/collections/master/edit/${item.id}`}
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