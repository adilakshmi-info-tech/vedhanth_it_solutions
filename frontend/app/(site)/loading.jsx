export default function SiteLoading() {
  return (
    <div className="site-loading mx-auto w-full max-w-[1280px] px-5 py-10 md:px-8 md:py-16" role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">Loading page</span>
      <div className="animate-pulse space-y-6" aria-hidden="true">
        <div className="h-8 w-2/5 max-w-[360px] rounded-lg bg-[#e9edf3]" />
        <div className="h-4 w-3/4 max-w-[620px] rounded bg-[#f0f2f6]" />
        <div className="grid gap-4 pt-6 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((item) => <div key={item} className="min-h-[220px] rounded-2xl border border-[#e7ebf1] bg-white p-5 shadow-sm">
            <div className="aspect-[16/9] rounded-xl bg-[#f0f2f6]" />
            <div className="mt-5 h-4 w-3/4 rounded bg-[#e9edf3]" />
            <div className="mt-3 h-3 w-full rounded bg-[#f0f2f6]" />
            <div className="mt-2 h-3 w-2/3 rounded bg-[#f0f2f6]" />
          </div>)}
        </div>
      </div>
    </div>
  );
}
