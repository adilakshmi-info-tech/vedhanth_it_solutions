import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import MobileContactBar from '@/components/MobileContactBar';

export const metadata = {
  metadataBase: new URL('https://vedhanthitsolutions.in'), // update once domain is live
  title: {
    default: 'Vedhanth IT Solutions | Electrical, CCTV, Networking & IT Solutions',
    template: '%s | Vedhanth IT Solutions',
  },
  description:
    'Professional electrical, LT panel, CCTV, biometric, fire, networking, IT, maintenance and AMC solutions for residential, commercial and industrial requirements in Bengaluru.',
  openGraph: {
    title: 'Vedhanth IT Solutions',
    description:
      'Electrical, ELV, security, networking & IT solutions in Mudalapalya, Bengaluru.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans pb-14 md:pb-0">
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
        <MobileContactBar />
      </body>
    </html>
  );
}
