export const metadata = {
  title: 'Contact Us',
  description: 'Contact Vedhanth IT Solutions in Mudalapalya, Bengaluru — call, WhatsApp, or visit us.',
};

import ContactSection from '@/components/home/ContactSection';

export default function ContactPage() {
  return (
    <>
      <ContactSection showHeading={false} />

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <div className="card text-left">
              <h3 className="font-display font-extrabold text-navy-900 mb-2">Call or WhatsApp</h3>
              <a href="tel:+917483528453" className="block text-inksoft text-sm mb-1">7483528453</a>
              <a href="https://wa.me/917483528453" className="text-accent-600 text-sm font-semibold">Chat on WhatsApp →</a>
            </div>
            <div className="card text-left">
              <h3 className="font-display font-extrabold text-navy-900 mb-2">Email &amp; Address</h3>
              <a href="mailto:vedhanthitsolutionsblr@gmail.com" className="block text-inksoft text-sm mb-1">
                vedhanthitsolutionsblr@gmail.com
              </a>
              <p className="text-inksoft text-sm">
                No. 25/50, 2nd Floor, First Main, Near Ayyenger Cake Palace, SGV Nagar, Mudalapalya,
                Bengaluru 560072
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 h-[360px] mb-12">
            <iframe
              title="Vedhanth IT Solutions location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              src="https://www.google.com/maps?q=Mudalapalya,+Bengaluru,+Karnataka+560072&output=embed"
            />
          </div>
        </div>
      </section>
    </>
  );
}
