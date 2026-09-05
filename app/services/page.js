export const metadata = {
  title: 'Services',
  description: 'CCTV & security solutions, networking & IT infrastructure, biometric & access control, sales & service support in Bengaluru.',
};

const services = [
  {
    title: 'CCTV & Security Solutions',
    desc: 'Dome, bullet and PTZ camera installation, configuration, and ongoing monitoring support for homes, shops and offices.',
  },
  {
    title: 'Networking & IT Infrastructure',
    desc: 'Wired and wireless network setup, structured cabling, and IT infrastructure for offices and homes.',
  },
  {
    title: 'Biometric & Access Control',
    desc: 'Fingerprint and face-recognition attendance systems, and door access control for secure premises.',
  },
  {
    title: 'Sales & Service Support',
    desc: 'Equipment sales backed by ongoing AMC and service support, so your systems keep running.',
  },
];

export default function ServicesPage() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-cyan-600">What we do</span>
          <h1 className="font-display text-4xl text-navy-900 mt-3">Our Services</h1>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s) => (
            <div key={s.title} className="card text-left">
              <h3 className="font-display text-xl text-navy-900 mb-2">{s.title}</h3>
              <p className="text-inksoft text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
