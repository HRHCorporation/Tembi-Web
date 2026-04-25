// app/api/admin/invoices/[id]/route.ts
import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';
import { prisma } from '@/lib/prisma';

// const prisma = new PrismaClient();
// const prisma = new PrismaClient({
//   datasources: {
//     db: {
//       url: process.env.DATABASE_URL,
//     },
//   },
// });

// GET: Ambil detail satu invoice berdasarkan ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // ✅ Ubah tipe menjadi Promise
) {
  try {
    // ✅ Await params sebelum mengakses propertinya
    const { id } = await params;

    const booking = await prisma.booking.findUnique({
      where: { id: id },
    });

    if (!booking) {
      return NextResponse.json({ message: 'Invoice not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: booking });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error fetching invoice', error: error.message }, { status: 500 });
  }
}

// PATCH: Update data invoice (misal: koreksi nama, ubah status manual)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // ✅ Ubah tipe menjadi Promise
) {
  try {
    // ✅ Await params sebelum mengakses propertinya
    const { id } = await params;
    
    const body = await request.json();
    
    // Filter field apa saja yang boleh diedit demi keamanan
    const { customerName, customerEmail, customerPhone, status, specialRequest } = body;

    const updatedBooking = await prisma.booking.update({
      where: { id: id },
      data: {
        customerName,
        customerEmail,
        customerPhone,
        status, // Hati-hati mengubah status manual, pastikan sinkron dengan pembayaran
        specialRequest,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Invoice updated successfully', 
      data: updatedBooking 
    });

  } catch (error: any) {
    return NextResponse.json({ message: 'Error updating invoice', error: error.message }, { status: 500 });
  }
}
