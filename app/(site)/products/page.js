import { getCatalog } from '@/lib/data';
import ProductsPageClient from '@/components/ProductsPageClient';

export const metadata = {
  title: 'Products',
  description:
    'Browse CCTV cameras, networking equipment and biometric access-control products from Vedhanth IT Solutions, Bengaluru.',
};

// Server-rendered per request from the live database.
export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const categories = await getCatalog();
  return <ProductsPageClient categories={categories} />;
}
