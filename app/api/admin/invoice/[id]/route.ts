import { NextResponse } from 'next/server';
import dbWeb from '@/lib/db-web';
import { cookies } from 'next/headers';
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

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> } // ← Changed: params is now Promise
) {
  try {

    // 2. Await params to get booking ID
    const { id } = await context.params; // ← Fixed: await params

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Booking ID is required' },
        { status: 400 }
      );
    }

    console.log('Fetching invoice with ID:', id); // Debug log

    // 3. Fetch booking detail from database
    const [rows] = await dbWeb.query<BookingRow[]>(
      'SELECT * FROM booking WHERE id = ? LIMIT 1',
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Invoice not found' },
        { status: 404 }
      );
    }

    const booking = rows[0];

    // 4. Return booking detail (NO MASKING for admin)
    return NextResponse.json({
      success: true,
      data: booking,
    });

  } catch (error) {
    console.error('Error fetching invoice detail:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}