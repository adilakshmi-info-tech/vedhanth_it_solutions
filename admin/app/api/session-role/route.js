import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { verifyAdminToken, verifySuperAdminToken } from '@/lib/firebaseVerify';

export const dynamic = 'force-dynamic';

// Lets the login page figure out where a just-signed-in account actually
// belongs, since the same Firebase project backs two independent
// allowlists (regular tenant admin vs platform super admin) and an
// account might only be in one of them.
export async function GET() {
  const token = cookies().get('fb_token')?.value;
  const [isAdmin, isSuperAdmin] = await Promise.all([
    verifyAdminToken(token).then(Boolean),
    verifySuperAdminToken(token).then(Boolean),
  ]);
  return NextResponse.json({ isAdmin, isSuperAdmin });
}
