import { NextResponse } from 'next/server';
import dbWeb from '@/lib/db-web';
import { Xendit } from 'xendit-node';
import { roomData } from '@/data/roomData';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

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

  if (!bookingId) {
    return NextResponse.json({ message: 'Booking ID is required' }, { status: 400 });
  }

  try {
    const [rows] = await dbWeb.query<RowDataPacket[]>(
      'SELECT * FROM booking WHERE id = ?',
      [bookingId]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
    }

    const booking = rows[0];
    
    // 🛡️ SECURITY PATCH: Sembunyikan (Masking) data pribadi untuk keamanan
    const safeBookingData = {
      ...booking,
      customerEmail: booking.customerEmail.replace(/(.{2})(.*)(?=@)/, "$1***"),
      customerPhone: booking.customerPhone.slice(0, 4) + "****" + booking.customerPhone.slice(-3),
      customerAddress: "*** Sembunyi demi privasi ***",
    };

    return NextResponse.json({ booking: safeBookingData });
  } catch (error) {
    console.error('GET Booking Error:', error);
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
    if (!room) {
      return NextResponse.json({ message: 'Room not found' }, { status: 404 });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // --- CEK AVAILABILITY LAGI SEBELUM CREATE (Double Check) ---
    const PAYMENT_WINDOW_MINUTES = 30;
    const expiryThreshold = new Date(Date.now() - PAYMENT_WINDOW_MINUTES * 60 * 1000);

    const [conflictRows] = await dbWeb.query<RowDataPacket[]>(
      `SELECT id 
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

    if (conflictRows.length > 0) {
      return NextResponse.json({ 
        message: 'Room is unavailable or currently being booked.' 
      }, { status: 409 });
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

    // Simpan ke Database MySQL
    const now = new Date();
    
    await dbWeb.query<ResultSetHeader>(
      `INSERT INTO booking (
        id, roomId, roomSlug, roomName, roomPrice,
        basePrice, serviceFee, tourismTax, totalPrice,
        breakfast, extraBed,
        checkInDate, checkOutDate, duration,
        adults, children,
        customerName, customerEmail, customerPhone,
        customerAddress, customerCity, customerPostalCode,
        status, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        shortId,
        room.id.toString(),
        room.slug,
        room.name,
        room.price,
        basePrice,
        serviceFee,
        tourismTax,
        totalAmount,
        breakfastCount,
        extraBedCount,
        checkInDate,
        checkOutDate,
        duration,
        adults || 1,
        children || 0,
        booker.name,
        booker.email,
        booker.phone,
        booker.address || '',
        booker.city || '',
        booker.postalCode || '',
        'PENDING',
        now,
        now
      ]
    );

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
          externalId: shortId,
          amount: totalAmount,
          payerEmail: booker.email,
          description: `Booking ${shortId} - ${room.name}`,
          customer: {
            givenNames: booker.name,
            email: booker.email,
            mobileNumber: booker.phone,
          },
          items: invoiceItems,
          successRedirectUrl: `${process.env.NEXT_PUBLIC_URL}/booking/success?booking_id=${shortId}`,
          failureRedirectUrl: `${process.env.NEXT_PUBLIC_URL}/booking/failed?booking_id=${shortId}`,
          currency: 'IDR',
          invoiceDuration: INVOICE_DURATION_SECONDS,
          shouldSendEmail: true,
        },
      });

      // Update booking dengan invoice info
      await dbWeb.query<ResultSetHeader>(
        `UPDATE booking 
         SET xenditInvoiceId = ?, 
             xenditInvoiceUrl = ?,
             updatedAt = ?
         WHERE id = ?`,
        [xenditInvoice.id, xenditInvoice.invoiceUrl, new Date(), shortId]
      );

      return NextResponse.json({
        success: true,
        bookingId: shortId,
        invoiceUrl: xenditInvoice.invoiceUrl,
        message: 'Payment initiated successfully.'
      });

    } catch (xenditError: any) {
      // Rollback: Hapus booking jika Xendit gagal
      await dbWeb.query<ResultSetHeader>(
        'DELETE FROM booking WHERE id = ?',
        [shortId]
      );
      
      console.error('Xendit Error:', xenditError);
      return NextResponse.json({ 
        message: 'Failed to create payment invoice', 
        error: xenditError.message 
      }, { status: 500 });
    }

  } catch (error: any) {
    console.error('Payment API Error:', error);
    return NextResponse.json({ 
      message: 'Internal Server Error', 
      error: error.message 
    }, { status: 500 });
  }
}