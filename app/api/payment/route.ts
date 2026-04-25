// app/api/payment/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Update Prisma v7: Import dari lib
import { Xendit } from 'xendit-node';
import { roomData } from '@/data/roomData';

const xenditClient = new Xendit({ secretKey: process.env.XENDIT_API_KEY || '' });

const ADDONS_PRICE = {
  breakfast: 50000, 
  extrabed: 150000   
};

// Durasi Invoice (dalam detik) -> 30 Menit
const INVOICE_DURATION_SECONDS = 1800;

// --- FITUR BARU: GENERATE SHORT ID (Contoh: INV-X7K9LP) ---
function generateShortId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `INV-${result}`;
}

// GET Handler (Untuk mengambil detail booking)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const bookingId = searchParams.get('bookingId');

  if (!bookingId) return NextResponse.json({ message: 'Booking ID is required' }, { status: 400 });

  try {
    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking) return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
    
    // 🛡️ SECURITY PATCH: Sembunyikan (Masking) data pribadi untuk keamanan
    // Jika perlu data lengkap (misal untuk email), validasi harus menggunakan Halaman Cek Pesanan
    const safeBookingData = {
      ...booking,
      customerEmail: booking.customerEmail.replace(/(.{2})(.*)(?=@)/, "$1***"), // Budi@... -> Bu***@...
      customerPhone: booking.customerPhone.slice(0, 4) + "****" + booking.customerPhone.slice(-3), // 0812****123
      customerAddress: "*** Sembunyi demi privasi ***",
    };

    return NextResponse.json({ booking: safeBookingData });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// POST Handler (Create Booking)
export async function POST(request: Request) {
  try {
    const {
      roomSlug,
      checkIn,
      checkOut,
      adults,
      children,
      booker, 
      addons,
    } = await request.json();

    if (!roomSlug || !checkIn || !checkOut || !booker) {
      return NextResponse.json({ message: 'Missing required data' }, { status: 400 });
    }
    
    const room = roomData.find(r => r.slug === roomSlug);
    if (!room) return NextResponse.json({ message: 'Room not found' }, { status: 404 });

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // --- CEK AVAILABILITY LAGI SEBELUM CREATE (Double Check) ---
    // Gunakan logika yang sama dengan API availability (30 menit window)
    const PAYMENT_WINDOW_MINUTES = 30;
    const expiryThreshold = new Date(Date.now() - PAYMENT_WINDOW_MINUTES * 60 * 1000);

    const conflictingBooking = await prisma.booking.findFirst({
      where: {
        roomSlug: roomSlug,
        AND: [
          { checkInDate: { lt: checkOutDate } },
          { checkOutDate: { gt: checkInDate } },
          {
            OR: [
              { status: 'PAID' },
              // Hanya anggap bentrok jika PENDING dan MASIH BARU (< 30 menit)
              { status: 'PENDING', createdAt: { gt: expiryThreshold } }
            ]
          }
        ]
      },
    });

    if (conflictingBooking) {
      return NextResponse.json({ message: 'Room is unavailable or currently being booked.' }, { status: 409 });
    }
    // -----------------------------------------------------------

    const duration = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24));
    
    const breakfastCount = addons?.breakfast || 0;
    const extraBedCount = addons?.extrabed || 0;

    const roomBasePrice = room.price * duration;
    const breakfastTotal = breakfastCount * ADDONS_PRICE.breakfast * duration;
    const extraBedTotal = extraBedCount * ADDONS_PRICE.extrabed * duration;
    const addonsTotal = breakfastTotal + extraBedTotal;

    const basePrice = roomBasePrice + addonsTotal;
    const serviceFee = Math.round(basePrice * 0.05); 
    const tourismTax = 30000 * duration; 
    
    const totalAmount = basePrice + serviceFee + tourismTax;

    // Generate ID Pendek
    const shortId = generateShortId();

    // Simpan ke Database
    const booking = await prisma.booking.create({
      data: {
        id: shortId,
        roomId: room.id.toString(),
        roomSlug: room.slug,
        roomName: room.name,
        roomPrice: room.price,
        
        basePrice: basePrice, 
        serviceFee: serviceFee,
        tourismTax: tourismTax,
        totalPrice: totalAmount,
        
        breakfast: breakfastCount, 
        extraBed: extraBedCount,
        
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        duration: duration,
        adults: adults || 1,
        children: children || 0,
        
        customerName: booker.name,
        customerEmail: booker.email,
        customerPhone: booker.phone,
        customerAddress: booker.address || '',
        customerCity: booker.city || '',
        customerPostalCode: booker.postalCode || '',
        status: 'PENDING',
      },
    });

    // Buat Invoice Xendit
    try {
      const { Invoice } = xenditClient;
      
      const invoiceItems = [
        {
          name: `${room.name} (${duration} nights)`,
          quantity: 1,
          price: roomBasePrice,
          category: 'Accommodation',
        }
      ];

      if (breakfastCount > 0) {
        invoiceItems.push({
          name: `Breakfast (${breakfastCount} pax x ${duration} nights)`,
          quantity: 1,
          price: breakfastTotal,
          category: 'Add-ons',
        });
      }

      if (extraBedCount > 0) {
        invoiceItems.push({
          name: `Extra Bed (${extraBedCount} bed x ${duration} nights)`,
          quantity: 1,
          price: extraBedTotal,
          category: 'Add-ons',
        });
      }

      invoiceItems.push(
        { name: 'Service Fee (5%)', quantity: 1, price: serviceFee, category: 'Fee' },
        { name: 'Tourism Tax', quantity: duration, price: 30000, category: 'Tax' }
      );

      const xenditInvoice = await Invoice.createInvoice({
        data: {
          externalId: booking.id,
          amount: totalAmount,
          payerEmail: booker.email,
          description: `Booking ${booking.id} - ${room.name}`,
          customer: {
            givenNames: booker.name,
            email: booker.email,
            mobileNumber: booker.phone,
          },
          items: invoiceItems,
          successRedirectUrl: `${process.env.NEXT_PUBLIC_URL}/booking/success?booking_id=${booking.id}`,
          failureRedirectUrl: `${process.env.NEXT_PUBLIC_URL}/booking/failed?booking_id=${booking.id}`,
          currency: 'IDR',
          
          // --- SETTING PENTING: EXPIRED DALAM 30 MENIT ---
          invoiceDuration: INVOICE_DURATION_SECONDS, 
          // -----------------------------------------------
          shouldSendEmail: true,
        },
      });

      await prisma.booking.update({
        where: { id: booking.id },
        data: { 
          xenditInvoiceId: xenditInvoice.id,
          xenditInvoiceUrl: xenditInvoice.invoiceUrl,
        },
      });

      return NextResponse.json({
        success: true,
        bookingId: booking.id,
        invoiceUrl: xenditInvoice.invoiceUrl,
        message: 'Payment initiated successfully.'
      });

    } catch (xenditError: any) {
      await prisma.booking.delete({ where: { id: booking.id } });
      console.error('Xendit Error:', xenditError);
      return NextResponse.json({ message: 'Failed to create payment invoice', error: xenditError.message }, { status: 500 });
    }

  } catch (error: any) {
    console.error('Payment API Error:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
