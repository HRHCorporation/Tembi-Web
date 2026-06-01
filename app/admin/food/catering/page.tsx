import Link from "next/link";
import { CateringTable } from "./_components/tiers-catering-table";

export default function CateringPage() {

    return (
        <div className="space-y-5">

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-2xl font-bold">
                        Catering
                    </h1>

                    <p className="text-gray-500">
                        Data Catering Page
                    </p>
                </div>

                {/* BUTTON CREATE */}
                <Link
                    href="/admin/food/catering/create"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    + Add Catering
                </Link>

            </div>

            {/* TABLE */}
            <CateringTable />

        </div>
    );
}