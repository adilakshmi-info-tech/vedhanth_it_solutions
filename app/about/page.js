export const metadata = {
  title: 'About Us',
  description: 'About Vedhanth IT Solutions — CCTV, networking and access-control dealer in Mudalapalya, Bengaluru.',
};

export default function AboutPage() {
  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-8">
        <span className="text-xs font-bold tracking-widest uppercase text-cyan-600">About Us</span>
        <h1 className="font-display text-4xl text-navy-900 mt-3 mb-6">Vedhanth IT Solutions</h1>
        <p className="text-inksoft leading-relaxed mb-4">
          Vedhanth IT Solutions is a proprietorship business run by Yatheesh B G, based in Mudalapalya,
          Bengaluru. We deliver CCTV, networking and access-control solutions for homes and businesses
          across Mudalapalya, RPC Layout, and the wider Bengaluru area.
        </p>
        <p className="text-inksoft leading-relaxed mb-4">
          Our focus is straightforward: give customers the right security and IT setup for their site,
          install it properly the first time, and stay reachable for support afterwards through our AMC
          plans.
        </p>
        <div className="grid sm:grid-cols-2 gap-6 mt-10">
          <div className="card text-left">
            <h3 className="font-semibold text-navy-900 mb-1.5">GST-registered business</h3>
            <p className="text-[13px] text-inksoft">GSTIN 29DPQPG1094J1ZC — transparent, compliant billing.</p>
          </div>
          <div className="card text-left">
            <h3 className="font-semibold text-navy-900 mb-1.5">One dealer, full stack</h3>
            <p className="text-[13px] text-inksoft">CCTV, networking and biometric access control under one roof.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
