// app/api/admin/invoices/route.ts
import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers'; //

// const prisma = new PrismaClient();
// const prisma = new PrismaClient({
//   datasources: {
//     db: {
//       url: process.env.DATABASE_URL,
//     },
//   },
// });

export async function GET() {
  try {
    // 1. SECURITY CHECK: Verify Admin Session
    const cookieStore = await cookies();
    const session = cookieStore.get(process.env.COOKIE_NAME || 'admin_session_tembi');

    // If no cookie or value is not 'true', block access
    if (!session || session.value !== 'true') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized access' },
        { status: 401 }
      );
    }

    // 2. Fetch Data (Only if authorized)
    const bookings = await prisma.booking.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ success: true, data: bookings });
  } catch (error: any) {
    console.error('Error fetching invoices:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
