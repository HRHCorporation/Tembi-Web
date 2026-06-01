"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type Policy = {
    id: number;
    icon: string;
    name_ind: string;
    name_eng: string;
    type: string;
    is_addition: number;
}

export function getColumns(
    onDelete: (id: number) => void,
    page: number,
    limit: number,
): ColumnDef<Policy>[] {
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
            accessorKey: "icon",
            header: "Icon",
            cell: ({ row }) => {
                const iconUrl = row.original.icon;
                return (
                    <img
                        src={`/images/icons/${iconUrl}`}
                        alt="Fasilitas Icon"
                        className="w-10 h-10 object-contain rounded"
                    />
                );
            },
        },
        {
            accessorKey: "name_ind",
            header: "Amenities Name (Indonesia)",
        },
        {
            accessorKey: "name_eng",
            header: "Amenities Name (English)",
        },
        {
            accessorKey: "is_addition",
            header: "Additional",
            cell: ({ row }) => {
                const isAddition = Boolean(row.original.is_addition); // ← pakai Boolean()
                return <span>{isAddition ? "Yes" : "No"}</span>;
            }
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const item = row.original;
                return (
                    <div className="flex gap-2">
                        <Link
                            href={`/admin/rooms/amenties/edit/${item.id}`}
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