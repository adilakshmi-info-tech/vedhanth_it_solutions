// Server-side read helpers. These run on the server (server components / route
// handlers) and query Postgres directly via Prisma, so pages render with real
// content before they reach the browser or a crawler.
import 'server-only';
import { prisma } from '@/lib/prisma';

export function getCategories() {
  return prisma.category.findMany({ orderBy: { name: 'asc' } });
}

export function getProducts() {
  return prisma.product.findMany({ orderBy: { name: 'asc' }, include: { specifications: { orderBy: { displayOrder: 'asc' } } } });
}

// Categories with their products attached, ordered for the public Products page.
export function getCatalog() {
  return prisma.category.findMany({
    orderBy: { name: 'asc' },
    include: { products: { orderBy: { name: 'asc' } } },
  });
}

export function getProductBySlug(slug) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      specifications: { orderBy: { displayOrder: 'asc' } },
      reviewWorkflows: {
        where: { reviewType: 'product', status: 'approved' },
        include: { review: true },
      },
    },
  });
}

// Product detail review rails show approved reviews from the product's own
// category so related products share relevant feedback without mixing
// unrelated product categories or company reviews.
export function getCategoryProductReviews(categoryId) {
  return prisma.review.findMany({
    where: {
      approved: true,
      workflow: {
        is: {
          reviewType: 'product',
          status: 'approved',
          product: { is: { categoryId } },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

// Keep product-detail recommendations data-backed and within the current
// product's category. Products without images remain eligible; the page has
// an explicit unavailable-image fallback for those records.
export function getRelatedProducts(product, take = 8) {
  return prisma.product.findMany({
    where: { categoryId: product.categoryId, slug: { not: product.slug } },
    orderBy: { name: 'asc' },
    take,
    include: {
      category: true,
      reviewWorkflows: {
        where: { reviewType: 'product', status: 'approved' },
        include: { review: true },
      },
    },
  });
}

export function getApprovedReviews(take = 3) {
  return prisma.review.findMany({
    where: { approved: true, workflow: { is: { reviewType: 'company', status: 'approved' } } },
    orderBy: { createdAt: 'desc' },
    take,
  });
}

export function getApprovedProductReviews(productId) {
  return prisma.review.findMany({
    where: { approved: true, workflow: { is: { reviewType: 'product', productId, status: 'approved' } } },
    orderBy: { createdAt: 'desc' },
  });
}

export function getAllReviews() {
  return prisma.review.findMany({
    orderBy: { createdAt: 'desc' },
    include: { workflow: { include: { product: { select: { id: true, name: true, slug: true } } } } },
  });
}

export function getEnquiries() {
  return prisma.enquiry.findMany({ orderBy: { createdAt: 'desc' } });
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

export async function getAdminDashboardData() {
  const [categories, products, reviews, publishedReviews, recentReviews] = await Promise.all([
    prisma.category.count(),
    prisma.product.count(),
    prisma.review.count(),
    prisma.review.count({ where: { approved: true } }),
    prisma.review.findMany({ orderBy: { createdAt: 'desc' }, take: 6 }),
  ]);
  return { categories, products, reviews, publishedReviews, recentReviews };
}
