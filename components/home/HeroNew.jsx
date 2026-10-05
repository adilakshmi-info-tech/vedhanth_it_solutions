'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroNew() {
  const [query, setQuery] = useState('');

  return (
    <section className="relative bg-[#081732] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/home/hero-bg.jpg"
          alt="Vedhanth technician reviewing CCTV installation"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[86.13%] from-transparent to-white" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-[100px] pt-[96px] pb-[120px] sm:pt-[130px] sm:pb-[160px] md:pt-[226px] md:pb-[255px]">
        <h1 className="capitalize font-display font-bold text-[38px] min-[420px]:text-[44px] sm:text-[56px] md:text-[80px] leading-[1.15] md:leading-[1.3] tracking-[-0.8px] text-white max-w-[978px]">
          Secure Your World Connect<br className="hidden md:block" /> Your Future.
        </h1>

        <p className="mt-6 md:mt-[24px] max-w-[606px] text-left md:text-center text-base sm:text-lg md:text-[24px] leading-[1.6] text-white/80">
          Integrated security, networking and electrical solutions designed to keep your
          people, property and operations connected and protected.
        </p>

        <div className="mt-7 md:mt-[55px] md:ml-[74px] flex gap-3 sm:gap-4 md:gap-[45px] flex-wrap">
          <Link
            href="/services"
            className="inline-flex items-center justify-center min-h-[48px] h-[52px] px-5 sm:px-8 rounded-[26px] bg-[#091832] border border-white text-white text-sm sm:text-[16px] font-medium"
          >
            Explore Our Services
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center min-h-[48px] h-[52px] px-5 sm:px-8 rounded-[26px] bg-white/15 border border-white/60 text-white text-sm sm:text-[16px] font-medium backdrop-blur-sm"
          >
            Get a Quote
          </Link>
        </div>

        <form
          action="/products"
          className="mt-8 md:mt-[92px] md:mx-auto flex items-center justify-between max-w-[344px] rounded-[42px] border border-white/60 bg-white/15 backdrop-blur-sm pl-5 pr-2 h-14"
        >
          <input
            type="text"
            name="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search solutions"
            className="bg-transparent text-white placeholder:text-white/80 text-[18px] outline-none w-full"
          />
          <button
            type="submit"
            aria-label="Search"
            className="shrink-0 w-10 h-10 rounded-[24px] bg-[#091832] flex items-center justify-center"
          >
            <Image src="/icons/search.png" alt="" width={18} height={18} />
          </button>
        </form>
      </div>
    </section>
  );
}
