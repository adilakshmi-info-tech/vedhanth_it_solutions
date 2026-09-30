const CAPABILITIES = [
  {
    title: 'CCTV & Security',
    desc: 'Dome, bullet, PTZ and solar cameras — installed and serviced for homes and businesses.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Biometric & Access Control',
    desc: 'Fingerprint attendance and door access control systems, installed end to end.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
      </svg>
    ),
  },
  {
    title: 'Networking Solutions',
    desc: 'Structured cabling, network installation, EPABX and intercom systems, sales and support.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
  },
  {
    title: 'Fire Alarm Systems',
    desc: 'Fire alarm panels, detectors and alarms — wired and commissioned to protect your premises.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
      </svg>
    ),
  },
  {
    title: 'Intercom & EPABX',
    desc: 'EPABX and intercom systems for offices and larger buildings, installed and configured.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    title: 'Electrical & LT Panels',
    desc: 'New wiring, LT panel installation, cable laying, panel maintenance and troubleshooting.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

export default function Capabilities() {
  return (
    <section className="py-16 md:py-20 bg-[#f2f2f2]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20">
        <div className="text-center mb-12 md:mb-16">
          <span className="eyebrow">What We Do</span>
          <h2 className="font-display font-bold text-[32px] md:text-[42px] text-[#1e1e1e] mt-4">
            Our Capabilities
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CAPABILITIES.map((item) => (
            <div
              key={item.title}
              className="bg-white border border-slate-200 rounded-lg p-6 transition hover:border-accent-500 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="w-12 h-12 border-2 border-accent-500 rounded-lg flex items-center justify-center text-accent-500 mb-4">
                {item.icon}
              </div>
              <h3 className="font-display font-bold text-navy-900">{item.title}</h3>
              <p className="text-sm text-inksoft mt-2 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
