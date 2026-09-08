import ScrollReveal from '@/components/ScrollReveal';

const NODES = ['POWER', 'LT PANELS', 'SECURITY', 'NETWORK', 'COMMUNICATION', 'IT'];

export default function SignatureDiagram() {
  return (
    <section className="py-24 bg-navy-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-blueprint opacity-40" />
      <div className="relative max-w-6xl mx-auto px-6 md:px-8 text-center">
        <ScrollReveal as="div">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-200">One Connected System</span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mt-3 tracking-tight">
            FROM POWER TO IT — WE CONNECT THE ENTIRE SYSTEM.
          </h2>
        </ScrollReveal>

        <ScrollReveal as="div" delay={150} className="mt-16">
          <div className="inline-flex flex-col items-center gap-1 mb-10">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-cyan-500">Central</span>
            <span className="font-display font-extrabold text-lg text-white border border-cyan-500/50 px-6 py-2">
              YOUR INFRASTRUCTURE
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center gap-0">
            {NODES.map((node, i) => (
              <div key={node} className="flex flex-col md:flex-row items-center">
                <div className="border border-white/15 bg-white/[0.03] px-5 py-3 text-xs font-bold tracking-widest uppercase text-slate-200 whitespace-nowrap">
                  {node}
                </div>
                {i < NODES.length - 1 && (
                  <div className="w-[2px] h-6 md:h-[2px] md:w-10 tech-line" />
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
