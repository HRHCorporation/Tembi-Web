import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Xendit } from 'xendit-node';

const xenditClient = new Xendit({ secretKey: process.env.XENDIT_API_KEY || '' });

export async function POST(request: Request) {
  try {
    const { bookingId } = await request.json();
    if (!bookingId) return NextResponse.json({ message: 'Booking ID required' }, { status: 400 });

    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking) return NextResponse.json({ message: 'Booking not found' }, { status: 404 });

    if (booking.status !== 'PENDING') {
        return NextResponse.json({ message: 'Cannot cancel processed booking' }, { status: 400 });
    }

    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'CANCELLED', updatedAt: new Date() },
    });

    if (booking.xenditInvoiceId) {
        try {
            const { Invoice } = xenditClient;
            await Invoice.expireInvoice({ invoiceId: booking.xenditInvoiceId });
        } catch (err) {
            console.error("Warning: Failed to expire Xendit invoice:", err);
        }
    }

    return NextResponse.json({ success: true, message: 'Booking cancelled' });
  } catch (error: any) {
    return NextResponse.json({ message: 'Server Error', error: error.message }, { status: 500 });
  }
}
