import Link from 'next/link';

export default function AboutCTA() {
  return (
    <section className="py-16 md:py-20 bg-[#081732]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20 text-center">
        <h2 className="font-display font-bold text-[28px] md:text-[38px] text-white max-w-2xl mx-auto leading-tight">
          Need a Reliable Security or Infrastructure Solution?
        </h2>
        <p className="text-white/70 text-lg mt-5 max-w-xl mx-auto">
          Talk to Vedhanth IT Solutions about CCTV, networking, electrical, access control, fire
          alarm and maintenance requirements.
        </p>
        <Link href="/contact" className="btn-pill-solid mt-9 inline-flex">
          Get a Quote
        </Link>
      </div>
    </section>
  );
}
