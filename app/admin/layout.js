'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const navItems = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/categories', label: 'Categories' },
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/reviews', label: 'Reviews' },
];

export default function AdminLayout({ children }) {
  const [user, setUser] = useState(undefined); // undefined = checking, null = signed out
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (!u && !isLoginPage) router.push('/admin/login');
    });
    return () => unsub();
  }, [isLoginPage, router]);

  if (isLoginPage) return children;

  if (user === undefined) {
    return <div className="min-h-[60vh] flex items-center justify-center text-inksoft">Checking access…</div>;
  }
  if (!user) return null; // redirecting

  return (
    <div className="max-w-6xl mx-auto px-8 py-10 flex gap-10">
      <aside className="w-48 shrink-0">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                pathname === item.href ? 'bg-navy-100 text-navy-800' : 'text-inksoft hover:bg-slate-100'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => signOut(auth)}
            className="mt-4 px-3 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg"
          >
            Sign Out
          </button>
        </nav>
      </aside>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
