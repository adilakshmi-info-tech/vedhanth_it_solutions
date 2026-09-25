import Link from 'next/link';
import Image from 'next/image';

const AVATARS = ['/images/home/avatar-anil.jpg', '/images/home/avatar-rajesh.jpg', '/images/home/avatar-priya.jpg'];

function AvatarStack() {
  return (
    <div className="flex flex-col gap-1.5">
      {[0, 1].map((row) => (
        <div key={row} className="flex">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="relative w-[22px] h-[22px] rounded-full ring-2 ring-white overflow-hidden -ml-2 first:ml-0"
            >
              <Image src={AVATARS[(row * 6 + i) % AVATARS.length]} alt="" fill className="object-cover" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function AboutHero() {
  return (
    <section className="bg-[#f7f7f7] pt-14 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[108px]">
        <div className="grid lg:grid-cols-[630px_1fr] gap-16 lg:gap-14 items-center">
          {/* Left: image collage */}
          <div className="relative w-full max-w-[630px] h-[520px] md:h-[600px] mx-auto lg:mx-0">
            <div className="absolute left-0 top-[28%] w-[46%] aspect-[300/378] rounded-[10px] overflow-hidden shadow-lg">
              <Image
                src="/images/home/about-main.jpg"
                alt="Vedhanth technician installing a security device"
                fill
                sizes="300px"
                className="object-cover"
              />
            </div>
            <div className="absolute right-0 top-[46%] w-[46%] aspect-[300/378] rounded-[10px] overflow-hidden shadow-lg">
              <Image
                src="/images/home/services-large.jpg"
                alt="Electrical LT panel maintenance"
                fill
                sizes="300px"
                className="object-cover"
              />
            </div>

            {/* Stat card */}
            <div className="absolute right-0 top-0 w-[239px] bg-white rounded-[10px] shadow-[20px_20px_50px_0px_rgba(0,0,0,0.08)] p-6">
              <p className="font-display font-bold text-[26px] text-[#10111a]">100+</p>
              <div className="w-6 h-4 float-right -mt-7">
                <svg viewBox="0 0 25 16" fill="none">
                  <path d="M1 14L9 6L14 11L24 1" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M17 1H24V8" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-[12px] text-[#97918b] mt-3 leading-relaxed">
                Projects completed for homes, businesses and industries across Bengaluru.
              </p>
              <div className="w-full h-[1.2px] bg-[#fb9f6d] mt-5 mb-5" />
              <AvatarStack />
            </div>

            {/* Best ratings card */}
            <div className="absolute left-[28%] bottom-0 w-[169px] bg-white rounded-[10px] shadow-[0px_17px_42px_0px_rgba(243,199,201,0.25)] p-5">
              <p className="text-[14px] font-semibold text-[#4b4b4b] tracking-[-0.14px]">Best ratings</p>
              <div className="w-[81px] h-1.5 rounded-full bg-[#f0f0f0] mt-4" />
              <div className="w-[62px] h-1.5 rounded-full bg-[#f0f0f0] mt-2" />
              <div className="mt-4 flex items-end gap-1 text-[21px]">
                <span>😡</span>
                <span>😟</span>
                <span>😑</span>
                <span>😜</span>
                <span className="text-[33px] leading-none">😁</span>
              </div>
            </div>
          </div>

          {/* Right: content */}
          <div className="max-w-[484px]">
            <span className="text-[#ec651b] text-[18px] font-semibold tracking-[6px] uppercase">About</span>
            <h1 className="font-display font-bold text-[42px] md:text-[52px] leading-[1.05] text-[#10111a] tracking-[5px] uppercase mt-4">
              About Us
            </h1>
            <p className="text-[#97918b] text-[18px] leading-[29px] mt-8">
              Vedhanth IT Solutions is a Bengaluru-based provider of integrated security, networking,
              electrical and infrastructure solutions. We plan, install and maintain CCTV, biometric
              access control, fire alarm, networking and electrical systems for homes, businesses and
              industrial sites — backed by responsive AMC support after every installation.
            </p>
            <Link
              href="/services"
              className="relative inline-flex items-center justify-center h-[65px] px-10 mt-10 rounded-l-[10px] bg-[#081732] text-white text-[18px] font-semibold tracking-[1.8px] uppercase hover:bg-[#0a1f42] transition"
              style={{ clipPath: 'polygon(0% 0%, 96% 0%, 100% 21%, 87% 100%, 0% 100%)' }}
            >
              Explore More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
