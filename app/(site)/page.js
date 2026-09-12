import Link from 'next/link';
import ReviewsSection from '@/components/ReviewsSection';
import ScrollReveal from '@/components/ScrollReveal';
import Hero from '@/components/home/Hero';
import ServicesShowcase from '@/components/home/ServicesShowcase';
import SignatureDiagram from '@/components/home/SignatureDiagram';
import { getApprovedReviews, getHeroSlides } from '@/lib/data';

// Rendered per request on the server so it always reflects the live database
// (no build-time DB dependency, no stale cache after an admin edit).
export const dynamic = 'force-dynamic';

const TRUST_STRIP = ['Electrical Systems', 'LT Panels', 'CCTV & Security', 'Networking', 'IT Solutions', 'AMC & Maintenance'];

const WHY_US = [
  { title: 'Technical Expertise', desc: 'Professional installation and maintenance across every system we handle.' },
  { title: 'End-to-End Solutions', desc: 'Electrical, ELV, networking and IT under one roof — one point of contact.' },
  { title: 'Fast Troubleshooting', desc: 'Quick technical response for breakdowns and connection issues.' },
  { title: 'Multi-Brand Support', desc: 'Sales and service across multiple brands, not tied to one manufacturer.' },
  { title: 'AMC Support', desc: 'Preventive maintenance and ongoing technical assistance, on schedule.' },
  { title: 'Quality & Safety', desc: 'Professional workmanship with a focus on reliability and safety.' },
];

const INDUSTRIES = ['Residential', 'Offices', 'Commercial Buildings', 'Factories', 'Warehouses', 'Schools', 'Institutions', 'Hospitals', 'Retail', 'Small & Medium Businesses'];

const PROCESS = [
  { n: '01', title: 'Understand', desc: 'Understand the requirement and inspect the site or system.' },
  { n: '02', title: 'Plan', desc: 'Recommend the appropriate technical solution.' },
  { n: '03', title: 'Execute', desc: 'Install, test and commission the system.' },
  { n: '04', title: 'Support', desc: 'Provide troubleshooting, maintenance and AMC support.' },
];

const SALES_STAGES = [
  { n: '01', title: 'Select', desc: 'Choose the right equipment for your site and budget.' },
  { n: '02', title: 'Install', desc: 'Professional installation, tested and commissioned.' },
  { n: '03', title: 'Service', desc: 'Ongoing service keeps every system running.' },
  { n: '04', title: 'Support', desc: 'Troubleshooting and AMC support, whenever you need it.' },
];

