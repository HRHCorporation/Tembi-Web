"use client";

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import type { ColumnDef } from "@tanstack/react-table";

interface DataTableProps<TData> {
    columns: ColumnDef<TData>[];
    data: TData[];
}

export function DataTable<TData>({
    columns,
    data,
}: DataTableProps<TData>) {

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="rounded-lg border bg-white p-4
            dark:bg-gray-800 dark:border-gray-700">

            <table className="w-full border-collapse">

                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}
                            className="dark:bg-gray-700">
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="border-b p-3 text-left
                                        text-gray-700 bg-gray-50
                                        dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600"
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {table.getRowModel().rows.length === 0 ? (

                        // EMPTY STATE
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="p-10 text-center text-gray-400 dark:text-gray-500"
                            >
                                Tidak ada data
                            </td>
                        </tr>

                    ) : (

                        table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className="border-b p-3
                                            text-gray-900
                                            dark:text-gray-200 dark:border-gray-700"
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))

                    )}
                </tbody>

            </table>

        </div>
    );
}