import Image from 'next/image';

export default function WhoWeAre() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20">
        <div className="grid md:grid-cols-2 gap-10 md:gap-[70px] items-center">
          <div>
            <span className="eyebrow">Who We Are</span>
            <h2 className="font-display font-bold text-[32px] md:text-[42px] text-[#1e1e1e] mt-4 leading-tight">
              Built Around Security, Infrastructure &amp; Reliability
            </h2>
            <p className="text-[#1e1e1e]/80 text-[18px] mt-6 leading-[1.85] max-w-[540px]">
              Vedhanth IT Solutions provides integrated security, networking, electrical and
              infrastructure solutions for homes, businesses and industrial environments. From the
              first site assessment to ongoing maintenance, our technicians plan and install every
              system to run reliably — with one accountable partner instead of several contractors.
            </p>
          </div>
          <div className="relative w-full max-w-[629px] md:ml-auto">
            <div className="aspect-[629/445] rounded-[20px] overflow-hidden relative shadow-lg">
              <Image
                src="/images/home/services-top-small.jpg"
                alt="Vedhanth technician installing a biometric access device"
                fill
                sizes="(min-width: 768px) 629px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
