"use client";

import { DataTablePage } from "@/components/admin/global/DataTablePage";
import { DataTable } from "./data-table";
import { getColumns } from "./columns";
import { useInvoicesList } from "../_hooks/use-invoices-list";

export function InvoicesTable() {
    const {
        data,
        loading,
        search,
        page,
        limit,
        sortOrder,
        pagination,
        setPage,
        handleSearch,
        handleLimit,
        handleSort,
        refetch,
    } = useInvoicesList();

    const columns = getColumns(page, limit);

    return (
        <DataTablePage
            loading={loading}

            search={search}
            onSearch={handleSearch}

            limit={limit}
            onLimitChange={handleLimit}

            sortLabel="Sort by Date"
            sortOrder={sortOrder}
            onSort={() => handleSort("createdAt")}

            page={page}
            pagination={pagination}
            onPageChange={setPage}

            // No delete functionality for invoices
            deleteId={null}
            deleteLoading={false}
            onDeleteConfirm={() => {}}
            onDeleteCancel={() => {}}
        >
            {/* DataTable lokal di-inject sebagai children */}
            <DataTable columns={columns} data={data} />
        </DataTablePage>
    );
}