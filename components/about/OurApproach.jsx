const STEPS = [
  { num: '01', title: 'Understand', desc: 'We assess your site and requirements in detail.' },
  { num: '02', title: 'Plan', desc: 'We design the right system for your budget and site.' },
  { num: '03', title: 'Install', desc: 'Our technicians install and configure everything on site.' },
  { num: '04', title: 'Support', desc: 'Ongoing AMC and maintenance keep systems reliable.' },
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
                <div className="hidden lg:block absolute top-6 left-[calc(50%+32px)] w-[calc(100%-64px)] h-px bg-accent-500/30" />
              )}
              <span className="font-display font-bold text-3xl text-accent-500/30">{step.num}</span>
              <h3 className="font-display font-bold text-lg text-navy-900 mt-2">{step.title}</h3>
              <p className="text-sm text-inksoft mt-2 leading-relaxed max-w-[220px] mx-auto">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
