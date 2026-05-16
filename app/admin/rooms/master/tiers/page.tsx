import Link from "next/link";
import { TiersRoomTable } from "./_components/tiers-room-table";

export default function TiersPage() {

    return (
        <div className="space-y-5">

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-2xl font-bold">
                        Tiers Room
                    </h1>

                    <p className="text-gray-500">
                        Data tiers room
                    </p>
                </div>

                {/* BUTTON CREATE */}
                <Link
                    href="/admin/rooms/master/tiers/create"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    + Tambah Tiers Room
                </Link>

            </div>

            {/* TABLE */}
            <TiersRoomTable />

        </div>
    );
}