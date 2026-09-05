import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-8 h-[76px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="Vedhanth IT Solutions logo" width={40} height={40} />
          <span className="font-display font-bold text-[19px] text-navy-900 leading-tight">
            Vedhanth IT Solutions
            <span className="block font-sans font-semibold text-[10.5px] tracking-[0.14em] text-inksoft">
              CCTV, IT &amp; SECURITY SOLUTIONS
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex gap-8">
          <Link href="/" className="text-sm font-semibold hover:text-navy-700">Home</Link>
          <Link href="/about" className="text-sm font-semibold hover:text-navy-700">About</Link>
          <Link href="/services" className="text-sm font-semibold hover:text-navy-700">Services</Link>
          <Link href="/products" className="text-sm font-semibold hover:text-navy-700">Products</Link>
          <Link href="/contact" className="text-sm font-semibold hover:text-navy-700">Contact</Link>
        </nav>

        <div className="flex items-center gap-4">
          <a href="tel:+917483528453" className="hidden sm:block text-sm font-bold text-navy-800">
            7483528453
          </a>
          <Link href="/contact" className="btn btn-primary">Get a Quote</Link>
        </div>
      </div>
    </header>
  );
}
