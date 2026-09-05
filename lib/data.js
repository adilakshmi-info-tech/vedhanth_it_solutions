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

export async function getCounts() {
  const [categories, products, reviews] = await Promise.all([
    prisma.category.count(),
    prisma.product.count(),
    prisma.review.count(),
  ]);
  return { categories, products, reviews };
}
