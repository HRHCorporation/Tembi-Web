// app/admin/invoices/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, Search, LogOut } from 'lucide-react'; // Tambahkan icon LogOut

const formatCurrency = (amount: number) => 
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

const formatDate = (dateString: string) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
};

export default function AdminInvoicesPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); 
  const router = useRouter();

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await fetch('/api/admin/invoices');
      if (res.ok) {
        const data = await res.json();
        setBookings(data.data);
      } else {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk menangani proses logout
  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      
      if (res.ok) {
        router.push('/admin/login');
        router.refresh(); // Refresh agar state middleware diperbarui
      }
    } catch (error) {
      console.error("Gagal melakukan logout:", error);
    }
  };

  const filteredBookings = bookings.filter((b) => 
    b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8 pt-28 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header, Search & Logout */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Booking Invoices</h1>
          
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto items-center">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search ID, Name, or Email..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-tembi focus:border-transparent transition-shadow text-black"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Tombol Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 w-full md:w-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors shadow-sm font-medium"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 font-bold uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Room</th>
                  <th className="px-6 py-4">Check-In</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td colSpan={7} className="px-6 py-8 text-center text-black">Loading data...</td></tr>
                ) : filteredBookings.length === 0 ? (
                  <tr><td colSpan={7} className="px-6 py-8 text-center text-gray-500">No bookings found.</td></tr>
                ) : (
                  filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-mono font-medium text-gray-700">{booking.id}</td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-800">{booking.customerName}</div>
                        <div className="text-xs text-gray-500">{booking.customerEmail}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{booking.roomName}</td>
                      <td className="px-6 py-4 text-gray-600">{formatDate(booking.checkInDate)}</td>
                      <td className="px-6 py-4 font-bold text-gray-800">{formatCurrency(booking.totalPrice)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold 
                          ${booking.status === 'PAID' ? 'bg-green-100 text-green-700' : 
                            booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 
                            'bg-red-100 text-red-700'}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => router.push(`/admin/invoices/${booking.id}`)}
                          className="bg-tembi text-white p-2 rounded-lg hover:bg-darktembi transition-colors shadow-sm"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
