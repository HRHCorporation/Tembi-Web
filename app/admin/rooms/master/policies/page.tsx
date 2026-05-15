import Link from "next/link";
import { PolicyTable } from "./_components/tiers-fasilities-table";

export default function PoliciesPage() {

    return (
        <div className="space-y-5">

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-2xl font-bold">
                        Kebijakan
                    </h1>

                    <p className="text-gray-500">
                        Data kebijakan room
                    </p>
                </div>

                {/* BUTTON CREATE */}
                <Link
                    href="/admin/rooms/master/policies/create"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    + Tambah Kebijakan
                </Link>

            </div>

            {/* TABLE */}
            <PolicyTable />

        </div>
    );
}