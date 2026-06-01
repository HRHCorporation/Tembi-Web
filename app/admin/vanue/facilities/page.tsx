import Link from "next/link";
import { FasilityTable } from "./_components/tiers-fasilities-table";

export default function FasilitiesPage() {

    return (
        <div className="space-y-5">

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-2xl font-bold">
                        Venue Facilities
                    </h1>

                    <p className="text-gray-500">
                        Data Venue Facilities
                    </p>
                </div>

                {/* BUTTON CREATE */}
                <Link
                    href="/admin/vanue/facilities/create"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    + Add Venue Facilities
                </Link>

            </div>

            {/* TABLE */}
            <FasilityTable />

        </div>
    );
}