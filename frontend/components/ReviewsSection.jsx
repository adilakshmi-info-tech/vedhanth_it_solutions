// Presentational — approved reviews are fetched on the server (see app/page.js)
// and passed in, so this content is in the HTML before it reaches the browser.
export default function ReviewsSection({ reviews = [] }) {
  if (reviews.length === 0) {
    return (
      <section className="py-20 bg-paper">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <span className="text-xs font-bold tracking-widest uppercase text-green-600">Client Gallery</span>
          <h2 className="font-display font-extrabold text-3xl text-navy-900 mt-3 tracking-tight">Building trust, one installation at a time</h2>
          <p className="text-inksoft mt-4 leading-relaxed">
            We&apos;re a newly registered dealer serving Mudalapalya and the wider Bengaluru area — client
            reviews will appear here as we take on projects. Get in touch to be one of our first.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-paper">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-green-600">What customers say</span>
          <h2 className="font-display font-extrabold text-3xl text-navy-900 mt-3 tracking-tight">Trusted by homes &amp; businesses nearby</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r.id} className="card text-left">
              <div className="text-green-500 tracking-widest mb-3">{'★'.repeat(r.rating || 5)}</div>
              <p className="text-sm text-ink leading-relaxed mb-4">&quot;{r.comment}&quot;</p>
              <div className="text-sm font-bold text-navy-900">{r.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
