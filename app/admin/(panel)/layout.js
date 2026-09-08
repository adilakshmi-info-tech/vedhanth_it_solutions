import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/firebaseVerify';
import AdminNav from './AdminNav';

// Middleware already blocks unauthenticated access; this is the
// server-side backstop, consistent with how requireAdmin() re-checks
// inside every Server Action rather than trusting the page layer alone.
export default async function AdminPanelLayout({ children }) {
  const token = cookies().get('fb_token')?.value;
  const email = await verifyAdminToken(token);
  if (!email) redirect('/admin/login');

  return (
    <div className="max-w-6xl mx-auto px-8 py-10 flex gap-10">
      <aside className="w-48 shrink-0">
        <AdminNav />
      </aside>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
