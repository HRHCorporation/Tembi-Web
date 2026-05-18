"use client";

import { DataTablePage } from "@/components/admin/global/DataTablePage";
import { DataTable } from "./data-table";
import { getColumns } from "./columns";
import { usePackageList } from "../_hooks/use-tiers-package-food";
import { useDeletePackageRoom } from "../_hooks/use-delete-package-food";

export function PackageTable() {

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
    } = usePackageList();


    const {
        deleteId,
        loading: deleteLoading,
        confirmDelete,
        cancelDelete,
        handleDelete,
    } = useDeletePackageRoom(refetch);

    const columns = getColumns(confirmDelete, page, limit);

    return (
        <DataTablePage
            loading={loading}

            search={search}
            onSearch={handleSearch}

            limit={limit}
            onLimitChange={handleLimit}

            sortLabel="Sort Title"
            sortOrder={sortOrder}
            onSort={() => handleSort("title_ind")}

            page={page}
            pagination={pagination}
            onPageChange={setPage}

            deleteId={deleteId}
            deleteLoading={deleteLoading}
            onDeleteConfirm={handleDelete}
            onDeleteCancel={cancelDelete}
        >
            {/* DataTable lokal di-inject sebagai children */}
            <DataTable columns={columns} data={data} />
        </DataTablePage>
    );
}