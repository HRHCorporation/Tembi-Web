import Link from "next/link";
import { PackageTable } from "./_components/tiers-highlight-table";

export default function PackagePage() {

    return (
        <div className="space-y-5">

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-2xl font-bold">
                        Menu Highlight
                    </h1>

                    <p className="text-gray-500">
                        Data Menu Highlight
                    </p>
                </div>

                {/* BUTTON CREATE */}
                <Link
                    href="/admin/food/highlight/create"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    + Add Menu Highlight
                </Link>

            </div>

            {/* TABLE */}
            <PackageTable />

        </div>
    );
}