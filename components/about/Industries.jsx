const INDUSTRIES = ['Residential', 'Commercial', 'Industrial', 'Offices', 'Retail', 'Institutions'];

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
          {INDUSTRIES.map((name) => (
            <div
              key={name}
              className="border border-slate-200 rounded-lg py-6 text-center transition hover:border-accent-500 hover:shadow-md"
            >
              <span className="font-display font-semibold text-navy-900">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
