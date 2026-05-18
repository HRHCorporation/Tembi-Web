// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {

  // BYPASS AUTH SAAT DEVELOPMENT
  if (process.env.DISABLE_ADMIN_AUTH === "true") {
    return NextResponse.next();
  }

  // Ambil path yang sedang diakses
  const path = request.nextUrl.pathname;

  // Tentukan path yang harus diproteksi
  const isProtectedRoute = path.startsWith('/admin');
  const isLoginPage = path === '/admin/login';

  // Ambil cookie sesi admin
  const adminSession = request.cookies.get(
    process.env.COOKIE_NAME || 'admin_session_tembi'
  );

  // SKENARIO 1: Belum login
  if (isProtectedRoute && !isLoginPage && !adminSession) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // SKENARIO 2: Sudah login tapi buka login lagi
  if (isLoginPage && adminSession) {
    return NextResponse.redirect(
      new URL('/admin/invoices', request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};