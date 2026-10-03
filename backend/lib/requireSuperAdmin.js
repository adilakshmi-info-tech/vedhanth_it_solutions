import 'server-only';
import { verifySuperAdminToken } from '@/lib/firebaseVerify';

// Mirrors requireAdmin.js exactly, checked against the separate
// super-admin allowlist — a platform-level permission, not tied to any
// one tenant.
export async function requireSuperAdmin(request) {
  const header = request.headers.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice('Bearer '.length) : null;
  const email = await verifySuperAdminToken(token);
  if (!email) {
    throw new Error('Not authorized.');
  }
  return { email };
}
