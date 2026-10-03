import Image from 'next/image';
import Link from 'next/link';
import DeliveryCarousel from './DeliveryCarousel';
import './services.css';

export const metadata = {
  title: 'Services',
  description:
    'Electrical & LT panel work, CCTV, biometric & fire installation, networking, intercom/EPABX, IT sales & service, and AMC support in Bengaluru.',
};

const asset = (name) => `/images/services/figma/${name}`;

const services = [
  {
    title: ['Electrical Wiring &', 'LT Panels'],
    desc: 'New house wiring, new LT panel installation, all types of cable laying and glanding work, maintenance of LT panels, motors, transformers & UPS, and troubleshooting for power and control connection panels.',
    image: 'service-electrical.png',
    alt: 'Electrical cables, wiring accessories and an LT control panel',
    width: 1106,
    height: 500,
    imageSide: 'right',
    imageStyle: { left: 611.5, top: 12, width: 477, height: 477 },
    copyStyle: { left: 24.5, top: 54 },
    descriptionStyle: { left: 24, top: 188 },
    buttonStyle: { left: 24.5, top: 368 },
  },
  {
    title: ['CCTV & Security', 'Solutions'],
    desc: 'New CCTV installation and ongoing service — dome, bullet, PTZ and solar-powered cameras for homes, shops, offices and outdoor sites.',
    image: 'service-cctv.png',
    alt: 'Dome, bullet and PTZ security cameras with accessories',
    width: 1056,
    height: 500,
    imageSide: 'left',
    imageStyle: { left: 0.5, top: 0, width: 477, height: 477 },
    copyStyle: { left: 656.5, top: 43 },
    descriptionStyle: { left: 656, top: 176 },
    buttonStyle: { left: 653, top: 306 },
  },
  {
    title: ['Biometric & Access', 'Control'],
    desc: 'Fingerprint and card-based attendance systems, electromagnetic door locks, and complete access-control installation for secure premises.',
    image: 'service-biometric.png',
    alt: 'Biometric attendance readers, access control and turnstile equipment',
    width: 1114,
    height: 500,
    imageSide: 'right',
    imageStyle: { left: 617.5, top: 0, width: 477, height: 477 },
    copyStyle: { left: 35.5, top: 46 },
    descriptionStyle: { left: 37, top: 176 },
    buttonStyle: { left: 39, top: 306 },
  },
  {
    title: ['Fire Alarm Systems'],
    desc: 'Fire alarm installation — control panels, smoke detectors, manual call points and sirens, wired to primary and backup power.',
    image: 'service-fire-alarm.png',
    alt: 'Fire alarm control panel, detectors, call points and sirens',
    width: 1114,
    height: 500,
    imageSide: 'left',
    imageStyle: { left: 9, top: -13, width: 477, height: 477 },
    copyStyle: { left: 628, top: 96 },
    descriptionStyle: { left: 631, top: 176 },
    buttonStyle: { left: 631, top: 306 },
  },
  {
    title: ['Networking & IT', 'Infrastructure'],
    desc: 'Wired and wireless network setup, structured cabling, and IT infrastructure work for offices and homes.',
    image: 'service-networking.png',
    alt: 'Networking equipment, structured cabling and IT infrastructure',
    width: 1114,
    height: 451,
    imageSide: 'right',
    imageStyle: { left: 606, top: 0, width: 477, height: 345 },
    copyStyle: { left: 29.5, top: 46 },
    descriptionStyle: { left: 31, top: 176 },
    buttonStyle: { left: 33, top: 306 },
  },
  {
    title: ['Intercom & EPABX', 'Systems'],
    desc: 'EPABX and intercom installation, plus video door phone setup for homes and gated premises.',
    image: 'service-intercom.png',
    alt: 'Intercom, EPABX, video door phone and communication equipment',
    width: 1114,
    height: 500,
    imageSide: 'left',
    imageStyle: { left: 12, top: 55, width: 477, height: 390 },
    copyStyle: { left: 654, top: 96 },
    descriptionStyle: { left: 657, top: 236 },
    buttonStyle: { left: 657, top: 336 },
  },
  {
    title: ['Laptop & Desktop', 'Sales and Service'],
    desc: 'Fingerprint and card-based attendance systems, electromagnetic door locks, and complete access-control installation for secure premises.',
    image: 'service-laptops.png',
    alt: 'Laptops, desktop computers, monitors and accessories',
    width: 1114,
    height: 500,
    imageSide: 'right',
    imageStyle: { left: 606, top: 14, width: 477, height: 352 },
    copyStyle: { left: 27.5, top: 46 },
    descriptionStyle: { left: 29, top: 176 },
    buttonStyle: { left: 31, top: 306 },
  },
  {
    title: ['PA System Installation'],
    desc: 'Public address system setup for offices, shops and event spaces.',
    image: 'service-pa.png',
    alt: 'Public address speakers, mixer and audio equipment',
    width: 1114,
    height: 500,
    imageSide: 'left',
    imageStyle: { left: 27, top: 35, width: 477, height: 382 },
    copyStyle: { left: 604, top: 96 },
    descriptionStyle: { left: 607, top: 176 },
    buttonStyle: { left: 607, top: 256 },
  },
  {
    title: ['AMC & Multi-Brand', 'IT Support'],
    desc: 'Annual Maintenance Contracts and all types of IT requirements — sales and service across all major brands, backed by ongoing support.',
    image: 'service-amc.png',
    alt: 'Multi-brand IT support equipment, computers and accessories',
    width: 1114,
    height: 500,
    imageSide: 'right',
    imageStyle: { left: 606, top: 46, width: 477, height: 345 },
    copyStyle: { left: 27.5, top: 46 },
    descriptionStyle: { left: 29, top: 176 },
    buttonStyle: { left: 31, top: 306 },
  },
];

