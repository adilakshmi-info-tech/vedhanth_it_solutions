const STEPS = [
  { num: '01', title: 'Understand', desc: 'We assess your site and requirements in detail.', icon: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4M11 8v3l2 1" /></> },
  { num: '02', title: 'Plan', desc: 'We design the right system for your budget and site.', icon: <><path d="M7 3.75h7l4 4V20H7a2 2 0 0 1-2-2V5.75a2 2 0 0 1 2-2Z" /><path d="M14 4v4h4M8.5 12h7M8.5 15.5h7" /></> },
  { num: '03', title: 'Install', desc: 'Our technicians install and configure everything on site.', icon: <><path d="m14 6 4 4M5 19l4.5-1 9-9a2.12 2.12 0 0 0-3-3l-9 9L5 19Z" /><path d="m13 7 4 4" /></> },
  { num: '04', title: 'Support', desc: 'Ongoing AMC and maintenance keep systems reliable.', icon: <><path d="M20 11a8 8 0 0 0-14.9-4M4 4v4h4M4 13a8 8 0 0 0 14.9 4M20 20v-4h-4" /><path d="M12 8v4l2.5 1.5" /></> },
];

export default function OurApproach() {
  return (
    <section className="py-16 md:py-20 bg-[#f2f2f2]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20">
        <div className="text-center mb-12 md:mb-16">
          <span className="eyebrow">Our Approach</span>
          <h2 className="font-display font-bold text-[32px] md:text-[42px] text-[#1e1e1e] mt-4">
            From Planning to Reliable Operation
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {STEPS.map((step, i) => (
            <div key={step.num} className="relative text-center">
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-7 left-[calc(50%+42px)] w-[calc(100%-84px)] h-px bg-accent-500/30" />
              )}
              <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-[16px] border-[3px] border-accent-500 bg-white text-accent-500">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{step.icon}</svg>
              </div>
              <span className="mt-4 block font-display font-bold text-sm tracking-[0.16em] text-accent-500/70">{step.num}</span>
              <h3 className="font-display font-bold text-lg text-navy-900 mt-2">{step.title}</h3>
              <p className="text-sm text-inksoft mt-2 leading-relaxed max-w-[220px] mx-auto">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
