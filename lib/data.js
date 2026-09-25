// Server-side read helpers. These run on the server (server components / route
// handlers) and query Postgres directly via Prisma, so pages render with real
// content before they reach the browser or a crawler.
import 'server-only';
import { prisma } from '@/lib/prisma';

export function getCategories() {
  return prisma.category.findMany({ orderBy: { name: 'asc' } });
}

export function getProducts() {
  return prisma.product.findMany({ orderBy: { name: 'asc' } });
}

// Categories with their products attached, ordered for the public Products page.
export function getCatalog() {
  return prisma.category.findMany({
    orderBy: { name: 'asc' },
    include: { products: { orderBy: { name: 'asc' } } },
  });
}

export function getProductBySlug(slug) {
  return prisma.product.findUnique({ where: { slug } });
}

export function getApprovedReviews(take = 3) {
  return prisma.review.findMany({
    where: { approved: true },
    orderBy: { createdAt: 'desc' },
    take,
  });
}

export function getAllReviews() {
  return prisma.review.findMany({ orderBy: { createdAt: 'desc' } });
}

// One representative, photographed product per category, for the homepage
// hero slideshow (up to 5 slides). Categories with no photographed product
// yet are simply skipped — the Hero component falls back to a technical/
// blueprint-style slide for any category it can't get a real photo for,
// rather than showing a broken or empty image.
export async function getHeroSlides(limit = 5) {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
    take: limit,
    include: {
      products: {
        where: { images: { isEmpty: false } },
        orderBy: { name: 'asc' },
        take: 1,
      },
    },
  });

  return categories
    .filter((c) => c.products.length > 0)
    .map((c) => ({
      categoryName: c.name,
      categorySlug: c.slug,
      productName: c.products[0].name,
      image: c.products[0].images[0],
    }));
}

export async function getCounts() {
  const [categories, products, reviews] = await Promise.all([
    prisma.category.count(),
    prisma.product.count(),
    prisma.review.count(),
  ]);
  return { categories, products, reviews };
}
