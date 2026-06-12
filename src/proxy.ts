import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isResumePath = pathname === "/r" || pathname.startsWith("/r/");
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token && isResumePath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token && !isResumePath) {
    return NextResponse.redirect(new URL("/r/1", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
