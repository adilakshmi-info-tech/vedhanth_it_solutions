import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/slugify';

// Plain functions now (not Next.js Server Actions) — callers are Route
// Handlers in backend/app/api/categories/*, reached over HTTP instead of
// imported directly. Page revalidation moved to whichever app actually
// renders the affected pages (admin/frontend), since this app has none.

export async function createCategory({ name, description }) {
  const trimmed = (name || '').trim();
  if (!trimmed) throw new Error('Category name is required.');

  return prisma.category.create({
    data: { name: trimmed, slug: slugify(trimmed), description: description?.trim() || null },
  });
}

export async function updateCategory(id, { name, description }) {
  const trimmed = (name || '').trim();
  if (!trimmed) throw new Error('Category name is required.');

  return prisma.category.update({
    where: { id },
    data: { name: trimmed, slug: slugify(trimmed), description: description?.trim() || null },
  });
}

export async function deleteCategory(id) {
  const productCount = await prisma.product.count({ where: { categoryId: id } });
  if (productCount > 0) {
    throw new Error(
      `This category still has ${productCount} product(s). Move or delete them first.`
    );
  }
  await prisma.category.delete({ where: { id } });
}
