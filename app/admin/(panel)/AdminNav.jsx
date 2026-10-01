'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './admin.module.css';

const items = [
  ['Dashboard', '/admin', 'grid'],
  ['Client Reviews', '/admin/reviews', 'review'],
  ['Enquiries', '/admin/enquiries', 'inbox'],
  ['Products', '/admin/products', 'box'],
  ['Categories', '/admin/categories', 'folder'],
];

const paths = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
  review: <><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H6l-3 2v-9.5A7.5 7.5 0 0 1 10.5 4H12"/><path d="m15 5 2 2 4-4"/></>,
  inbox: <><path d="M4 4h16v16H4z"/><path d="M4 13h4l2 3h4l2-3h4"/></>,
  box: <><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="M3 8v9l9 5 9-5V8M12 13v9"/></>,
  folder: <><path d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Z"/></>,
};

export default function AdminNav({ onNavigate, mobile = false }) {
  const pathname = usePathname();
  return (
    <nav className={mobile ? styles.mobileNav : styles.nav} aria-label="Admin navigation">
      {items.map(([label, href, icon]) => {
        const active = href === '/admin' ? pathname === href : pathname.startsWith(href);
        return (
          <Link key={href} href={href} onClick={onNavigate} aria-current={active ? 'page' : undefined} className={`${styles.navLink} ${active ? styles.navLinkActive : ''}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[icon]}</svg>
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
