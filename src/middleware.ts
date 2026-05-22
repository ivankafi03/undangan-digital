import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const session = request.cookies.get("admin_session");
    const path = request.nextUrl.pathname;

    // Public admin routes that DO NOT require authentication
    const publicAdminRoutes = [
        "/admin/login",
        "/admin/forgot-password",
        "/admin/reset-password",
        "/admin/accept-invitation",
        "/admin/confirm-password-change",
    ];

    const isPublicAdminRoute = publicAdminRoutes.some((route) => path.startsWith(route));

    // If trying to access /admin/anything (except public admin routes) without session
    if (path.startsWith("/admin") && !isPublicAdminRoute) {
        if (!session) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    // If trying to access login page while already authenticated
    if (path === "/admin/login") {
        if (session) {
            return NextResponse.redirect(new URL("/admin/dashboard", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/admin/:path*",
};
