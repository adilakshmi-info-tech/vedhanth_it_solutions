import 'server-only';
import { cookies } from 'next/headers';
import { verifySuperAdminToken } from '@/lib/firebaseVerify';

// Mirrors requireAdmin.js exactly, checked against the separate
// super-admin allowlist — a platform-level permission, not tied to any
// one tenant.
export async function requireSuperAdmin() {
  const token = cookies().get('fb_token')?.value;
  const email = await verifySuperAdminToken(token);
  if (!email) {
    throw new Error('Not authorized.');
  }
  return { email, token };
}
