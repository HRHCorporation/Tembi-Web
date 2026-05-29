import { NextResponse } from 'next/server';
import dbWeb from '@/lib/db-web';
import { Xendit } from 'xendit-node';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

const xenditClient = new Xendit({ secretKey: process.env.XENDIT_API_KEY || '' });

export async function POST(request: Request) {
  try {
    const { bookingId } = await request.json();
    
    if (!bookingId) {
      return NextResponse.json({ message: 'Booking ID required' }, { status: 400 });
    }

    // Cari booking
    const [rows] = await dbWeb.query<RowDataPacket[]>(
      'SELECT * FROM booking WHERE id = ?',
      [bookingId]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
    }

    const booking = rows[0];

    if (booking.status !== 'PENDING') {
      return NextResponse.json({ 
        message: 'Cannot cancel processed booking' 
      }, { status: 400 });
    }

    // Update status ke CANCELLED
    await dbWeb.query<ResultSetHeader>(
      `UPDATE booking 
       SET status = 'CANCELLED', 
           updatedAt = ? 
       WHERE id = ?`,
      [new Date(), bookingId]
    );

    // Expire Xendit invoice jika ada
    if (booking.xenditInvoiceId) {
      try {
        const { Invoice } = xenditClient;
        await Invoice.expireInvoice({ invoiceId: booking.xenditInvoiceId });
      } catch (err) {
        console.error("Warning: Failed to expire Xendit invoice:", err);
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Booking cancelled' 
    });

  } catch (error: any) {
    console.error('Cancel Booking Error:', error);
    return NextResponse.json({ 
      message: 'Server Error', 
      error: error.message 
    }, { status: 500 });
  }
}