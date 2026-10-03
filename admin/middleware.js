// Gates every /admin route behind a valid, allowlisted Firebase admin
// session, and every /super route behind the separate, platform-level
// super-admin allowlist. /admin/login is public so either kind of admin
// can actually sign in (the login page itself is shared — see its
// callbackUrl param). This is a UX-level gate (redirect before the page
// even renders) — the real security boundary is requireAdmin()/
// requireSuperAdmin() inside each Server Action, since actions can be
// invoked directly regardless of what page loaded.
import { NextResponse } from 'next/server';
import { verifyAdminToken, verifySuperAdminToken } from '@/lib/firebaseVerify';

export async function middleware(request) {
  const token = request.cookies.get('fb_token')?.value;
  const isSuperAdminRoute = request.nextUrl.pathname.startsWith('/super');
  const email = isSuperAdminRoute ? await verifySuperAdminToken(token) : await verifyAdminToken(token);

  if (!email) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/((?!login).*)', '/admin', '/super/((?!login).*)', '/super'],
};