function HeroButton() {
  return (
    <Link href="#top-services" className="services-hero-button" aria-label="Explore our services">
      <span className="services-hero-button-art" aria-hidden="true">
        <span className="services-hero-button-art-window">
          <Image src={asset('button.svg')} alt="" width={378} height={246} priority />
        </span>
      </span>
      <span className="services-hero-button-label">Explore More</span>
    </Link>
  );
}

function ServicesHero() {
  return (
    <section className="services-hero" aria-labelledby="services-hero-title">
      <div className="services-hero-inner">
        <div className="services-collage-shadow services-collage-shadow-top">
          <Image src={asset('hero-access-shadow.png')} alt="" fill sizes="176px" />
        </div>
        <div className="services-collage-image services-collage-image-top">
          <Image src={asset('hero-access.png')} alt="Technician installing an access control reader" fill sizes="223px" priority />
        </div>
        <div className="services-collage-shadow services-collage-shadow-bottom">
          <Image src={asset('hero-intercom-shadow.png')} alt="" fill sizes="177px" />
        </div>
        <div className="services-collage-image services-collage-image-bottom">
          <Image src={asset('hero-intercom.png')} alt="Intercom and access control equipment" fill sizes="223px" priority />
        </div>
        <div className="services-hero-main-image">
          <Image src={asset('hero-control-panels.png')} alt="Electrical control panels with a technician inspecting the installation" fill sizes="492px" priority />
        </div>
        <div className="services-hero-copy">
          <span className="services-eyebrow">Service</span>
          <h1 id="services-hero-title">Our Services</h1>
          <p>
            From they fine john he give of rich he. They age and draw mrs like. Improving end distrusts may instantly was household applauded incommode. Why kept very ever home mrs. Considered sympathize ten uncommonly occasional assistance sufficient not.
          </p>
          <HeroButton />
        </div>
      </div>
    </section>
  );
}

function ServiceRow({ service }) {
  return (
    <article
      className="service-row"
      data-image-side={service.imageSide}
      style={{
        '--row-width': `${service.width}px`,
        '--row-height': `${service.height}px`,
      }}
    >
      <div className="service-row-copy" style={service.copyStyle}>
        <h2>{service.title.map((line) => <span key={line}>{line}</span>)}</h2>
      </div>
      <p className="service-row-description" style={service.descriptionStyle}>{service.desc}</p>
      <Link href="/contact" className="service-row-quote" style={service.buttonStyle}>
        Enquire Now
      </Link>
      <div className="service-row-art" style={service.imageStyle}>
        <Image src={asset(service.image)} alt={service.alt} fill sizes="(min-width: 1280px) 477px, 45vw" />
      </div>
    </article>
  );
}

function DeliverySection() {
  return (
    <section className="delivery-section" aria-labelledby="delivery-title">
      <div className="delivery-intro">
        <h2 id="delivery-title">How We Deliver Reliable Solutions</h2>
        <p>From the first inspection to long-term support, every project is handled with care, precision, and accountability.</p>
      </div>
      <DeliveryCarousel />
    </section>
  );
}

function ServicesFooter() {
  return (
    <footer className="services-footer">
      <div className="services-footer-inner">
        <div className="services-footer-about">
          <Image src="/icons/logo-footer.png" alt="Vedhanth IT Solutions" width={968} height={456} unoptimized />
          <p>Vedhanth IT Solutions delivers integrated security, networking, electrical and infrastructure solutions for homes, businesses and industries.</p>
          <form className="services-footer-search" role="search">
            <Image src={asset('search.svg')} alt="" width={16} height={16} />
            <input type="search" aria-label="Search" placeholder="Search" />
          </form>
          <div className="services-footer-socials" aria-label="Social media">
            <a href="https://facebook.com" aria-label="Facebook"><Image src={asset('facebook.svg')} alt="" width={9} height={19} style={{ width: '8.57088px', height: 'auto' }} /></a>
            <a href="https://twitter.com" aria-label="Twitter"><Image src={asset('twitter.svg')} alt="" width={20} height={16} style={{ width: '19.178px', height: '15.4955px' }} /></a>
            <a href="https://instagram.com" aria-label="Instagram"><Image src={asset('instagram.svg')} alt="" width={20} height={20} style={{ width: '20px', height: '19.8906px' }} /></a>
          </div>
        </div>
        <div className="services-footer-columns">
          <div>
            <h2>Services</h2>
            <Link href="/services">CCTV Installation</Link>
            <Link href="/services">Electrical Works</Link>
            <Link href="/services">Networking</Link>
          </div>
          <div>
            <h2>Products</h2>
            <Link href="/products">CCTV Systems</Link>
            <Link href="/products">Biometric</Link>
            <Link href="/products">Fire Alarm</Link>
          </div>
          <div>
            <h2>Contact</h2>
            <a href="tel:+919901975647">+91 9901975647</a>
            <a href="tel:+919740005741">+91 9740005741</a>
            <a href="mailto:sales@vedhanthitsolutions.in">sales@vedhanthitsolutions.in</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function ServicesPage() {
  return (
    <div className="services-page">
      <ServicesHero />
      <section className="services-main-list" id="top-services" aria-labelledby="top-services-title">
        <div className="services-list-intro">
          <h2 id="top-services-title"><span>Our Top </span><strong>Services</strong></h2>
          <p>We ensure you have every functionality you need to build, run, and expand your marketplace</p>
        </div>
        <div className="services-rows">
          {services.map((service) => <ServiceRow key={service.title[0]} service={service} />)}
        </div>
      </section>
      <DeliverySection />
      <ServicesFooter />
    </div>
  );
}
