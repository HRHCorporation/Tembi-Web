import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import dbLaravel from "@/lib/db-laravel";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Ambil user berdasarkan email
    const [rows]: any = await dbLaravel.query(
      `
      SELECT id, name, email, password, role_id
      FROM users
      WHERE email = ?
      LIMIT 1
      `,
      [email]
    );

    // User tidak ditemukan
    if (!rows.length) {
      return NextResponse.json(
        {
          success: false,
          message: "Email atau password anda salah",
        },
        { status: 401 }
      );
    }

    const user = rows[0];

    // Cek role admin
    if (user.role_id !== 1) {
      return NextResponse.json(
        {
          success: false,
          message: "Email atau password anda salah",
        },
        { status: 401 }
      );
    }

    // Cek password hash Laravel
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Email atau password anda salah",
        },
        { status: 401 }
      );
    }

    // Login sukses
    const response = NextResponse.json({
      success: true,
      redirect: "/admin",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

    // Set session cookie
    response.cookies.set({
      name:
        process.env.COOKIE_NAME ||
        "admin_session_tembi",
      value: JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
      }),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 hari
    });

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server",
      },
      { status: 500 }
    );
  }
}