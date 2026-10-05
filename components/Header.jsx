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

// A dedicated SVG X instead of morphing the hamburger bars via CSS
// transforms — the morph's rotate+translate on each bar doesn't compose
// into a visually centered X (each bar rotates around its own center, so
// the translate then moves it along the rotated axis, not straight up/down),
// which is what made the previous close icon look uneven/off-center.
function CloseIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" />
    </svg>
  );
}

function MenuIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

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
            className="h-[64px] w-auto"
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
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="site-mobile-navigation"
            onClick={() => setMenuOpen((v) => !v)}
            className="site-menu-button lg:hidden w-9 h-9 flex items-center justify-center text-white"
          >
            {menuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
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
