import { NextResponse } from 'next/server';
import dbWeb from '@/lib/db-web';
import { RowDataPacket } from 'mysql2';

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

    // Query MySQL untuk cek bentrok
    const [rows] = await dbWeb.query<RowDataPacket[]>(
      `SELECT id, status, createdAt 
       FROM booking 
       WHERE roomSlug = ? 
       AND checkInDate < ? 
       AND checkOutDate > ? 
       AND (
         status = 'PAID' 
         OR (status = 'PENDING' AND createdAt > ?)
       )
       LIMIT 1`,
      [roomSlug, checkOutDate, checkInDate, expiryThreshold]
    );

    if (rows.length > 0) {
      const conflictingBooking = rows[0];
      
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