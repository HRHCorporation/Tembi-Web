"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type Invoice = {
    id: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    roomName: string;
    roomSlug: string;
    checkInDate: string;
    checkOutDate: string;
    duration: number;
    adults: number;
    children: number;
    totalPrice: number;
    status: string;
    breakfast: number;
    extraBed: number;
    createdAt: string;
    updatedAt: string;
}

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('id-ID', { 
        style: 'currency', 
        currency: 'IDR', 
        minimumFractionDigits: 0 
    }).format(amount);

const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
    });
};

export function getColumns(
    page: number,
    limit: number,
): ColumnDef<Invoice>[] {
    return [
        {
            id: "no",
            header: "No",
            cell: ({ row }) => (
                <span className="font-medium text-gray-600">
                    {(page - 1) * limit + row.index + 1}
                </span>
            ),
        },
        {
            accessorKey: "id",
            header: "Invoice ID",
            cell: ({ row }) => (
                <span className="font-mono font-medium text-gray-700">
                    {row.original.id}
                </span>
            ),
        },
        {
            id: "customer",
            header: "Customer",
            cell: ({ row }) => (
                <div>
                    <div className="font-bold text-gray-800">
                        {row.original.customerName}
                    </div>
                    <div className="text-xs text-gray-500">
                        {row.original.customerEmail}
                    </div>
                </div>
            ),
        },
        {
            accessorKey: "roomName",
            header: "Room",
            cell: ({ row }) => (
                <span className="text-gray-600">
                    {row.original.roomName}
                </span>
            ),
        },
        {
            accessorKey: "checkInDate",
            header: "Check-In",
            cell: ({ row }) => (
                <span className="text-gray-600">
                    {formatDate(row.original.checkInDate)}
                </span>
            ),
        },
        {
            accessorKey: "totalPrice",
            header: "Total",
            cell: ({ row }) => (
                <span className="font-bold text-gray-800">
                    {formatCurrency(row.original.totalPrice)}
                </span>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.original.status;
                const statusStyles = {
                    PAID: "bg-green-100 text-green-700",
                    PENDING: "bg-yellow-100 text-yellow-700",
                    CANCELLED: "bg-red-100 text-red-700",
                    EXPIRED: "bg-gray-100 text-gray-700",
                };

                return (
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusStyles[status as keyof typeof statusStyles] || "bg-gray-100 text-gray-700"}`}>
                        {status}
                    </span>
                );
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const invoice = row.original;
                return (
                    <div className="flex gap-2 justify-center">
                        <Link
                            href={`/admin/invoice/${invoice.id}`}
                            className="rounded-lg bg-tembi px-3 py-1.5 text-black hover:bg-darktembi transition-colors text-sm font-medium"
                        >
                            View Details
                        </Link>
                    </div>
                );
            },
        },
    ];
}