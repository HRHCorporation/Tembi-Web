// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  
  // Hapus cookie dengan menimpa cookie lama & set maxAge 0
  response.cookies.set({
    name: process.env.COOKIE_NAME || 'admin_session_tembi',
    value: '',
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });

  return response;
}
