import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import AdminNav from './AdminNav';

// Middleware already blocks unauthenticated access; this is the server-side
// backstop and also gives us the session for the layout.
export default async function AdminPanelLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/admin/login');

  return (
    <div className="max-w-6xl mx-auto px-8 py-10 flex gap-10">
      <aside className="w-48 shrink-0">
        <AdminNav />
      </aside>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
