import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export const metadata = {
  metadataBase: new URL('https://vedhanthitsolutions.in'), // update once domain is live
  title: {
    default: 'Vedhanth IT Solutions — CCTV, Networking & IT Security Solutions, Bengaluru',
    template: '%s | Vedhanth IT Solutions',
  },
  description:
    'CCTV & security solutions, networking & IT infrastructure, and biometric & access control — installed and supported locally in Mudalapalya, Bengaluru.',
  openGraph: {
    title: 'Vedhanth IT Solutions',
    description:
      'CCTV, networking & IT security solutions in Mudalapalya, Bengaluru.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
