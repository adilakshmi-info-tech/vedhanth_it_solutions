import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/firebaseVerify';
import { getTenantConfig } from '@/lib/data';
import AdminShell from './AdminShell';

// Middleware and Server Actions both verify this allowlisted Firebase session.
export default async function AdminPanelLayout({ children }) {
  const token = cookies().get('fb_token')?.value;
  const email = await verifyAdminToken(token);
  if (!email) redirect('/admin/login');

  const tenant = await getTenantConfig();
  const features = { reviews: true, enquiries: true, ...(tenant?.features || {}) };

  return <AdminShell adminEmail={email} features={features}>{children}</AdminShell>;
}
