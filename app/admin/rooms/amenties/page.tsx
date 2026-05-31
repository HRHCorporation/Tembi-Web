import Link from "next/link";
import { AmentiesTable } from "./_components/tiers-amenties-table";

export default function AmentiesPage() {

    return (
        <div className="space-y-5">

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-2xl font-bold">
                        Amenities
                    </h1>

                    <p className="text-gray-500">
                        Data Amenities
                    </p>
                </div>

                {/* BUTTON CREATE */}
                <Link
                    href="/admin/rooms/amenties/create"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    + Tambah Fasilitas
                </Link>

            </div>

            {/* TABLE */}
            <AmentiesTable />

        </div>
    );
}