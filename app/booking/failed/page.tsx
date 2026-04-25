"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { XCircle, AlertTriangle, Home, RefreshCw } from 'lucide-react';
import {Suspense } from 'react';

function FailedContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get('booking_id');

  // Fungsi untuk booking ulang (bukan bayar ulang ID yang sama)
  const handleTryAgain = () => {
    // Arahkan ke halaman booking awal untuk membuat pesanan baru
    router.push('/booking');
  };

  return (
    <main className="min-h-screen bg-[#FCFCFA] pb-20 pt-28 font-sans">
      
      {/* Top Banner (Red Theme) */}
      <div className="bg-[#B94E48] pt-12 pb-24 px-4 text-center text-white rounded-b-[3rem] shadow-sm">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-[#e65e57] rounded-full flex items-center justify-center shadow-lg border-4 border-[#B94E48]">
            <XCircle className="w-8 h-8 text-white stroke-[3]" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">Payment Failed</h1>
        <p className="text-red-100">We couldn&apos;t process your transaction.</p>
      </div>

      <div className="container mx-auto max-w-[600px] px-4 -mt-16 relative z-10">
        
        {/* Card Utama */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border border-gray-100">
          <div className="p-8 text-center">
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-start gap-3 text-left">
              <AlertTriangle className="w-6 h-6 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm">Transaction Unsuccessful</p>
                <p className="text-xs mt-1">
                  Your payment was cancelled, declined, or timed out. 
                  Please try booking again.
                </p>
              </div>
            </div>

            {bookingId && (
              <p className="text-gray-500 mb-6 text-sm">
                Reference ID: <span className="font-mono font-bold text-gray-800">{bookingId}</span>
              </p>
            )}

            <div className="space-y-3">
              {/* PERBAIKAN: Tombol ini sekarang membuat booking baru */}
              <button 
                onClick={handleTryAgain} 
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#3A4D39] text-white font-bold rounded-xl hover:bg-[#2c3b2b] shadow-lg shadow-[#3A4D39]/20 transition-all"
              >
                <RefreshCw size={18} /> Book Again
              </button>
              
              <button 
                onClick={() => router.push('/')} 
                className="w-full flex items-center justify-center gap-2 px-6 py-4 border-2 border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors"
              >
                <Home size={18} /> Back to Home
              </button>
            </div>
          </div>
        </div>
        
        <p className="text-center text-gray-400 text-xs">
          Need help? Contact our support at <a href="#" className="underline">support@tembi.com</a>
        </p>

      </div>
    </main>
  );
}

export default function BookingFailedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <FailedContent />
    </Suspense>
  );
}
