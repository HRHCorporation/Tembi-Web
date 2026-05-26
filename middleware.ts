
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;




  if (path.startsWith('/api')) {

    if (request.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400',
        },
      });
    }


    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return response;
  }






  if (process.env.DISABLE_ADMIN_AUTH === "true") {
    return NextResponse.next();
  }


  const isProtectedRoute = path.startsWith('/admin');
  const isLoginPage = path === '/admin/login';


  const adminSession = request.cookies.get(
    process.env.COOKIE_NAME || 'admin_session_tembi'
  );


  if (isProtectedRoute && !isLoginPage && !adminSession) {
    return NextResponse.redirect(new URL('/login', request.url));
  }


  if (isLoginPage && adminSession) {
    return NextResponse.redirect(
      new URL('/admin/invoices', request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*',
  ],
};