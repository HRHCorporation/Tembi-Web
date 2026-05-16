"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type Package = {
    id: number;
    name_id: string;
    name_eng: string;
    icon: string;
    minimum_guest: number;
    is_popular: boolean;
    package_name: string;
}

export function getColumns(
    onDelete: (id: number) => void,
    page: number,
    limit: number,
): ColumnDef<Package>[] {
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
            accessorKey: "package_name",
            header: "Package",
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
            header: "Nama Menu (Indonesia)",
        },
        {
            accessorKey: "name_eng",
            header: "Nama Menu (English)",
        },
        {
            accessorKey: "minimum_guest",
            header: "Minimum Guest",
        },
        {
            accessorKey: "is_popular",
            header: "Is Popular",
            cell: ({ row }) => {
                const isPopular = row.original.is_popular;
                return (
                    <span className={isPopular ? "text-green-500" : "text-red-500"}>
                        {isPopular ? "Yes" : "No"}
                    </span>
                );
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const item = row.original;
                return (
                    <div className="flex gap-2">
                        <Link
                            href={`/admin/food/package/edit/${item.id}`}
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