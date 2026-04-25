// app/admin/invoices/[id]/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Printer, CheckCircle, XCircle, Clock } from 'lucide-react';

const formatCurrency = (amount: number) => 
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

const formatDate = (dateString: string) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
};

const ADDONS_PRICE = { breakfast: 50000, extrabed: 150000 };

export default function InvoiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`/api/admin/invoices/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setBooking(data.data);
        } else {
          router.push('/admin/invoices');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [params.id, router]);

  if (loading) return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  if (!booking) return <div className="min-h-screen flex justify-center items-center">Invoice not found</div>;

  const duration = booking.duration || 1;

  return (
    // --- PERBAIKAN: Ubah p-8 menjadi p-8 pt-28 agar tidak tertutup header ---
    <div className="min-h-screen bg-gray-50 p-8 pt-28 font-sans">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => router.back()} className="flex items-center text-gray-500 hover:text-tembi mb-6 transition-colors">
          <ArrowLeft size={18} className="mr-2"/> Back to Invoices
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          
          {/* Header Status */}
          <div className="bg-gray-900 text-white p-8 flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Invoice ID</p>
              <h1 className="text-3xl font-mono font-bold">{booking.id}</h1>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm
              ${booking.status === 'PAID' ? 'bg-green-500 text-white' : 
                booking.status === 'PENDING' ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white'}`}>
              {booking.status}
            </div>
          </div>

          <div className="p-8">
            {/* Customer & Stay Info Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-10 border-b border-gray-100 pb-10">
              <div>
                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-4">Customer Details</h3>
                <p className="text-xl font-bold text-gray-800 mb-1">{booking.customerName}</p>
                <p className="text-gray-600 mb-1">{booking.customerEmail}</p>
                <p className="text-gray-600">{booking.customerPhone}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-4">Stay Information</h3>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Check-In</span>
                  <span className="font-semibold">{formatDate(booking.checkInDate)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Check-Out</span>
                  <span className="font-semibold">{formatDate(booking.checkOutDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Guests</span>
                  <span className="font-semibold">{booking.adults} Adults, {booking.children} Kids</span>
                </div>
              </div>
            </div>

            {/* Payment Items */}
            <h3 className="text-gray-800 font-bold text-lg mb-4">Payment Summary</h3>
            <div className="space-y-3 mb-6">
              {/* Room Charge */}
              <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                <div>
                  <p className="font-bold text-gray-800">{booking.roomName}</p>
                  <p className="text-sm text-gray-500">{formatCurrency(booking.roomPrice)} x {duration} nights</p>
                </div>
                <span className="font-semibold text-gray-700">{formatCurrency(booking.roomPrice * duration)}</span>
              </div>

              {/* Breakfast (Jika Ada) */}
              {booking.breakfast > 0 && (
                <div className="flex justify-between items-center pb-3 border-b border-gray-50 bg-orange-50/50 p-2 rounded">
                  <div>
                    <p className="font-bold text-gray-800">Extra Breakfast</p>
                    <p className="text-sm text-gray-500">{booking.breakfast} pax x {duration} nights</p>
                  </div>
                  <span className="font-semibold text-gray-700">
                    {formatCurrency(booking.breakfast * ADDONS_PRICE.breakfast * duration)}
                  </span>
                </div>
              )}

              {/* Extra Bed (Jika Ada) */}
              {booking.extraBed > 0 && (
                <div className="flex justify-between items-center pb-3 border-b border-gray-50 bg-green-50/50 p-2 rounded">
                  <div>
                    <p className="font-bold text-gray-800">Extra Bed</p>
                    <p className="text-sm text-gray-500">{booking.extraBed} bed x {duration} nights</p>
                  </div>
                  <span className="font-semibold text-gray-700">
                    {formatCurrency(booking.extraBed * ADDONS_PRICE.extrabed * duration)}
                  </span>
                </div>
              )}

              {/* Fees */}
              <div className="flex justify-between items-center text-sm text-gray-600 pt-2">
                <span>Service Fee (5%)</span>
                <span>{formatCurrency(booking.serviceFee)}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Tourism Tax</span>
                <span>{formatCurrency(booking.tourismTax)}</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center bg-gray-900 text-white p-6 rounded-xl">
              <span className="font-bold">TOTAL PAID</span>
              <span className="text-2xl font-bold font-mono">{formatCurrency(booking.totalPrice)}</span>
            </div>

            <div className="mt-8 text-center">
              <button onClick={() => window.print()} className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors">
                <Printer size={18} /> Print Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
