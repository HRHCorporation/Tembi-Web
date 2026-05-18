import Link from "next/link";
import { BannerTable } from "./_components/tiers-banner-page-table";

export default function BannerPage() {

    return (
        <div className="space-y-5">

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-2xl font-bold">
                        Setting Banner Page
                    </h1>

                    <p className="text-gray-500">
                        Data Banner Page
                    </p>
                </div>

            </div>

            {/* TABLE */}
            <BannerTable />

        </div>
    );
}