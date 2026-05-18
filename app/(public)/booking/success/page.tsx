// app/booking/success/page.tsx
"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Check, Calendar, Coffee, Bed, Download } from 'lucide-react';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const formatCurrency = (amount: number) => 
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

const ADDONS_PRICE = { breakfast: 50000, extrabed: 150000 };

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get('booking_id');

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookingId) {
      setError('No booking ID provided');
      setLoading(false);
      return;
    }
    
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(`/api/payment?bookingId=${bookingId}`);
        const text = await response.text();
        
        if (!response.ok) throw new Error('Failed to fetch details');
        
        const data = JSON.parse(text);
        
        if (data.booking) {
          if (data.booking.status === 'PENDING') {
              router.push(`/booking/pending?booking_id=${bookingId}`);
              return;
          }
          if (['EXPIRED', 'CANCELLED'].includes(data.booking.status)) {
              router.push(`/booking/failed?booking_id=${bookingId}`);
              return;
          }
        }
  
        setBooking(data.booking);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId, router]);

  // --- FUNGSI UNTUK GENERATE PDF ---
  // 1. Tambahkan kata 'async' di sini
  const generatePDF = async () => {
    if (!booking) return;

    const doc = new jsPDF();

    // 1. Header Kiri: INVOICE
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(58, 77, 57); 
    doc.text("INVOICE", 14, 25);

    // ========================================================
    // 2. Header Kanan: Logo Tembi (GANTI BAGIAN INI)
    // ========================================================
    const img = new Image();
    img.src = '/images/logo-tembi.png'; // Path otomatis membaca dari folder public

    // Tunggu gambar di-load oleh browser sebelum dimasukkan ke PDF
    await new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = resolve; // Jika error/gambar tidak ketemu, tetap lanjutkan
    });

    // Masukkan ke PDF (Format: doc.addImage(img, format, x, y, width, height))
    // Anda bisa mengubah angka 40 (lebar) dan 15 (tinggi) agar proporsional dengan bentuk logo Anda
    doc.addImage(img, 'PNG', 156, 12, 40, 15);
    // ========================================================

    // Garis Pemisah
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(14, 32, 196, 32);

    // Reset warna teks ke hitam
    doc.setTextColor(50, 50, 50);

    // 3. Informasi Invoice & Status
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Invoice ID  : ${booking.id}`, 14, 42);
    doc.text(`Date        : ${format(new Date(), 'dd MMM yyyy')}`, 14, 48);
    doc.setFont("helvetica", "bold");
    doc.text(`Status      : ${booking.status}`, 14, 54);

    // 4. Informasi Tamu (Billed To)
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Billed To:", 14, 68);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    // Tambahkan label Nama, Email, dan No tanpa ada sensor
    doc.text(`Nama : ${booking.customerName}`, 14, 74);
    doc.text(`Email : ${booking.customerEmail}`, 14, 80);
    doc.text(`No    : ${booking.customerPhone || "-"}`, 14, 86);

    // 5. Informasi Reservasi
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Reservation Details:", 110, 68);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Room      : ${booking.roomName}`, 110, 74);
    doc.text(`Check-in  : ${format(new Date(booking.checkInDate), 'dd MMM yyyy')}`, 110, 80);
    doc.text(`Check-out : ${format(new Date(booking.checkOutDate), 'dd MMM yyyy')}`, 110, 86);
    doc.text(`Duration  : ${booking.duration} Night(s)`, 110, 92);

    // 6. Tabel Rincian Biaya
    const tableColumn = ["Description", "Qty", "Unit Price", "Total"];
    const tableRows = [];

    // Baris Kamar
    tableRows.push([
      `Room: ${booking.roomName} (${booking.duration} nights)`,
      1,
      formatCurrency(booking.roomPrice * booking.duration),
      formatCurrency(booking.roomPrice * booking.duration)
    ]);

    // Baris Addons
    if (booking.breakfast > 0) {
      tableRows.push([
        "Extra Breakfast",
        `${booking.breakfast} pax x ${booking.duration} nts`,
        formatCurrency(ADDONS_PRICE.breakfast),
        formatCurrency(booking.breakfast * ADDONS_PRICE.breakfast * booking.duration)
      ]);
    }
    if (booking.extraBed > 0) {
      tableRows.push([
        "Extra Bed",
        `${booking.extraBed} unit x ${booking.duration} nts`,
        formatCurrency(ADDONS_PRICE.extrabed),
        formatCurrency(booking.extraBed * ADDONS_PRICE.extrabed * booking.duration)
      ]);
    }

    // Baris Pajak & Layanan
    tableRows.push([
      "Service Fee & Tax",
      "-",
      "-",
      formatCurrency(booking.serviceFee + booking.tourismTax)
    ]);

    // Generate Tabel
    autoTable(doc, {
      startY: 105,
      head: [tableColumn],
      body: tableRows,
      theme: 'striped',
      headStyles: { fillColor: [140, 168, 115], textColor: [255, 255, 255] },
      styles: { fontSize: 10, cellPadding: 5 },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { cellWidth: 35 },
        2: { cellWidth: 35 },
        3: { cellWidth: 35, halign: 'right' } // Rata kanan untuk total
      }
    });

    // 7. Total Pembayaran
    const finalY = (doc as any).lastAutoTable.finalY || 105;
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Total Paid:", 135, finalY + 15);
    doc.text(formatCurrency(booking.totalPrice), 196, finalY + 15, { align: "right" });

    // Footer
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text("Thank you for your reservation at Tembi Historical Home.", 105, 280, { align: "center" });

    // Save PDF
    doc.save(`Invoice_${booking.id}.pdf`);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F9F9]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8CA873]"></div>
    </div>
  );

  if (error || !booking) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F9F9] pt-28">
      <div className="text-center p-8 bg-white rounded-xl shadow border border-red-100">
         <h1 className="text-xl font-bold mb-2 text-red-600">Booking Not Found</h1>
         <p className="text-gray-500 mb-4 text-sm">{error}</p>
         <button onClick={() => router.push('/')} className="bg-tembi text-white px-4 py-2 rounded">Back to Home</button>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#FCFCFA] pb-20 pt-28 font-sans">
      
      {/* Top Banner */}
      <div className="bg-[#93A576] pt-12 pb-24 px-4 text-center text-white rounded-b-[3rem] shadow-sm">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-[#2ed16f] rounded-full flex items-center justify-center shadow-lg border-4 border-[#93A576]">
            <Check className="w-8 h-8 text-white stroke-[3]" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">Payment Successful!</h1>
        <p className="text-green-50">Booking ID: <span className="font-mono font-bold bg-white/20 px-2 py-1 rounded">{booking.id}</span></p>
      </div>

      <div className="container mx-auto max-w-[800px] px-4 -mt-16 relative z-10">
        
        {/* Card Utama */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border border-gray-100">
          <div className="bg-[#8CA873]/10 p-6 border-b border-[#8CA873]/20 flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#5A6E48] flex items-center gap-2">
              <Calendar size={20}/> Reservation Details
            </h2>
            <span className="bg-[#8CA873] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {booking.status}
            </span>
          </div>

          <div className="p-8">
            {/* Info Kamar & Tamu */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                 <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Guest Name</p>
                 <p className="text-lg font-bold text-gray-800 mb-4">{booking.customerName}</p>
                 
                 <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Room Type</p>
                 <p className="text-lg font-bold text-gray-800">{booking.roomName}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                 <div className="flex justify-between mb-3 border-b border-gray-200 pb-3">
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Check-in</p>
                        <p className="font-bold text-gray-800">{format(new Date(booking.checkInDate), 'dd MMM yyyy')}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500 mb-1">Check-out</p>
                        <p className="font-bold text-gray-800">{format(new Date(booking.checkOutDate), 'dd MMM yyyy')}</p>
                    </div>
                 </div>
                 <div className="flex items-center justify-center gap-2 text-[#5A6E48] font-bold text-sm">
                    <Calendar size={16}/> {booking.duration} Night(s) Stay
                 </div>
              </div>
            </div>

            {/* Rincian Biaya */}
            <div className="space-y-3 pt-6 border-t border-dashed border-gray-200">
                <div className="flex justify-between font-medium text-gray-700">
                    <span>{booking.roomName} x {booking.duration} nights</span>
                    <span>{formatCurrency(booking.roomPrice * booking.duration)}</span>
                </div>

                {booking.breakfast > 0 && (
                    <div className="flex justify-between text-gray-600 bg-orange-50 p-2 rounded-lg text-sm">
                        <span className="flex items-center gap-2"><Coffee size={14}/> Extra Breakfast ({booking.breakfast} pax)</span>
                        <span>{formatCurrency(booking.breakfast * ADDONS_PRICE.breakfast * booking.duration)}</span>
                    </div>
                )}

                {booking.extraBed > 0 && (
                    <div className="flex justify-between text-gray-600 bg-green-50 p-2 rounded-lg text-sm">
                        <span className="flex items-center gap-2"><Bed size={14}/> Extra Bed ({booking.extraBed} units)</span>
                        <span>{formatCurrency(booking.extraBed * ADDONS_PRICE.extrabed * booking.duration)}</span>
                    </div>
                )}

                <div className="flex justify-between text-gray-500 text-sm pt-2">
                    <span>Service Fee & Tax</span>
                    <span>{formatCurrency(booking.serviceFee + booking.tourismTax)}</span>
                </div>

                <div className="flex justify-between font-bold text-xl text-[#5A6E48] pt-4 border-t border-gray-200">
                    <span>Total Paid</span>
                    <span>{formatCurrency(booking.totalPrice)}</span>
                </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* Ubah onClick menjadi memanggil generatePDF */}
            <button onClick={generatePDF} className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#8CA873] text-[#5A6E48] font-bold rounded-xl hover:bg-[#8CA873]/10 transition-colors">
                <Download size={18} /> Download Invoice (PDF)
            </button>
            <button onClick={() => router.push('/')} className="px-8 py-3 bg-[#3A4D39] text-white font-bold rounded-xl hover:bg-[#2c3b2b] shadow-lg shadow-[#3A4D39]/20 transition-all">
                Back to Home
            </button>
        </div>

      </div>
    </main>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
