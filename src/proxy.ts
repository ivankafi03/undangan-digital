import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const session = request.cookies.get("admin_session");

    // If trying to access /admin/anything (except login) without session
    if (request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.startsWith("/admin/login")) {
        if (!session) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    // If trying to access login page while already authenticated
    if (request.nextUrl.pathname === "/admin/login") {
        if (session) {
            return NextResponse.redirect(new URL("/admin/dashboard", request.url));
        }
    }

    return NextResponse.next();
}

export default proxy;

export const config = {
    matcher: "/admin/:path*",
};
