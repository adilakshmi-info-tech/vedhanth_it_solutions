import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifySuperAdminToken } from '@/lib/firebaseVerify';
import AdminLogoutButton from '../admin/(panel)/AdminLogoutButton';

// Deliberately NOT nested under app/admin/(panel) and not linked from
// AdminNav — a regular tenant admin should never see or reach this.
// Reuses the existing /admin/login page via its callbackUrl param instead
// of a separate login page.
export const metadata = {
  title: 'Platform Admin',
  robots: { index: false, follow: false },
};

export default async function SuperAdminLayout({ children }) {
  const token = cookies().get('fb_token')?.value;
  const email = await verifySuperAdminToken(token);
  if (!email) redirect('/admin/login?callbackUrl=/super');

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <header className="mb-8 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-inksoft">Platform admin</p>
          <h1 className="text-xl font-bold text-navy-900">Tenants</h1>
          <p className="text-xs text-inksoft mt-1">Signed in as {email}</p>
        </div>
        <AdminLogoutButton />
      </header>
      {children}
    </div>
  );
}
