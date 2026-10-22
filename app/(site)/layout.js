import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { SITE_URL, SITE_NAME, BUSINESS, absoluteUrl } from '@/lib/site';

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#business`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl('/logo-full.png'),
  image: absoluteUrl('/opengraph-image.png'),
  telephone: BUSINESS.phones,
  email: BUSINESS.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: BUSINESS.locality,
    addressRegion: BUSINESS.region,
    addressCountry: BUSINESS.country,
  },
  areaServed: BUSINESS.city,
  description:
    'Electrical, LT panel, CCTV, biometric, fire alarm, networking, IT and AMC solutions for homes, businesses and industries in Bengaluru.',
};

// Public marketing site chrome — deliberately scoped to this route group
// (not the root layout) so /admin/* gets a clean shell instead of the
// public nav/footer/WhatsApp float stacked on top of the admin UI.
export default function SiteLayout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
