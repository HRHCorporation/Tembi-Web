"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type Room = {
    id: number;
    title_ind: string;
    title_eng: string;
    room_price: number;
    number_guest: number;
    mattress_name: string;
    tiers_name: string;
    is_recomendation: number;
}

export function getColumns(
    onDelete: (id: number) => void,
    page: number,
    limit: number,
): ColumnDef<Room>[] {
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
            header: "Title (Indonesia)",
        },
        {
            accessorKey: "title_eng",
            header: "Title (English)",
        },
        {
            accessorKey: "room_price",
            header: "Room Price",
            cell: ({ row }) => (
                <span>
                    Rp {new Intl.NumberFormat('id-ID').format(row.original.room_price)}
                </span>
            ),
        },
        {
            accessorKey: "number_guest",
            header: "Number of Guests",
        },
        {
            accessorKey: "mattress_name",
            header: "Mattress Name",
        },
        {
            accessorKey: "tiers_name",
            header: "Tiers Name",
        },
        {
            accessorKey: "is_recomendation",
            header: "Is Recommendation",
            cell: ({ row }) => (
                <span>
                    {row.original.is_recomendation ? "Yes" : "No"}
                </span>
            ),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const item = row.original;
                return (
                    <div className="flex gap-2">
                        <Link
                            href={`/admin/rooms/main/edit/${item.id}`}
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