import HeroNew from '@/components/home/HeroNew';
import ReliableSolutions from '@/components/home/ReliableSolutions';
import ProductsSection from '@/components/home/ProductsSection';
import AboutSection from '@/components/home/AboutSection';
import ServicesSection from '@/components/home/ServicesSection';
import ClientReviews from '@/components/home/ClientReviews';
import ContactSection from '@/components/home/ContactSection';
import { getApprovedReviews, getCatalog } from '@/lib/data';

// Rendered per request on the server so it always reflects the live database
// (no build-time DB dependency, no stale cache after an admin edit).
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // Gracefully handle DB unavailability — the page renders with empty data
  // and components show placeholder content instead.
  let reviews = [];
  let catalog = [];

  try {
    [reviews, catalog] = await Promise.all([
      getApprovedReviews(3),
      getCatalog(),
    ]);
  } catch {
    // DB is unreachable — render the page with placeholder content
  }

  return (
    <>
      <HeroNew />
      <ReliableSolutions />
      <ProductsSection categories={catalog} />
      <AboutSection />
      <ServicesSection />
      <ClientReviews reviews={reviews} />
      <ContactSection />
    </>
  );
}
