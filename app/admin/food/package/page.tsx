import Link from "next/link";
import { PackageTable } from "./_components/tiers-package-table";

export default function PackagePage() {

    return (
        <div className="space-y-5">

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-2xl font-bold">
                        Package
                    </h1>

                    <p className="text-gray-500">
                        Data Package
                    </p>
                </div>

                {/* BUTTON CREATE */}
                <Link
                    href="/admin/food/package/create"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    + Tambah Package
                </Link>

            </div>

            {/* TABLE */}
            <PackageTable />

        </div>
    );
}