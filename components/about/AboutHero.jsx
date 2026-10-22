import Link from 'next/link';
import Image from 'next/image';

const AVATARS = ['/images/home/avatar-anil.jpg', '/images/home/avatar-rajesh.jpg', '/images/home/avatar-priya.jpg'];
const RATING_REACTIONS = [
  { emoji: '😡', label: 'Angry' },
  { emoji: '😟', label: 'Sad' },
  { emoji: '😑', label: 'Neutral' },
  { emoji: '😜', label: 'Playful' },
  { emoji: '😁', label: 'Happy', large: true },
];

const ratingEmojiClass =
  'relative z-0 inline-flex shrink-0 cursor-pointer select-none items-center justify-center rounded-full border-0 bg-transparent p-0 leading-none origin-center transform-gpu transition-[transform,filter] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:z-10 hover:-translate-y-1 hover:scale-[1.6] hover:drop-shadow-[0_4px_7px_rgba(245,158,11,0.35)] focus:z-10 focus:-translate-y-1 focus:scale-[1.6] focus:drop-shadow-[0_4px_7px_rgba(245,158,11,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e58411] active:scale-[1.6] motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:hover:translate-y-0 motion-reduce:focus:scale-100 motion-reduce:focus:translate-y-0 motion-reduce:active:scale-100 motion-reduce:active:translate-y-0';

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
              <Image src={AVATARS[(row * 6 + i) % AVATARS.length]} alt="" fill sizes="22px" className="object-cover" />
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
                sizes="(min-width: 1440px) 290px, (min-width: 1024px) 27vw, 46vw"
                className="object-cover"
              />
            </div>
            <div className="absolute right-0 top-[46%] w-[46%] aspect-[300/378] rounded-[10px] overflow-hidden shadow-lg">
              <Image
                src="/images/home/about-electrical-meter.png"
                alt="Electrical LT panel maintenance"
                fill
                sizes="(min-width: 1440px) 290px, (min-width: 1024px) 27vw, 46vw"
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
              <div className="relative isolate mt-4 flex items-center gap-0.5 overflow-visible" role="group" aria-label="Best ratings reactions">
                {RATING_REACTIONS.map(({ emoji, label, large }) => (
                  <button
                    key={label}
                    type="button"
                    aria-label={`${label} reaction`}
                    className={`${ratingEmojiClass} ${large ? 'text-[33px]' : 'text-[21px]'}`}
                  >
                    {emoji}
                  </button>
                ))}
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
              aria-label="Explore more services"
              className="relative block w-[223px] h-[65px] mt-10 text-white no-underline"
            >
              <span className="absolute inset-0 flex items-center justify-center overflow-visible" aria-hidden="true">
                <span className="relative flex-none w-[223px] h-[65px]" style={{ transform: 'rotate(180deg)' }}>
                  <Image
                    src="/images/services/figma/button.svg"
                    alt=""
                    width={378}
                    height={246}
                    style={{ position: 'absolute', display: 'block', maxWidth: 'none', inset: '-1.99% -35.87% -276.92% -33.68%' }}
                  />
                </span>
              </span>
              <span className="absolute top-[19px] left-[30px] whitespace-nowrap font-sans text-[18px] font-[590] leading-[28px] tracking-[1.8px] uppercase text-white">
                Explore More
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
