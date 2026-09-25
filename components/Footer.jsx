import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white text-[#0a142f]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[89px] pt-10 md:pt-[56px] pb-8">
        <div className="grid md:grid-cols-[291px_1fr] gap-8 md:gap-[70px]">
          <div>
            <Link href="/" className="flex items-end gap-2 mb-5">
              <Image src="/icons/logo-mark-navy.png" alt="" width={40} height={38} className="h-[36px] w-auto" />
              <Image src="/icons/logo-wordmark-navy.png" alt="Vedhanth" width={150} height={16} className="h-[13px] w-auto mb-1.5" />
            </Link>
            <p className="text-[14px] leading-[1.6] text-[#0a142f]/50 max-w-[248px]">
              Vedhanth IT Solutions delivers integrated security, networking, electrical and
              infrastructure solutions for homes, businesses and industries.
            </p>

            <form className="mt-6 flex items-center gap-2.5 border border-[#d9d9d9] rounded-[5px] p-2 max-w-[291px]">
              <Image src="/icons/search.png" alt="" width={14} height={14} className="invert opacity-60" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent text-sm text-[#0a142f]/60 placeholder:text-[#d9d9d9] outline-none w-full"
              />
            </form>

            <div className="flex items-center gap-8 mt-7">
              <a href="https://facebook.com" aria-label="Facebook" className="text-[#0a142f] hover:text-accent-500 transition">
                <Image src="/icons/facebook.png" alt="" width={9} height={18} />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="text-[#0a142f] hover:text-accent-500 transition">
                <Image src="/icons/twitter.png" alt="" width={19} height={16} />
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="text-[#0a142f] hover:text-accent-500 transition">
                <Image src="/icons/instagram.png" alt="" width={20} height={20} />
              </a>
            </div>
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
