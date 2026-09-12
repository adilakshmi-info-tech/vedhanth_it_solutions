'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// The 5 core service slots the hero always shows, in this order. Any slot
// with a real, photographed product (passed in via `dbSlides`, one per
// category from lib/data.js's getHeroSlides) uses that photo; any slot
// without one yet falls back to a technical/blueprint-pattern slide
// instead of a broken or generic stock image.
const SLOTS = [
  {
    match: 'electrical',
    label: 'Electrical & LT Panels',
    headline: 'POWERING INFRASTRUCTURE.',
    sub: 'New wiring, LT panel installation, cable laying & glanding, and maintenance of panels, motors, transformers & UPS.',
  },
  {
    match: 'cctv',
    label: 'CCTV & Security',
    headline: 'SECURITY THAT WATCHES.',
    sub: 'Dome, bullet, PTZ and solar-powered camera installation and service, for homes, shops and industrial sites.',
  },
  {
    match: 'biometric',
    label: 'Biometric & Access Control',
    headline: 'ACCESS, CONTROLLED.',
    sub: 'Fingerprint attendance systems and door access control, installed and commissioned end to end.',
  },
  {
    match: 'fire',
    label: 'Fire Alarm Systems',
    headline: 'SYSTEMS THAT RESPOND.',
    sub: 'Fire alarm panels, detectors and alarms — wired to primary and backup power, installed to protect your premises.',
  },
  {
    match: 'network',
    label: 'Networking & IT',
    headline: 'CONNECTING TECHNOLOGY.',
    sub: 'Structured cabling, network installation, EPABX/intercom and complete IT sales, service and support.',
  },
];

export default function Hero({ dbSlides = [] }) {
  const slides = useMemo(
    () =>
      SLOTS.map((slot) => {
        const real = dbSlides.find((s) => s.categoryName.toLowerCase().includes(slot.match));
        return { ...slot, image: real?.image || null, categorySlug: real?.categorySlug || null };
      }),
    [dbSlides]
  );

  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 5500);
    return () => clearInterval(id);
  }, [slides.length]);

  const current = slides[active];

  return (
    <section className="relative bg-navy-900 overflow-hidden">
      {/* Slide backgrounds — photo if we have one, blueprint pattern if not */}
      <div className="absolute inset-0">
        {slides.map((s, i) => (
          <div
            key={s.label}
            className={`absolute inset-0 transition-opacity duration-700 ${i === active ? 'opacity-100' : 'opacity-0'}`}
          >
            {s.image ? (
              <Image src={s.image} alt={s.label} fill unoptimized priority={i === 0} className="object-cover" />
            ) : (
              <div className="absolute inset-0 bg-blueprint" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/85 to-navy-900/40" />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-[640px]">
          <div className="inline-flex items-center gap-2 border border-white/25 text-cyan-200 text-xs font-bold tracking-[0.2em] uppercase px-3.5 py-1.5 mb-6 transition-all">
            <span className="w-1.5 h-1.5 bg-cyan-500" />
            {current.label}
          </div>

          <h1 className="font-display font-extrabold text-4xl md:text-6xl text-white leading-[1.05] tracking-tight">
            POWERING INFRASTRUCTURE.
            <br />
            <span className="text-cyan-500">CONNECTING TECHNOLOGY.</span>
          </h1>

          <p className="mt-6 text-lg text-slate-300 max-w-[540px] leading-relaxed">
            Complete Electrical, ELV, Security, Networking &amp; IT Solutions — from installation
            and troubleshooting to maintenance, AMC, sales and service.
          </p>

          <div className="flex gap-3.5 mt-9 flex-wrap">
            <Link href="/contact" className="btn btn-primary btn-lg">Request a Quote</Link>
            <a href="tel:+917483528453" className="btn btn-outline-w btn-lg">Talk to an Expert</a>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 pb-8 flex gap-2">
        {slides.map((s, i) => (
          <button
            key={s.label}
            aria-label={`Show ${s.label}`}
            onClick={() => setActive(i)}
            className={`h-[3px] transition-all ${i === active ? 'w-10 bg-cyan-500' : 'w-5 bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>
    </section>
  );
}