export default async function HomePage() {
  const [reviews, heroSlides] = await Promise.all([getApprovedReviews(3), getHeroSlides(5)]);

  return (
    <>
      <Hero dbSlides={heroSlides} />

      {/* TRUST STRIP */}
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-4 flex flex-wrap gap-x-8 gap-y-2 justify-center">
          {TRUST_STRIP.map((t) => (
            <span key={t} className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-inksoft">
              <span className="w-1.5 h-1.5 bg-green-500 shrink-0" />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* WHO WE ARE */}
      <section className="py-24">
        <ScrollReveal className="max-w-3xl mx-auto px-6 md:px-8 text-center">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-green-600">Who We Are</span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy-900 mt-3 tracking-tight">
            ONE PARTNER FOR YOUR COMPLETE TECHNICAL REQUIREMENTS.
          </h2>
          <p className="text-inksoft mt-5 leading-relaxed">
            We provide integrated electrical, ELV, security, networking, communication and IT
            solutions for residential, commercial, industrial and institutional requirements —
            installation through long-term maintenance, from one accountable team.
          </p>
          <Link href="/services" className="btn btn-ghost mt-8">Discover Our Capabilities</Link>
        </ScrollReveal>
      </section>

      {/* SERVICES SHOWCASE */}
      <section className="py-24 bg-paper" id="services">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-green-600">What We Do</span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy-900 mt-3 tracking-tight">
              COMPLETE TECHNICAL SOLUTIONS UNDER ONE ROOF
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <ServicesShowcase />
          </ScrollReveal>
          <div className="text-center mt-12">
            <Link href="/products" className="btn btn-primary">Browse Products</Link>
          </div>
        </div>
      </section>

      <SignatureDiagram />

      {/* ELECTRICAL FEATURE */}
      <section className="py-24 bg-navy-900 text-white">
        <div className="max-w-6xl mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-14 items-center">
          <ScrollReveal>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-green-200">Electrical</span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl mt-3 tracking-tight leading-tight">
              ENGINEERED FOR POWER.
              <br />BUILT FOR RELIABILITY.
            </h2>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              {['New wiring', 'LT panel installation', 'Cable laying & glanding', 'Panel maintenance', 'Motor / transformer / UPS support', 'Troubleshooting'].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-green-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="border border-white/15 bg-white/[0.03] p-6 relative">
              <div className="absolute inset-0 bg-blueprint opacity-30" />
              <div className="relative grid grid-cols-2 gap-3">
                {['LT PANEL', 'POWER DISTRIBUTION', 'CONTROL', 'CABLE MANAGEMENT'].map((label) => (
                  <div key={label} className="border border-green-500/30 px-3 py-6 text-center">
                    <span className="text-[11px] font-bold tracking-widest uppercase text-green-200">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECURITY + ELV */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-green-600">Security &amp; ELV</span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy-900 mt-3 tracking-tight">
              SECURITY THAT WATCHES. SYSTEMS THAT RESPOND.
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'CCTV', desc: 'Dome, bullet, PTZ & solar cameras' },
              { name: 'Biometric', desc: 'Fingerprint attendance & access' },
              { name: 'Fire Systems', desc: 'Panels, detectors & alarms' },
              { name: 'Intercom', desc: 'EPABX & video door phones' },
              { name: 'PA Systems', desc: 'Public address installation' },
            ].map((s, i) => (
              <ScrollReveal key={s.name} delay={i * 80}>
                <Link href="/services" className="group block border border-slate-200 p-5 h-full transition hover:border-green-500 hover:shadow-lg">
                  <div className="tech-line w-8 mb-4 group-hover:w-12 transition-all" />
                  <h3 className="font-display font-extrabold text-navy-900">{s.name}</h3>
                  <p className="text-xs text-inksoft mt-1.5 leading-relaxed">{s.desc}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* NETWORKING + IT */}
      <section className="py-24 bg-paper">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-green-600">Networking &amp; IT</span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy-900 mt-3 tracking-tight">
              KEEPING YOUR BUSINESS CONNECTED.
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: 'Networking', desc: 'Installation, structured cabling and maintenance.' },
              { title: 'Laptop & Desktop', desc: 'Sales, service and troubleshooting.' },
              { title: 'IT Infrastructure', desc: 'Complete IT requirements and technical support.' },
              { title: 'Multi-Brand', desc: 'Sales and service across multiple brands.' },
            ].map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 80} className="card text-left">
                <h3 className="font-display font-extrabold text-navy-900 mb-1.5">{s.title}</h3>
                <p className="text-[13px] text-inksoft leading-relaxed">{s.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SALES + SERVICE */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy-900 tracking-tight">
              PRODUCTS. INSTALLATION. SERVICE. SUPPORT.
            </h2>
            <p className="text-inksoft mt-4">Get product supply and technical service from one provider.</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {SALES_STAGES.map((s, i) => (
              <ScrollReveal key={s.n} delay={i * 80} className="text-center">
                <div className="font-display font-extrabold text-4xl text-green-500/30">{s.n}</div>
                <h3 className="font-display font-extrabold text-navy-900 mt-1">{s.title}</h3>
                <p className="text-xs text-inksoft mt-1.5">{s.desc}</p>
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center">
            <span className="font-display font-extrabold text-xl text-green-500">All Brands Sales &amp; Services</span>
          </div>
        </div>
      </section>

      {/* AMC */}
      <section className="py-24 bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint opacity-30" />
        <div className="relative max-w-3xl mx-auto px-6 md:px-8 text-center">
          <ScrollReveal>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight">
              DON&apos;T WAIT FOR A BREAKDOWN. PREVENT IT.
            </h2>
            <p className="text-slate-300 mt-5 leading-relaxed">
              Keep your electrical, security, networking and IT systems reliable with planned
              preventive maintenance and Annual Maintenance Contracts.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-8 mb-10">
              {['Inspect', 'Maintain', 'Monitor', 'Support', 'Repeat'].map((s, i, arr) => (
                <span key={s} className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-green-200">
                  {s}
                  {i < arr.length - 1 && <span className="text-green-500">&rarr;</span>}
                </span>
              ))}
            </div>
            <Link href="/amc" className="btn btn-primary">Enquire About AMC</Link>
          </ScrollReveal>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-green-600">Why Choose Us</span>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {WHY_US.map((w, i) => (
              <ScrollReveal key={w.title} delay={i * 60}>
                <div className="w-8 h-8 border-2 border-green-500 mb-4" />
                <h3 className="font-display font-extrabold text-navy-900 mb-1.5">{w.title}</h3>
                <p className="text-sm text-inksoft leading-relaxed">{w.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="py-24 bg-paper">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-green-600">Where We Work</span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy-900 mt-3 tracking-tight">
              BUILT FOR DIFFERENT ENVIRONMENTS.
            </h2>
          </ScrollReveal>
          <div className="flex flex-wrap justify-center gap-3">
            {INDUSTRIES.map((ind) => (
              <span key={ind} className="border border-slate-300 px-4 py-2 text-sm font-semibold text-navy-800 hover:border-green-500 hover:text-green-600 transition cursor-default">
                {ind}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-green-600">How We Work</span>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {PROCESS.map((p, i) => (
              <ScrollReveal key={p.n} delay={i * 100} className="relative">
                <div className="font-display font-extrabold text-5xl text-slate-100">{p.n}</div>
                <h3 className="font-display font-extrabold text-navy-900 -mt-3">{p.title}</h3>
                <p className="text-sm text-inksoft mt-1.5 leading-relaxed">{p.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="py-20 bg-navy-900">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <ScrollReveal>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-white tracking-tight">
              MULTI-BRAND SALES &amp; SERVICE
            </h2>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-8 text-sm font-bold tracking-widest uppercase text-slate-400">
              {['Electrical', 'Security', 'Networking', 'IT Hardware', 'Communication'].map((b) => (
                <span key={b}>{b}</span>
              ))}
            </div>
            <p className="text-slate-400 text-sm mt-8 max-w-xl mx-auto">
              We support a wide range of brands across electrical, security, networking and IT
              requirements.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <ReviewsSection reviews={reviews} />

      {/* FINAL CTA */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <ScrollReveal className="bg-navy-900 px-8 py-14 md:px-16 md:py-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-blueprint opacity-20" />
            <div className="relative">
              <h2 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight max-w-2xl mx-auto">
                NEED ELECTRICAL, SECURITY OR IT SUPPORT?
              </h2>
              <p className="text-slate-300 mt-4 max-w-xl mx-auto">
                Tell us what you need. From installation and troubleshooting to sales, service and
                AMC — we can help.
              </p>
              <div className="flex gap-3 flex-wrap justify-center mt-8">
                <Link href="/contact" className="btn btn-primary">Request a Quote</Link>
                <a href="tel:+917483528453" className="btn btn-white">Call Us</a>
                <a href="https://wa.me/917483528453" className="btn btn-outline-w">WhatsApp Us</a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
