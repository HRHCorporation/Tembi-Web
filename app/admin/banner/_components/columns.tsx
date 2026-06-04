"use client";

import Banner from "@/feature/core/banner/domain/entity/banner.entity";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export function getColumns(
	onDelete: (id: number) => void,
	page: number,
	limit: number,
): ColumnDef<Banner>[] {
	return [
		{
			id: "no",
			header: "No",
			cell: ({ row }) => <span>{(page - 1) * limit + row.index + 1}</span>,
		},
		{
			accessorKey: "name_page",
			header: "Page Name (Indonesia)",
		},
		{
			accessorKey: "title_ind",
			header: "Title Banner (Indonesia)",
		},
		{
			accessorKey: "title_eng",
			header: "Title Banner (English)",
		},
		{
			id: "actions",
			header: "Actions",
			cell: ({ row }) => {
				const item = row.original;
				return (
					<div className="flex gap-2">
						<Link
							href={`/admin/banner/edit/${item.id}`}
							className="rounded bg-blue-500 px-3 py-1 text-white"
						>
							Edit
						</Link>
					</div>
				);
			},
		},
	];
}
