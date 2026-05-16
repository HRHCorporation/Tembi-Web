import Link from "next/link";
import { CollectionTable } from "./_components/tiers-collection-table";

export default function CollectionPage() {

    return (
        <div className="space-y-5">

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-2xl font-bold">
                        Collection
                    </h1>

                    <p className="text-gray-500">
                        Data Collection
                    </p>
                </div>

                {/* BUTTON CREATE */}
                <Link
                    href="/admin/collections/main/create"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    + Tambah Collections
                </Link>

            </div>

            {/* TABLE */}
            <CollectionTable />

        </div>
    );
}