import Link from "next/link";
import { MattressTable } from "./_components/tiers-matterss-table";

export default function MattressPage() {

    return (
        <div className="space-y-5">

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-2xl font-bold">
                        Mattress
                    </h1>

                    <p className="text-gray-500">
                        Data Mattress
                    </p>
                </div>

                {/* BUTTON CREATE */}
                <Link
                    href="/admin/rooms/master/mattress/create"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    + Add Mattress
                </Link>

            </div>

            {/* TABLE */}
            <MattressTable />

        </div>
    );
}