import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata = {
  title: 'AMC — Annual Maintenance Contracts',
  description:
    'Annual Maintenance Contracts for electrical, LT panels, CCTV, biometric, fire, networking and IT systems — preventive maintenance and priority support in Bengaluru.',
};

const COVERAGE = [
  { title: 'Electrical & LT Panels', desc: 'Panel, motor, transformer & UPS maintenance and troubleshooting.' },
  { title: 'CCTV & Security', desc: 'Camera health checks, recording verification and repairs.' },
  { title: 'Biometric & Access Control', desc: 'Device servicing, lock maintenance and configuration support.' },
  { title: 'Fire Alarm Systems', desc: 'Panel testing, detector checks and battery backup verification.' },
  { title: 'Networking & IT', desc: 'Network health checks, hardware servicing and troubleshooting.' },
  { title: 'Intercom & PA Systems', desc: 'EPABX, video door phone and PA system maintenance.' },
];

const BENEFITS = [
  { title: 'Predictable Costs', desc: 'One annual contract instead of unplanned repair bills.' },
  { title: 'Priority Response', desc: 'AMC customers get faster turnaround on breakdown calls.' },
  { title: 'Extended Equipment Life', desc: 'Regular preventive maintenance reduces wear and failure.' },
  { title: 'Reduced Downtime', desc: 'Issues get caught during scheduled checks, before they escalate.' },
];

const LOOP = ['Inspect', 'Maintain', 'Monitor', 'Support', 'Repeat'];

export default function AmcPage() {
  return (
    <>
      <section className="bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint opacity-30" />
        <div className="relative max-w-4xl mx-auto px-6 md:px-8 pt-24 pb-20 text-center">
          <span className="inline-flex items-center gap-2 border border-white/25 text-green-200 text-xs font-bold tracking-[0.2em] uppercase px-3.5 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 bg-green-500" />
            Annual Maintenance Contracts
          </span>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight leading-[1.05]">
            DON&apos;T WAIT FOR A BREAKDOWN.
            <br />
            <span className="text-green-500">PREVENT IT.</span>
          </h1>
          <p className="text-slate-300 mt-6 max-w-2xl mx-auto leading-relaxed">
            Keep your electrical, security, networking and IT systems reliable with planned
            preventive maintenance — one contract, every system, one accountable team.
          </p>
          <div className="flex gap-3 flex-wrap justify-center mt-9">
            <Link href="/contact" className="btn btn-primary">Enquire About AMC</Link>
            <a href="tel:+917483528453" className="btn btn-outline-w">Call Us</a>
          </div>
        </div>
      </section>

      {/* COVERAGE */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-green-600">What&apos;s Covered</span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy-900 mt-3 tracking-tight">
              ONE CONTRACT. EVERY SYSTEM.
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {COVERAGE.map((c, i) => (
              <ScrollReveal key={c.title} delay={i * 60} className="card text-left">
                <h3 className="font-display font-extrabold text-navy-900 mb-1.5">{c.title}</h3>
                <p className="text-[13px] text-inksoft leading-relaxed">{c.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint opacity-30" />
        <div className="relative max-w-4xl mx-auto px-6 md:px-8 text-center">
          <ScrollReveal>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-green-200">How It Works</span>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {LOOP.map((s, i) => (
                <span key={s} className="flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-white">
                  <span className="border border-green-500/50 px-4 py-2">{s}</span>
                  {i < LOOP.length - 1 && <span className="text-green-500">&rarr;</span>}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-24 bg-paper">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-green-600">Why AMC</span>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {BENEFITS.map((b, i) => (
              <ScrollReveal key={b.title} delay={i * 80}>
                <div className="w-8 h-8 border-2 border-green-500 mb-4" />
                <h3 className="font-display font-extrabold text-navy-900 mb-1.5">{b.title}</h3>
                <p className="text-sm text-inksoft leading-relaxed">{b.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <ScrollReveal className="bg-navy-900 px-8 py-14 md:px-16 md:py-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-blueprint opacity-20" />
            <div className="relative">
              <h2 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight max-w-xl mx-auto">
                READY TO PLAN AHEAD?
              </h2>
              <p className="text-slate-300 mt-4 max-w-xl mx-auto">
                Tell us what systems you&apos;d like covered and we&apos;ll put together an AMC that fits
                your site.
              </p>
              <div className="flex gap-3 flex-wrap justify-center mt-8">
                <Link href="/contact" className="btn btn-primary">Enquire About AMC</Link>
                <a href="https://wa.me/917483528453" className="btn btn-outline-w">WhatsApp Us</a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
