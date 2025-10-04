import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("next-auth.session-token")?.value;

    if (!token) return NextResponse.redirect(new URL("/login", req.url));

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard", "/dashboard/:path*"],
};