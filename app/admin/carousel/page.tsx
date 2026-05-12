import Link from "next/link";

import { CarouselTable }
    from "./_components/carousel-table";

export default function CarouselPage() {

    return (
        <div className="space-y-5">

            {/* HEADER */}
            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-2xl font-bold">
                        Carousel
                    </h1>

                    <p className="text-gray-500">
                        Data carousel website
                    </p>
                </div>

                {/* BUTTON CREATE */}
                <Link
                    href="/admin/carousel/create"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    + Tambah Carousel
                </Link>

            </div>

            {/* TABLE */}
            <CarouselTable />

        </div>
    );
}