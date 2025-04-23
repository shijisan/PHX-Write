import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // Use getToken to safely retrieve token from request in Edge runtime
  const token = await getToken({ req });
  
  if (!token) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/account:path*'],
};
