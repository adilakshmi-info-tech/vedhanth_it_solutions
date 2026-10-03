import 'server-only';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/firebaseVerify';

// Fails fast locally (same UX as before) AND hands back the raw token so
// the caller can forward it to backend as Authorization: Bearer — backend
// re-verifies it independently rather than trusting this check alone.
export async function requireAdmin() {
  const token = cookies().get('fb_token')?.value;
  const email = await verifyAdminToken(token);
  if (!email) {
    throw new Error('Not authorized.');
  }
  return { email, token };
}
