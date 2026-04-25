// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Ambil path yang sedang diakses
  const path = request.nextUrl.pathname;

  // Tentukan path yang harus diproteksi
  const isProtectedRoute = path.startsWith('/admin');
  const isLoginPage = path === '/admin/login';

  // Ambil cookie sesi admin
  const adminSession = request.cookies.get(process.env.COOKIE_NAME || 'admin_session_tembi');

  // SKENARIO 1: Mencoba akses halaman admin tapi belum login
  if (isProtectedRoute && !isLoginPage && !adminSession) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // SKENARIO 2: Sudah login tapi mencoba akses halaman login lagi
  if (isLoginPage && adminSession) {
    return NextResponse.redirect(new URL('/admin/invoices', request.url));
  }

  return NextResponse.next();
}

// Konfigurasi agar middleware hanya berjalan di route tertentu
export const config = {
  matcher: ['/admin/:path*'],
};
