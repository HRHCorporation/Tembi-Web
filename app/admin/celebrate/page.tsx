import Link from "next/link";
import { CelebrateTable } from "./_components/tiers-celebrate-table";

export default function CelebratePage() {

    return (
        <div className="space-y-5">

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-2xl font-bold">
                        Celebrate
                    </h1>

                    <p className="text-gray-500">
                        Data Celebrate
                    </p>
                </div>

                {/* BUTTON CREATE */}
                <Link
                    href="/admin/celebrate/create"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    + Add Celebrate
                </Link>

            </div>

            {/* TABLE */}
            <CelebrateTable />

        </div>
    );
}