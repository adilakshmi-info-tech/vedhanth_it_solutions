import Link from 'next/link';
import ReviewsSection from '@/components/ReviewsSection';

const services = [
  {
    title: 'CCTV & Security Solutions',
    desc: 'Dome, bullet & PTZ camera installation, monitoring and support.',
  },
  {
    title: 'Networking & IT Infrastructure',
    desc: 'Wired & wireless network setup for offices and homes.',
  },
  {
    title: 'Biometric & Access Control',
    desc: 'Fingerprint & face-recognition attendance and access systems.',
  },
  {
    title: 'Sales & Service Support',
    desc: 'Equipment sales backed by ongoing service and AMC support.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-navy-900 overflow-hidden pb-24">
        <div className="max-w-6xl mx-auto px-8 pt-24 pb-16 max-w-[640px] relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-slate-200 text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> Mudalapalya, Bengaluru
          </div>
          <h1 className="font-display font-semibold text-4xl md:text-5xl text-white leading-tight">
            Your security <span className="text-cyan-500">is our business.</span>
          </h1>
          <p className="mt-5 text-lg text-slate-300 max-w-[520px] leading-relaxed">
            Providing the right CCTV, networking and access-control solutions for your requirements —
            sales, installation and ongoing service support, under one dealer.
          </p>
          <div className="flex gap-3.5 mt-8 flex-wrap">
            <a href="tel:+917483528453" className="btn btn-white btn-lg">Call Now — 7483528453</a>
            <a href="https://wa.me/917483528453" className="btn btn-outline-w btn-lg">WhatsApp Us</a>
          </div>
        </div>
      </section>

      {/* ABOUT INTRO */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <span className="text-xs font-bold tracking-widest uppercase text-cyan-600">About Us</span>
          <h2 className="font-display text-3xl text-navy-900 mt-3">Welcome to Vedhanth IT Solutions</h2>
          <p className="text-inksoft mt-4 leading-relaxed">
            We deliver CCTV, networking and access-control solutions in and around Bengaluru —
            experienced professionals committed to giving customers the right security setup for their
            site, backed by after-sales support.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 bg-paper" id="services">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest uppercase text-cyan-600">What we do</span>
            <h2 className="font-display text-3xl text-navy-900 mt-3">Our products and services</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {services.map((s) => (
              <div key={s.title} className="card">
                <h3 className="font-semibold text-navy-900 text-[15.5px] mb-1.5">{s.title}</h3>
                <p className="text-[13px] text-inksoft leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/products" className="btn btn-ghost">Browse all products</Link>
          </div>
        </div>
      </section>

      <ReviewsSection />

      {/* CONTACT CTA */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-8">
          <div className="bg-navy-800 rounded-3xl px-10 py-12 flex flex-wrap items-center justify-between gap-8 text-white">
            <div>
              <h2 className="font-display text-2xl mb-2">Need something installed or serviced?</h2>
              <p className="text-slate-300 text-sm">Call, WhatsApp, or visit us in Mudalapalya — we usually reply within the hour.</p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <a href="tel:+917483528453" className="btn btn-white">Call Now</a>
              <a href="https://wa.me/917483528453" className="btn btn-outline-w">WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
