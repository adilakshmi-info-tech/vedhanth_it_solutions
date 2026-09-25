import 'server-only';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/firebaseVerify';

// Throws if the caller isn't a signed-in, allowlisted admin. Every
// admin-only Server Action starts with `await requireAdmin()` — middleware
// guards the pages, this guards the mutations themselves (a Server Action
// can be invoked directly, bypassing any page-level gate).
export async function requireAdmin() {
  const token = cookies().get('fb_token')?.value;
  const email = await verifyAdminToken(token);
  if (!email) {
    throw new Error('Not authorized.');
  }
  return { email };
}
