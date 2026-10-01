'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-[#081732]">
      <div className="max-w-[1440px] mx-auto h-20 flex items-center justify-between px-6 md:px-[50px]">
        <Link href="/" className="flex items-end gap-2 shrink-0">
          <Image src="/icons/logo-mark-white.png" alt="" width={38} height={41} className="h-[42px] w-auto" />
          <Image src="/icons/logo-wordmark-white.png" alt="Vedhanth IT Solutions" width={133} height={14} className="h-[13px] w-auto mb-2" />
        </Link>

        <nav className="hidden lg:flex items-center gap-[50px]">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`text-[18px] font-medium hover:text-accent-500 transition ${active ? 'text-accent-500' : 'text-white'}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center justify-center h-[52px] px-8 rounded-full border border-white text-white text-[15px] font-medium hover:bg-white hover:text-[#081732] transition"
          >
            Get a Quote
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
          >
            <span className={`block h-[2px] w-6 bg-white transition ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block h-[2px] w-6 bg-white transition ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-[2px] w-6 bg-white transition ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="lg:hidden border-t border-white/10 bg-[#081732] px-6 py-4 flex flex-col gap-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                aria-current={active ? 'page' : undefined}
                className={`py-2.5 text-sm font-semibold ${active ? 'text-accent-500' : 'text-white'}`}
              >
                {item.label}
              </Link>
            );
          })}
          <a href="tel:+919901975647" className="py-2.5 text-sm font-bold text-accent-500">Call — 9901975647</a>
        </nav>
      )}
    </header>
  );
}
