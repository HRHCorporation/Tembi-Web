import Link from "next/link";
import { BlogsTable } from "./_components/tiers-blogs-table";

export default function BlogsPage() {

    return (
        <div className="space-y-5">

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-2xl font-bold">
                        Blog
                    </h1>

                    <p className="text-gray-500">
                        Data Blog
                    </p>
                </div>

                {/* BUTTON CREATE */}
                <Link
                    href="/admin/blogs/create"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    + Add Blog
                </Link>

            </div>

            {/* TABLE */}
            <BlogsTable />

        </div>
    );
}