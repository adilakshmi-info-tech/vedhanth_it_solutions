import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import MobileContactBar from '@/components/MobileContactBar';

// Public marketing site chrome — deliberately scoped to this route group
// (not the root layout) so /admin/* gets a clean shell instead of the
// public nav/footer/WhatsApp float stacked on top of the admin UI.
export default function SiteLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
      <MobileContactBar />
    </>
  );
}
