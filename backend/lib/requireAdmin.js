import 'server-only';
import { verifyAdminToken } from '@/lib/firebaseVerify';

// Called with the incoming Request. Unlike the old same-app Server Actions
// (which read the fb_token cookie directly, because the browser's cookie
// was already on the request), the browser's session lives in the admin
// app now — admin forwards the signed-in admin's Firebase ID token as a
// Bearer header on its server-to-server call, and this re-verifies it
// independently rather than trusting that admin already checked it.
export async function requireAdmin(request) {
  const header = request.headers.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice('Bearer '.length) : null;
  const email = await verifyAdminToken(token);
  if (!email) {
    throw new Error('Not authorized.');
  }
  return { email };
}
