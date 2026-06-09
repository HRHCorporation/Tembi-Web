"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { FACILITY_ICONS } from "@/components/admin/constants/facility-icons";

export type Policy = {
    id: number;
    icon: string;
    name_ind: string;
    name_eng: string;
    type: string;
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
                const iconValue = row.original.icon;
                const facilityIcon = FACILITY_ICONS.find((f) => f.value === iconValue);

                if (!facilityIcon) {
                    return <span className="text-gray-400 text-xs">No icon</span>;
                }

                const IconComponent = facilityIcon.icon;

                return (
                    <IconComponent
                        size={28}
                        color={facilityIcon.color}
                        weight={facilityIcon.weight}
                    />
                );
            },
        },
        {
            accessorKey: "name_ind",
            header: "Policy Name (Indonesia)",
        },
        {
            accessorKey: "name_eng",
            header: "Policy Name (English)",
        },
        {
            accessorKey: "type",
            header: "Type",
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const item = row.original;
                return (
                    <div className="flex gap-2">
                        <Link
                            href={`/admin/rooms/master/policies/edit/${item.id}`}
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