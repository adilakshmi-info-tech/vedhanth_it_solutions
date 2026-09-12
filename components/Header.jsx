'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/amc', label: 'AMC' },
  { href: '/products', label: 'Products' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur transition-all ${
        scrolled ? 'border-b border-slate-200 shadow-sm' : 'border-b border-transparent'
      }`}
    >
      <div
        className={`max-w-6xl mx-auto px-6 md:px-8 flex items-center justify-between transition-all ${
          scrolled ? 'h-[64px]' : 'h-[76px]'
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image src="/logo.png" alt="Vedhanth IT Solutions logo" width={38} height={38} />
          <span className="font-display font-extrabold text-[18px] text-navy-900 leading-tight tracking-tight">
            Vedhanth IT Solutions
            <span className="block font-sans font-semibold text-[10px] tracking-[0.16em] text-inksoft">
              ELECTRICAL &middot; ELV &middot; SECURITY &middot; IT
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex gap-7">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-semibold text-navy-800 hover:text-green-500 transition">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="tel:+917483528453" className="hidden lg:block text-sm font-bold text-navy-800">
            Call Us
          </a>
          <Link href="/contact" className="btn btn-primary hidden sm:inline-flex">Get a Quote</Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
          >
            <span className={`block h-[2px] w-6 bg-navy-900 transition ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block h-[2px] w-6 bg-navy-900 transition ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-[2px] w-6 bg-navy-900 transition ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-slate-200 bg-white px-6 py-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="py-2.5 text-sm font-semibold text-navy-800"
            >
              {item.label}
            </Link>
          ))}
          <a href="tel:+917483528453" className="py-2.5 text-sm font-bold text-green-500">Call — 7483528453</a>
        </nav>
      )}
    </header>
  );
}
