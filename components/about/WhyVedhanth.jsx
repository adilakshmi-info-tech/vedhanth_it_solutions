const REASONS = [
  {
    title: 'Professional Installation',
    desc: 'Carefully planned installation and configuration by trained technicians.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    title: 'Reliable Support',
    desc: 'Responsive service and maintenance for critical infrastructure.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-1.414 1.414A9 9 0 105.636 18.364l1.414-1.414M12 8v4l3 3" />
      </svg>
    ),
  },
  {
    title: 'Integrated Solutions',
    desc: 'Security, networking and electrical systems managed under one service partner.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'AMC & Maintenance',
    desc: 'Ongoing maintenance and support designed to keep systems reliable.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function WhyVedhanth() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20">
        <div className="text-center mb-12 md:mb-16">
          <span className="eyebrow">Why Vedhanth</span>
          <h2 className="font-display font-bold text-[32px] md:text-[42px] text-[#1e1e1e] mt-4">
            Why Businesses Choose Vedhanth
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {REASONS.map((item) => (
            <div key={item.title} className="text-center sm:text-left">
              <div className="w-12 h-12 mx-auto sm:mx-0 border-2 border-accent-500 rounded-lg flex items-center justify-center text-accent-500">
                {item.icon}
              </div>
              <h3 className="font-display font-bold text-lg text-navy-900 mt-4">{item.title}</h3>
              <p className="text-sm text-inksoft mt-2 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
