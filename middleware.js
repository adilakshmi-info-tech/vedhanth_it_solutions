// Gates every /admin route behind a valid, allowlisted Firebase admin
// session. /admin/login is public so an admin can actually sign in.
// This is a UX-level gate (redirect before the page even renders) — the
// real security boundary is requireAdmin() inside each Server Action,
// since actions can be invoked directly regardless of what page loaded.
import { NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/firebaseVerify';

export async function middleware(request) {
  const token = request.cookies.get('fb_token')?.value;
  const email = await verifyAdminToken(token);

  if (!email) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/((?!login).*)', '/admin'],
};
