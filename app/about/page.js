export const metadata = {
  title: 'About Us',
  description: 'About Vedhanth IT Solutions — electrical, ELV, security, networking and IT solutions in Mudalapalya, Bengaluru.',
};

export default function AboutPage() {
  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-600">About Us</span>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl text-navy-900 mt-3 mb-6 tracking-tight">
          Vedhanth IT Solutions
        </h1>
        <p className="text-inksoft leading-relaxed mb-4">
          Vedhanth IT Solutions is a proprietorship business run by Yatheesh B G, based in Mudalapalya,
          Bengaluru. We deliver electrical, ELV, security, networking and IT solutions for homes and
          businesses across Mudalapalya, RPC Layout, and the wider Bengaluru area.
        </p>
        <p className="text-inksoft leading-relaxed mb-4">
          Our focus is straightforward: give customers the right technical setup for their site,
          install it properly the first time, and stay reachable for support afterwards through our
          AMC plans.
        </p>
        <div className="grid sm:grid-cols-2 gap-6 mt-10">
          <div className="card text-left">
            <h3 className="font-display font-extrabold text-navy-900 mb-1.5">GST-registered business</h3>
            <p className="text-[13px] text-inksoft">GSTIN 29DPQPG1094J1ZC — transparent, compliant billing.</p>
          </div>
          <div className="card text-left">
            <h3 className="font-display font-extrabold text-navy-900 mb-1.5">One partner, full stack</h3>
            <p className="text-[13px] text-inksoft">Electrical, ELV, security, networking and IT under one roof.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
