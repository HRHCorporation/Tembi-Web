import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Update Prisma v7: Import dari lib

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const roomSlug = searchParams.get('roomSlug');
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');

    if (!roomSlug || !checkIn || !checkOut) {
      return NextResponse.json({ available: false, message: 'Missing parameters' }, { status: 400 });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // --- LOGIKA SOFT BOOKING ---
    // Batas waktu toleransi (30 menit yang lalu)
    const PAYMENT_WINDOW_MINUTES = 30;
    const expiryThreshold = new Date(Date.now() - PAYMENT_WINDOW_MINUTES * 60 * 1000);

    const conflictingBooking = await prisma.booking.findFirst({
      where: {
        roomSlug: roomSlug,
        // Cek tanggal bentrok (Overlap Logic)
        AND: [
          { checkInDate: { lt: checkOutDate } },
          { checkOutDate: { gt: checkInDate } },
          {
            // Cek Status Booking
            OR: [
              // 1. Jika sudah PAID, pasti bentrok (kamar tidak tersedia)
              { status: 'PAID' },
              
              // 2. Jika PENDING, cek apakah masih dalam "masa tunggu bayar" (Soft Booking)
              // Hanya anggap bentrok jika booking dibuat SETELAH expiryThreshold (artinya masih baru)
              { 
                status: 'PENDING',
                createdAt: { gt: expiryThreshold } 
              }
            ]
          }
        ]
      },
    });

    if (conflictingBooking) {
      // Custom message tergantung status
      const msg = conflictingBooking.status === 'PAID' 
        ? 'Kamar sudah terisi pada tanggal tersebut.' 
        : 'Kamar sedang dalam proses pembayaran oleh tamu lain. Coba lagi dalam beberapa menit.';

      return NextResponse.json({ 
        available: false, 
        message: msg
      });
    }

    return NextResponse.json({ available: true, message: 'Kamar tersedia' });

  } catch (error) {
    console.error('Availability Check Error:', error);
    return NextResponse.json({ available: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
