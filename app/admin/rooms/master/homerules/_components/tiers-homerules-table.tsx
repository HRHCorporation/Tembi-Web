"use client";

import { DataTablePage } from "@/components/admin/global/DataTablePage";
import { DataTable } from "./data-table";
import { getColumns } from "./columns";
import { useHomeRuleList } from "../_hooks/use-tiers-homerules-list";
import { useDeleteHomeRuleRoom } from "../_hooks/use-delete-homerules-room";

export function HomeRuleTable() {

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
    } = useHomeRuleList();


    const {
        deleteId,
        loading: deleteLoading,
        confirmDelete,
        cancelDelete,
        handleDelete,
    } = useDeleteHomeRuleRoom(refetch);

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