export const metadata = {
  title: 'Services',
  description:
    'Electrical & LT panel work, CCTV, biometric & fire installation, networking, intercom/EPABX, IT sales & service, and AMC support in Bengaluru.',
};

const services = [
  {
    title: 'Electrical Wiring & LT Panels',
    desc: 'New house wiring, new LT panel installation, all types of cable laying and glanding work, maintenance of LT panels, motors, transformers & UPS, and troubleshooting for power and control connection panels.',
  },
  {
    title: 'CCTV & Security Solutions',
    desc: 'New CCTV installation and ongoing service — dome, bullet, PTZ and solar-powered cameras for homes, shops, offices and outdoor sites.',
  },
  {
    title: 'Biometric & Access Control',
    desc: 'Fingerprint and card-based attendance systems, electromagnetic door locks, and complete access-control installation for secure premises.',
  },
  {
    title: 'Fire Alarm Systems',
    desc: 'Fire alarm installation — control panels, smoke detectors, manual call points and sirens, wired to primary and backup power.',
  },
  {
    title: 'Networking & IT Infrastructure',
    desc: 'Wired and wireless network setup, structured cabling, and IT infrastructure work for offices and homes.',
  },
  {
    title: 'Intercom & EPABX Systems',
    desc: 'EPABX and intercom installation, plus video door phone setup for homes and gated premises.',
  },
  {
    title: 'Laptop & Desktop Sales and Service',
    desc: 'Sales and after-sales service for laptops and desktops — new equipment, repairs, and upgrades.',
  },
  {
    title: 'PA System Installation',
    desc: 'Public address system setup for offices, shops and event spaces.',
  },
  {
    title: 'AMC & Multi-Brand IT Support',
    desc: 'Annual Maintenance Contracts and all types of IT requirements — sales and service across all major brands, backed by ongoing support.',
  },
];

export default function ServicesPage() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-green-600">What We Do</span>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-navy-900 mt-3 tracking-tight">
            COMPLETE TECHNICAL SOLUTIONS UNDER ONE ROOF
          </h1>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="card text-left">
              <h3 className="font-display font-extrabold text-lg text-navy-900 mb-2">{s.title}</h3>
              <p className="text-inksoft text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
