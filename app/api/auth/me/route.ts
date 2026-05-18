import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const cookieStore = await cookies();

        const session =
            cookieStore.get(
                process.env.COOKIE_NAME ||
                "admin_session_tembi"
            );

        if (!session) {
            return NextResponse.json(
                {
                    success: false,
                    user: null,
                },
                { status: 401 }
            );
        }

        const user = JSON.parse(session.value);

        return NextResponse.json({
            success: true,
            user,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                user: null,
            },
            { status: 500 }
        );
    }
}