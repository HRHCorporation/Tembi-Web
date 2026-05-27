import { InvoicesTable } from "./_components/invoices-table";


export default function InvoicesPage() {
    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">
                        Booking Invoices
                    </h1>

                    <p className="text-gray-500">
                        Manage all booking invoices and payments
                    </p>
                </div>

                {/* Optional: Export/Filter buttons bisa ditambahkan di sini */}
            </div>

            {/* TABLE */}
            <InvoicesTable />
        </div>
    );
}