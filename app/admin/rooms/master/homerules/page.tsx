import Link from "next/link";
import { HomeRuleTable } from "./_components/tiers-homerules-table";

export default function HomeRulesPage() {

    return (
        <div className="space-y-5">

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-2xl font-bold">
                        Home Rules
                    </h1>

                    <p className="text-gray-500">
                        Data home rules
                    </p>
                </div>

                {/* BUTTON CREATE */}
                <Link
                    href="/admin/rooms/master/homerules/create"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    + Tambah Home Rule
                </Link>

            </div>

            {/* TABLE */}
            <HomeRuleTable />

        </div>
    );
}