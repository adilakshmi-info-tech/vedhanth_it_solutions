const INDUSTRIES = [
  { name: 'Residential', icon: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9M9 20v-6h6v6" /></> },
  { name: 'Commercial', icon: <><path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16" /><path d="M2 21h20M8 7h2m4 0h2M8 11h2m4 0h2M8 15h2m4 0h2" /></> },
  { name: 'Industrial', icon: <><path d="M3 21V9l6 3V9l6 3V5h6v16H3Z" /><path d="M17 8h1M17 11h1M7 16h2m3 0h2m3 0h2" /></> },
  { name: 'Offices', icon: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 7h2m4 0h2M8 11h2m4 0h2M8 15h2m4 0h2M10 21v-3h4v3" /></> },
  { name: 'Retail', icon: <><path d="M4 9h16l-1 12H5L4 9Z" /><path d="m3 9 2-6h14l2 6M9 9a3 3 0 0 0 6 0M4 9a3 3 0 0 0 5 2m6 0a3 3 0 0 0 5-2" /></> },
  { name: 'Institutions', icon: <><path d="m3 9 9-6 9 6H3ZM5 10v8m4-8v8m6-8v8m4-8v8M3 21h18M2 18h20" /></> },
];

export default function Industries() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20">
        <div className="text-center mb-12">
          <span className="eyebrow">Industries We Serve</span>
          <h2 className="font-display font-bold text-[32px] md:text-[42px] text-[#1e1e1e] mt-4">
            Trusted Across Every Setting
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {INDUSTRIES.map(({ name, icon }) => (
            <div
              key={name}
              className="flex flex-col items-center gap-4 border border-slate-200 rounded-2xl py-6 text-center transition hover:border-accent-500 hover:shadow-md"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-[16px] border-[3px] border-accent-500 text-accent-500">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icon}</svg>
              </div>
              <span className="font-display font-semibold text-navy-900">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
