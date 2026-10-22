import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="site-footer bg-white text-[#0a142f]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[89px] pt-10 md:pt-[56px] pb-8">
        <div className="grid md:grid-cols-[291px_1fr] gap-8 md:gap-[70px]">
          <div>
            <Link href="/" className="flex items-end mb-5">
              <Image
                src="/icons/logo-footer.png"
                alt="Vedhanth IT Solutions"
                width={968}
                height={456}
                unoptimized
                className="h-[84px] w-auto"
              />
            </Link>
            <p className="text-[14px] leading-[1.6] text-[#0a142f]/50 max-w-[248px]">
              Vedhanth IT Solutions delivers integrated security, networking, electrical and
              infrastructure solutions for homes, businesses and industries.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h5 className="font-bold text-[15px] leading-6 mb-2.5">Services</h5>
              <ul className="flex flex-col gap-2 text-[14px] font-medium">
                <li><Link href="/services" className="text-[#0a142f]/50 hover:text-accent-500 transition">CCTV Installation</Link></li>
                <li><Link href="/services" className="text-[#0a142f]/50 hover:text-accent-500 transition">Electrical Works</Link></li>
                <li><Link href="/services" className="text-[#0a142f]/50 hover:text-accent-500 transition">Networking</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-[15px] leading-6 mb-2.5">Products</h5>
              <ul className="flex flex-col gap-2 text-[14px] font-medium">
                <li><Link href="/products" className="text-[#0a142f]/50 hover:text-accent-500 transition">CCTV Systems</Link></li>
                <li><Link href="/products" className="text-[#0a142f]/50 hover:text-accent-500 transition">Biometric</Link></li>
                <li><Link href="/products" className="text-[#0a142f]/50 hover:text-accent-500 transition">Fire Alarm</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-[15px] leading-6 mb-2.5">Contact</h5>
              <ul className="flex flex-col gap-2 text-[14px] font-medium">
                <li><a href="tel:+919901975647" className="text-[#0a142f]/50 hover:text-accent-500 transition">+91 9901975647</a></li>
                <li><a href="tel:+919740005741" className="text-[#0a142f]/50 hover:text-accent-500 transition">+91 9740005741</a></li>
                <li><a href="mailto:sales@vedhanthitsolutions.in" className="text-[#0a142f]/50 hover:text-accent-500 transition break-words">sales@vedhanthitsolutions.in</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center flex-wrap gap-3 pt-5 mt-6 text-xs text-[#0a142f]/40 border-t border-slate-100">
          <span>© {new Date().getFullYear()} Vedhanth IT Solutions. All rights reserved.</span>
          <span>Proprietor: Yatheesh B G</span>
        </div>
      </div>
    </footer>
  );
}
