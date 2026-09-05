'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const navItems = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/categories', label: 'Categories' },
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/reviews', label: 'Reviews' },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
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
        onClick={() => signOut({ callbackUrl: '/admin/login' })}
        className="mt-4 px-3 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg"
      >
        Sign Out
      </button>
    </nav>
  );
}
