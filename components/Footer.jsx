import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-slate-300 pt-16">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          <div>
            <span className="font-display font-bold text-white text-lg">Vedhanth IT Solutions</span>
            <p className="text-sm text-slate-400 mt-4 max-w-[280px]">
              CCTV &amp; security solutions, networking &amp; IT infrastructure, and biometric &amp; access
              control — installed and supported locally in Mudalapalya, Bengaluru.
            </p>
          </div>
          <div>
            <h5 className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-4">Company</h5>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/products">Products</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-4">Services</h5>
            <ul className="space-y-3 text-sm">
              <li>CCTV &amp; Security Solutions</li>
              <li>Networking &amp; IT Infrastructure</li>
              <li>Biometric &amp; Access Control</li>
              <li>Sales &amp; Service Support</li>
            </ul>
          </div>
          <div>
            <h5 className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-4">Contact</h5>
            <ul className="space-y-3 text-sm">
              <li><a href="tel:+917483528453">7483528453</a></li>
              <li><a href="mailto:vedhanthitsolutionsblr@gmail.com">vedhanthitsolutionsblr@gmail.com</a></li>
              <li>No. 25/50, 2nd Floor, First Main, SGV Nagar, Mudalapalya, Bengaluru 560072</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between items-center flex-wrap gap-3 py-6 text-xs text-slate-400">
          <span>© {new Date().getFullYear()} Vedhanth IT Solutions. All rights reserved.</span>
          <span>Proprietor: Yatheesh B G</span>
        </div>
      </div>
    </footer>
  );
}
