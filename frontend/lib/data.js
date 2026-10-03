// Server-side read helpers — same function names/signatures the public
// pages already import, but backed by the shared backend's public API
// instead of a direct Prisma query, since the database lives in that app
// now. Every call here hits a public (no-auth) backend endpoint — this
// app never holds an admin token.
import 'server-only';
import { backendFetch } from '@/lib/backend';

export function getCatalog() {
  return backendFetch('/api/catalog');
}

export function getApprovedReviews(take = 3) {
  return backendFetch(`/api/reviews/approved?take=${take}`);
}

// Every approved review regardless of type — used by the public /reviews
// page instead of the admin-only getAllReviews()/`/api/reviews`, since this
// app has no admin token to call that with. Filtering happens at backend,
// not after the fact here.
export function getAllApprovedReviews() {
  return backendFetch('/api/reviews/approved?type=all');
}

// One call for everything the product-detail page needs (product +
// related products + that category's approved reviews), matching
// backend/app/api/products/by-slug/[slug]/route.js's bundled response.
export function getProductDetail(slug) {
  return backendFetch(`/api/products/by-slug/${slug}`);
}

export function getHeroSlides(limit = 5) {
  return backendFetch(`/api/hero-slides?limit=${limit}`);
}
