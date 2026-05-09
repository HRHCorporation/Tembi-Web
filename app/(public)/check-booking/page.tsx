"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CheckBookingPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/bookings/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, bookingId }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // --- LOGIKA REDIRECT BERDASARKAN STATUS ---
        if (data.status === 'PAID') {
            router.push(`/booking/success?booking_id=${data.bookingId}`);
        } else if (['EXPIRED', 'CANCELLED'].includes(data.status)) {
            router.push(`/booking/failed?booking_id=${data.bookingId}`);
        } else {
            // Default untuk PENDING atau status lain
            router.push(`/booking/pending?booking_id=${data.bookingId}`);
        }
      } else {
        setError(data.message || 'Pesanan tidak ditemukan.');
      }
    } catch (err) {
      setError('Terjadi kesalahan koneksi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#EFF1F0] pt-32 pb-20 px-4 flex items-center justify-center font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-tembi text-sm mb-6 transition-colors">
            <ArrowLeft size={16} className="mr-1"/> Back to Home
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-serif font-bold text-gray-800">Cek Pesanan</h1>
          <p className="text-sm text-gray-500 mt-2">Masukan ID Pesanan dan Email Anda untuk melihat status terbaru.</p>
        </div>

        <form onSubmit={handleCheck} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Booking ID</label>
            <input 
              type="text" 
              required
              placeholder="Contoh: INV-X7Y2M"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-tembi focus:border-transparent outline-none uppercase font-mono tracking-wide"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Pemesan</label>
            <input 
              type="email" 
              required
              placeholder="nama@email.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-tembi focus:border-transparent outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center border border-red-100 animate-in fade-in slide-in-from-top-2">
              {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-tembi text-white font-bold rounded-xl hover:bg-darktembi transition-all shadow-lg shadow-tembi/20 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Search size={18} />}
            {loading ? 'Mencari...' : 'Cari Pesanan'}
          </button>
        </form>
      </div>
    </main>
  );
}
