import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/firebaseVerify';
import AdminShell from './AdminShell';

// Middleware and Server Actions both verify this allowlisted Firebase session.
export default async function AdminPanelLayout({ children }) {
  const token = cookies().get('fb_token')?.value;
  const email = await verifyAdminToken(token);
  if (!email) redirect('/admin/login');

  return <AdminShell adminEmail={email}>{children}</AdminShell>;
}
