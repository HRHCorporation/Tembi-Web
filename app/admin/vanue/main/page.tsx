import Link from "next/link";
import { VanueTable } from "./_components/tiers-vanue-table";

export default function VanuePage() {

    return (
        <div className="space-y-5">

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-2xl font-bold">
                        Vanue
                    </h1>

                    <p className="text-gray-500">
                        Data vanue
                    </p>
                </div>

                {/* BUTTON CREATE */}
                <Link
                    href="/admin/vanue/main/create"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    + Tambah Vanue
                </Link>

            </div>

            {/* TABLE */}
            <VanueTable />

        </div>
    );
}