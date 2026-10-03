'use client';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (!menuOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  return (
    <header className="site-header sticky top-0 z-50 bg-[#081732]">
      <div className="site-header-inner max-w-[1440px] mx-auto h-20 flex items-center justify-between px-6 md:px-[50px]">
        {/* Raw logo file as supplied — served unoptimized so Next.js never
            re-encodes/recompresses it; only its on-screen height is set via
            CSS, the source file itself is untouched. */}
        <Link href="/" aria-label="Vedhanth IT Solutions home" className="flex items-end shrink-0">
          <Image
            src="/icons/logo-header.png"
            alt="Vedhanth IT Solutions"
            width={900}
            height={356}
            unoptimized
            priority
            className="h-[52px] w-auto"
          />
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
            aria-expanded={menuOpen}
            aria-controls="site-mobile-navigation"
            onClick={() => setMenuOpen((v) => !v)}
            className="site-menu-button lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
          >
            <span className={`block h-[2px] w-6 bg-white transition ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block h-[2px] w-6 bg-white transition ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-[2px] w-6 bg-white transition ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="site-mobile-navigation" className="site-mobile-navigation lg:hidden border-t border-white/10 bg-[#081732] px-6 py-4 flex flex-col gap-1">
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
        </nav>
      )}
    </header>
  );
}
