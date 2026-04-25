// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const validUser = process.env.ADMIN_USERNAME;
    const validPass = process.env.ADMIN_PASSWORD;

    // Cek credential sederhana
    if (username === validUser && password === validPass) {
      const response = NextResponse.json({ success: true });
      
      // Set Cookie (HttpOnly agar aman)
      response.cookies.set({
        name: process.env.COOKIE_NAME || 'admin_session_tembi',
        value: 'true',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24, // 1 hari
      });

      return response;
    }

    return NextResponse.json({ success: false, message: 'Username atau Password salah' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error' }, { status: 500 });
  }
}
