import 'server-only';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Throws if the caller isn't a signed-in admin. Every admin-only Server Action
// starts with `await requireAdmin()` — the middleware guards the pages, this
// guards the mutations themselves.
export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error('Not authorized.');
  }
  return session;
}
