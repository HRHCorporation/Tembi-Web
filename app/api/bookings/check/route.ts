import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { email, bookingId } = await request.json();

    if (!email || !bookingId) {
      return NextResponse.json({ success: false, message: 'Data tidak lengkap' }, { status: 400 });
    }

    const booking = await prisma.booking.findFirst({
      where: {
        id: bookingId,
        customerEmail: {
            equals: email,
            mode: 'insensitive' 
        }
      }
    });

    if (!booking) {
      return NextResponse.json({ success: false, message: 'Data booking tidak ditemukan atau email salah.' }, { status: 404 });
    }

    // --- KEMBALIKAN JUGA STATUS ---
    return NextResponse.json({ 
        success: true, 
        bookingId: booking.id,
        status: booking.status // Penting untuk logika redirect di frontend
    });

  } catch (error) {
    console.error('Check Booking Error:', error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}
