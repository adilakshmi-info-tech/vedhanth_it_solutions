'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const navItems = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/categories', label: 'Categories' },
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/reviews', label: 'Reviews' },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    await signOut(auth);
    // FirebaseSessionSync's onIdTokenChanged also clears the cookie on
    // sign-out, but clear it here too so the redirect below is immediate
    // rather than racing that listener.
    document.cookie = 'fb_token=; path=/; max-age=0; SameSite=Lax';
    router.push('/admin/login');
    router.refresh();
  }

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
        onClick={handleSignOut}
        className="mt-4 px-3 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg"
      >
        Sign Out
      </button>
    </nav>
  );
}
