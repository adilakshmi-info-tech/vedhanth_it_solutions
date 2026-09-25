import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/firebaseVerify';
import AdminNav from './AdminNav';
import AdminLogoutButton from './AdminLogoutButton';

// Middleware already blocks unauthenticated access; this is the
// server-side backstop, consistent with how requireAdmin() re-checks
// inside every Server Action rather than trusting the page layer alone.
export default async function AdminPanelLayout({ children }) {
  const token = cookies().get('fb_token')?.value;
  const email = await verifyAdminToken(token);
  if (!email) redirect('/admin/login');

  return (
    <div className="bg-paper min-h-screen">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="font-display font-extrabold text-2xl text-navy-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-sm text-inksoft mt-0.5">Manage your categories, products and reviews</p>
          </div>
          <AdminLogoutButton />
        </div>
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <AdminNav />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 md:px-8 py-10">{children}</div>
    </div>
  );
}
