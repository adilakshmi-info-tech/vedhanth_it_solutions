// Gates every /admin route behind a valid, allowlisted Firebase admin
// session, and every /super route behind the separate, platform-level
// super-admin allowlist. /admin/login and /admin/api/session-role are
// public — the login page calls session-role to figure out which (if
// either) allowlist a just-signed-in account is on, before it's known
// which area to send them to, so that one specific endpoint can't be
// behind either gate. This is a UX-level gate (redirect before the page
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
  matcher: ['/admin/((?!login|api/session-role).*)', '/admin', '/super/((?!login).*)', '/super'],
};
