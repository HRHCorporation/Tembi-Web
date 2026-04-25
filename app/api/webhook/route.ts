import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Update Prisma v7: Import dari lib

export async function POST(request: Request) {
  try {
    const webhookToken = process.env.XENDIT_WEBHOOK_TOKEN;
    if (!webhookToken) {
      console.error("❌ Critical: XENDIT_WEBHOOK_TOKEN is missing in .env");
      return NextResponse.json({ message: "Server Misconfiguration" }, { status: 500 });
    }

    const callbackToken = request.headers.get('x-callback-token');
    if (callbackToken !== webhookToken) {
      console.warn(`⚠️ Unauthorized Token: ${callbackToken}`);
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.text();
    const data = JSON.parse(body);
    
    console.log(`🔔 Webhook received: ${data.status} for ${data.external_id}`);

    if (data.status) {
      switch (data.status) {
        case 'PAID':
          await handlePaymentPaid(data);
          break;
        case 'EXPIRED':
          await handlePaymentExpired(data);
          break;
        case 'PENDING':
          await handlePaymentPending(data);
          break;
        default:
          console.log('Unhandled payment status:', data.status);
      }
    }

    return NextResponse.json({ received: true });

  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { message: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handlePaymentPaid(data: any) {
  const { external_id } = data;
  try {
    const existingBooking = await prisma.booking.findUnique({
      where: { id: external_id },
    });

    if (!existingBooking) {
      console.warn(`⚠️ Booking not found for ID: ${external_id}. Ignoring.`);
      return; 
    }

    const booking = await prisma.booking.update({
      where: { id: external_id },
      data: { status: 'PAID', updatedAt: new Date() },
    });
    console.log(`✅ Booking ${booking.id} marked as PAID`);
  } catch (error) {
    console.error('❌ Failed to update booking status:', error);
  }
}

async function handlePaymentExpired(data: any) {
  const { external_id } = data;
  try {
    // Pastikan booking ada sebelum update
    const existingBooking = await prisma.booking.findUnique({
        where: { id: external_id },
    });
  
    if (!existingBooking) return;

    await prisma.booking.update({
      where: { id: external_id },
      data: { status: 'EXPIRED', updatedAt: new Date() },
    });
    console.log(`⏰ Booking ${external_id} marked as EXPIRED (Room Released)`);
  } catch (error) {
    console.error('❌ Failed to update expired booking:', error);
  }
}

async function handlePaymentPending(data: any) {
  const { external_id } = data;
  console.log(`⏳ Payment pending for booking ${external_id}`);
}
