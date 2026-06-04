"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type Celebrate = {
    id: number;
    name_id: string;
    name_eng: string;
    description_ind: string;
    description_eng: string;
}

export function getColumns(
    onDelete: (id: number) => void,
    page: number,
    limit: number,
): ColumnDef<Celebrate>[] {
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
            header: "Celebrate Name (Indonesia)",
        },
        {
            accessorKey: "name_eng",
            header: "Celebrate Name (English)",
        },
        {
            accessorKey: "description_ind",
            header: "Celebrate Description (Indonesia)",
        },
        {
            accessorKey: "description_eng",
            header: "Celebrate Description (English)",
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const item = row.original;
                return (
                    <div className="flex gap-2">
                        <Link
                            href={`/admin/celebrate/edit/${item.id}`}
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