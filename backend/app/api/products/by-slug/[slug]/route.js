import { getProductBySlug, getRelatedProducts, getCategoryProductReviews } from '@/lib/data';
import { ok, fail, handle } from '@/lib/http';

export const dynamic = 'force-dynamic';

// Everything the public product-detail page needs in one call: the product
// itself, related products from the same category, and that category's
// approved product reviews.
export const GET = handle(async (request, { params }) => {
  const product = await getProductBySlug(params.slug);
  if (!product) return fail('Product not found.', 404);

  const [relatedProducts, categoryReviews] = await Promise.all([
    getRelatedProducts(product),
    getCategoryProductReviews(product.categoryId),
  ]);

  return ok({ product, relatedProducts, categoryReviews });
});
