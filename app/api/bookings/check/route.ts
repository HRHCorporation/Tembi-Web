import { NextResponse } from 'next/server';
import dbWeb from '@/lib/db-web';
import { RowDataPacket } from 'mysql2';

interface BookingRow extends RowDataPacket {
  id: string;
  roomId: string;
  roomSlug: string;
  roomName: string;
  roomPrice: number;
  basePrice: number;
  serviceFee: number;
  tourismTax: number;
  totalPrice: number;
  breakfast: number;
  extraBed: number;
  checkInDate: Date;
  checkOutDate: Date;
  duration: number;
  adults: number;
  children: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerCity: string;
  customerPostalCode: string;
  status: string;
  xenditInvoiceId: string | null;
  xenditInvoiceUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export async function POST(request: Request) {
  try {
    const { email, bookingId } = await request.json();

    if (!email || !bookingId) {
      return NextResponse.json({ 
        success: false, 
        message: 'Data tidak lengkap' 
      }, { status: 400 });
    }

    // Query MySQL dengan case-insensitive search untuk email
    const [rows] = await dbWeb.query<BookingRow[]>(
      `SELECT * FROM booking 
       WHERE id = ? 
       AND LOWER(customerEmail) = LOWER(?)
       LIMIT 1`,
      [bookingId, email]
    );

    if (rows.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'Data booking tidak ditemukan atau email salah.' 
      }, { status: 404 });
    }

    const booking = rows[0];

    // --- KEMBALIKAN JUGA STATUS ---
    return NextResponse.json({ 
      success: true, 
      bookingId: booking.id,
      status: booking.status // Penting untuk logika redirect di frontend
    });

  } catch (error) {
    console.error('Check Booking Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Server Error' 
    }, { status: 500 });
  }
}