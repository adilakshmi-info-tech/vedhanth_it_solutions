'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AdminNav from './AdminNav';
import AdminLogoutButton from './AdminLogoutButton';
import styles from './admin.module.css';

const titles = [
  ['/admin/reviews', 'Client Reviews'], ['/admin/enquiries', 'Enquiries'],
  ['/admin/products', 'Products'], ['/admin/categories', 'Categories'],
  ['/admin', 'Dashboard'],
];

export default function AdminShell({ children, adminEmail }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const title = titles.find(([path]) => path === '/admin' ? pathname === path : pathname.startsWith(path))?.[1] || 'Dashboard';
  const initials = (adminEmail || 'Admin').slice(0, 1).toUpperCase();

  return (
    <div className={styles.appShell}>
      <aside className={styles.sidebar}>
        <Link className={styles.brand} href="/admin" aria-label="Vedhanth admin dashboard">
          <Image src="/logo-full.svg" width={178} height={46} alt="Vedhanth IT Solutions" priority />
        </Link>
        <div className={styles.sidebarLabel}>WORKSPACE</div>
        <AdminNav />
        <div className={styles.sidebarBottom}>
          <div className={styles.accountCard}>
            <span className={styles.avatar}>{initials}</span>
            <span className={styles.accountText}><strong>Administrator</strong><small title={adminEmail}>{adminEmail}</small></span>
          </div>
          <AdminLogoutButton />
        </div>
      </aside>

      <div className={styles.mobileDrawerLayer} data-open={menuOpen || undefined}>
        <button className={styles.drawerScrim} aria-label="Close navigation" onClick={() => setMenuOpen(false)} />
        <aside className={styles.mobileDrawer}>
          <Link className={styles.brand} href="/admin" onClick={() => setMenuOpen(false)} aria-label="Vedhanth admin dashboard">
            <Image src="/logo-full.svg" width={178} height={46} alt="Vedhanth IT Solutions" />
          </Link>
          <AdminNav mobile onNavigate={() => setMenuOpen(false)} />
          <div className={styles.sidebarBottom}>
            <div className={styles.accountCard}><span className={styles.avatar}>{initials}</span><span className={styles.accountText}><strong>Administrator</strong><small>{adminEmail}</small></span></div>
            <AdminLogoutButton />
          </div>
        </aside>
      </div>

      <div className={styles.mainColumn}>
        <header className={styles.topbar}>
          <button className={styles.menuButton} onClick={() => setMenuOpen(true)} aria-label="Open navigation">
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
          <div className={styles.topbarTitle}><span>Admin workspace</span><h1>{title}</h1></div>
          <div className={styles.topbarAccount}><span className={styles.avatar}>{initials}</span><span><strong>Administrator</strong><small>{adminEmail}</small></span></div>
        </header>
        <main className={styles.mainContent}>{children}</main>
      </div>
    </div>
  );
}
