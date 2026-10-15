import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
const { pathname } = req.nextUrl;
const accessToken = req.cookies.get("accessToken")?.value;

const isPrivatePage =
pathname === "/calendar" ||
pathname.startsWith("/calendar/") ||
pathname === "/todos" ||
pathname.startsWith("/todos/");

const isAuthPage =
pathname === "/login" || pathname === "/register";

if (isPrivatePage && !accessToken) {
return NextResponse.redirect(new URL("/login", req.url));
}

if (isAuthPage && accessToken) {
return NextResponse.redirect(new URL("/calendar", req.url));
}

return NextResponse.next();
}

export const config = {
matcher: ["/calendar/:path*", "/todos/:path*", "/login", "/register"],
};



