import Link from "next/link";
import { MasterCollectionTable } from "./_components/tiers-collection-table";

export default function MasteCollectionPage() {

    return (
        <div className="space-y-5">

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-2xl font-bold">
                        Master Collection
                    </h1>

                    <p className="text-gray-500">
                        Data Master Collection
                    </p>
                </div>

                {/* BUTTON CREATE */}
                <Link
                    href="/admin/collections/master/create"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    + Tambah Collections
                </Link>

            </div>

            {/* TABLE */}
            <MasterCollectionTable />

        </div>
    );
}