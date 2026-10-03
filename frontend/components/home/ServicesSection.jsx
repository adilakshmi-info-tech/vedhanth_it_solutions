import Link from 'next/link';
import Image from 'next/image';

export default function ServicesSection() {
  return (
    <section className="py-16 md:py-20 bg-[#f2f2f2]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20">
        <h2 className="text-center font-display font-bold text-[32px] md:text-[42px] text-[#1e1e1e] mb-12 md:mb-16">
          Our Services
        </h2>

        <div className="grid md:grid-cols-2 gap-10 md:gap-[70px] items-center">
          <div>
            <span className="eyebrow">Services</span>
            <h3 className="font-display font-bold text-[32px] md:text-[42px] text-[#1e1e1e] mt-4 leading-tight max-w-[413px]">
              Comprehensive Solutions For Every Need
            </h3>
            <p className="text-[#1e1e1e]/80 text-[18px] mt-6 leading-[1.85] max-w-[556px]">
              CCTV Installation, Biometric Systems, Fire Alarms, Networking, Intercom &amp;
              EPABX, PA Systems, Electrical &amp; LT Panel Works, Desktop Sales &amp; Service.
            </p>
            <Link href="/services" className="link-accent mt-8">
              Explore
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-[223fr_492fr] gap-4 md:gap-6 w-full max-w-[720px] md:ml-auto">
            <div className="flex flex-col gap-4 md:gap-6">
              <div className="relative w-full aspect-[223/229] rounded-[10px] overflow-hidden shadow-lg">
                <Image
                  src="/images/home/services-top-small.jpg"
                  alt="Technician installing a biometric access lock"
                  fill
                  sizes="(min-width: 768px) 223px, 30vw"
                  className="object-cover"
                />
              </div>
              <div className="relative w-full aspect-[223/317] rounded-[10px] overflow-hidden shadow-lg">
                <Image
                  src="/images/home/services-bottom-small.jpg"
                  alt="EPABX intercom phone bank installation"
                  fill
                  sizes="(min-width: 768px) 223px, 30vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="relative w-full self-center aspect-[492/445] rounded-[10px] overflow-hidden shadow-lg">
              <Image
                src="/images/home/services-large.jpg"
                alt="LT panel room maintenance"
                fill
                sizes="(min-width: 768px) 492px, 55vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
