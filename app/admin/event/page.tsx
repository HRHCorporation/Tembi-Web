import Link from "next/link";
import { EventTable } from "./_components/tiers-event-table";

export default function EventPage() {

    return (
        <div className="space-y-5">

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-2xl font-bold">
                        Event
                    </h1>

                    <p className="text-gray-500">
                        Data Event room
                    </p>
                </div>

                {/* BUTTON CREATE */}
                <Link
                    href="/admin/event/create"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    + Tambah Event
                </Link>

            </div>

            {/* TABLE */}
            <EventTable />

        </div>
    );
}