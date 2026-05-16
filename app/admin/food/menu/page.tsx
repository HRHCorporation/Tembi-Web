import Link from "next/link";
import { MenuTable } from "./_components/tiers-menu-table";

export default function MenuPage() {

    return (
        <div className="space-y-5">

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-2xl font-bold">
                        Our Menu
                    </h1>

                    <p className="text-gray-500">
                        Data Our Menu
                    </p>
                </div>

                {/* BUTTON CREATE */}
                <Link
                    href="/admin/food/menu/create"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    + Tambah Menu
                </Link>

            </div>

            {/* TABLE */}
            <MenuTable />

        </div>
    );
}