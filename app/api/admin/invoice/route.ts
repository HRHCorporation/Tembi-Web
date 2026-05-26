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

export async function GET(request: Request) {
  try {

    // 2. Extract Query Parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'DESC';

    // 3. Validasi sortBy untuk mencegah SQL Injection
    const allowedSortFields = [
      'id', 
      'customerName', 
      'roomName', 
      'checkInDate', 
      'totalPrice', 
      'status', 
      'createdAt'
    ];
    
    const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const safeSortOrder = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    // 4. Build WHERE Clause untuk Search
    let whereClause = '';
    const queryParams: (string | number)[] = [];

    if (search) {
      whereClause = `WHERE (
        id LIKE ? OR 
        customerName LIKE ? OR 
        customerEmail LIKE ? OR 
        customerPhone LIKE ? OR
        roomName LIKE ?
      )`;
      const searchPattern = `%${search}%`;
      queryParams.push(searchPattern, searchPattern, searchPattern, searchPattern, searchPattern);
    }

    // 5. Count Total Records
    const [countRows] = await dbWeb.query<RowDataPacket[]>(
      `SELECT COUNT(*) as total FROM booking ${whereClause}`,
      queryParams
    );
    const total = countRows[0].total;
    const totalPages = Math.ceil(total / limit);

    // 6. Calculate Offset
    const offset = (page - 1) * limit;

    // 7. Fetch Data dengan Pagination
    const [bookings] = await dbWeb.query<BookingRow[]>(
      `SELECT * FROM booking 
       ${whereClause}
       ORDER BY ${safeSortBy} ${safeSortOrder}
       LIMIT ? OFFSET ?`,
      [...queryParams, limit, offset]
    );

    // 8. Return Response dengan Pagination Info
    return NextResponse.json({
      success: true,
      data: bookings,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        limit,
      },
    });

  } catch (error) {
    console.error('Error fetching invoices:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}