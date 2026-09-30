const ITEMS = [
  {
    title: 'Professional Installation',
    desc: 'Carefully planned and professionally executed installations across security, networking and electrical systems.',
  },
  {
    title: 'Reliable AMC Support',
    desc: 'Ongoing maintenance and service contracts to keep your systems running reliably.',
  },
  {
    title: 'End-to-End Solutions',
    desc: 'From installation to maintenance, we manage your complete infrastructure requirements.',
  },
];

export default function ReliableSolutions() {
  return (
    <section className="bg-[#f2f2f2] pt-16 pb-14 md:pt-[100px] md:pb-[80px]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20">
        <div className="grid md:grid-cols-4 gap-x-10 gap-y-10">
          <h2 className="font-display font-bold text-[32px] md:text-[42px] leading-tight text-[#1e1e1e]">
            Reliable
            <br />
            Solutions
          </h2>
          {ITEMS.map((item) => (
            <div key={item.title}>
              <h3 className="font-display font-bold text-xl text-[#1e1e1e]">{item.title}</h3>
              <p className="text-[16px] text-[#1e1e1e]/70 leading-[1.85] mt-3 max-w-[284px]">{item.desc}</p>
              <a href="/services" className="link-accent mt-4">
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
