import Link from 'next/link';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section className="py-16 md:py-20 bg-[#f2f2f2]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20">
        <h2 className="text-center font-display font-bold text-[32px] md:text-[42px] text-[#1e1e1e] mb-10 md:mb-12">
          About Us
        </h2>

        <div className="grid md:grid-cols-[629fr_617fr] gap-10 md:gap-[70px] items-center">
          <div className="relative max-w-[629px] order-2 md:order-1">
            <div className="aspect-[629/445] rounded-[20px] overflow-hidden relative shadow-[30px_30px_60px_-20px_rgba(0,0,0,0.25)]">
              <Image
                src="/images/home/about-main.jpg"
                alt="Vedhanth technician installing a security camera"
                fill
                sizes="(min-width: 768px) 629px, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="order-1 md:order-2">
            <span className="eyebrow">About</span>
            <h3 className="font-display font-bold text-[32px] md:text-[42px] text-[#1e1e1e] mt-4 leading-tight capitalize max-w-[413px]">
              Built Around Your Security &amp; Infrastructure
            </h3>
            <p className="text-[#1e1e1e]/80 text-[18px] mt-6 leading-[1.85] max-w-[556px]">
              We deliver complete end-to-end security and infrastructure solutions — from
              initial assessment and professional installation to ongoing maintenance and
              responsive support.
            </p>
            <Link href="/about" className="link-accent mt-8">
              Learn More
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
