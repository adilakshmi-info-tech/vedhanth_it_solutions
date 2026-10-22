import './globals.css';
import { SITE_URL, SITE_NAME } from '@/lib/site';

// The public Header/Footer/WhatsApp float/mobile bar live in
// app/(site)/layout.js, not here — this root layout is shared by
// /admin/* too, and admin has its own chrome (see
// app/admin/(panel)/layout.js).
export const metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: './' },
  title: {
    default: 'Vedhanth IT Solutions | Electrical, CCTV, Networking & IT Solutions',
    template: '%s | Vedhanth IT Solutions',
  },
  description:
    'Professional electrical, LT panel, CCTV, biometric, fire, networking, IT, maintenance and AMC solutions for residential, commercial and industrial requirements in Bengaluru.',
  openGraph: {
    title: SITE_NAME,
    description:
      'Electrical, ELV, security, networking & IT solutions in Mudalapalya, Bengaluru.',
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_IN',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans pb-14 md:pb-0">{children}</body>
    </html>
  );
}
