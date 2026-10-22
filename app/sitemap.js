import { getCatalog } from '@/lib/data';
import { absoluteUrl } from '@/lib/site';

export const dynamic = 'force-dynamic';

const STATIC_ROUTES = ['', '/about', '/services', '/amc', '/products', '/reviews', '/contact'];

export default async function sitemap() {
  const entries = STATIC_ROUTES.map((route) => ({ url: absoluteUrl(route || '/') }));
  try {
    const categories = await getCatalog();
    for (const category of categories) {
      for (const product of category.products || []) {
        entries.push({
          url: absoluteUrl(`/products/${product.slug}`),
          ...(product.createdAt ? { lastModified: new Date(product.createdAt) } : {}),
        });
      }
    }
  } catch {
    // Backend unreachable — still serve the static routes.
  }
  return entries;
}
