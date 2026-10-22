// Rating for a product as returned by the backend. Prefers an aggregate the
// backend computes (averageRating/rating + reviewCount) and falls back to
// averaging the product's approved reviews. Returns null when unrated.
export function getProductRating(product) {
  const aggregate = Number(product?.averageRating ?? product?.rating);
  if (Number.isFinite(aggregate) && aggregate > 0) {
    return { average: Math.min(aggregate, 5), count: Number(product.reviewCount ?? product.ratingCount) || null };
  }
  const ratings = (product?.reviewWorkflows || [])
    .map((workflow) => Number(workflow?.review?.rating))
    .filter((value) => Number.isFinite(value) && value > 0);
  if (!ratings.length) return null;
  return { average: ratings.reduce((sum, value) => sum + value, 0) / ratings.length, count: ratings.length };
}
