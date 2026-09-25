'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/slugify';
import { requireAdmin } from '@/lib/actions/require-admin';

function revalidateCategoryViews() {
  revalidatePath('/');
  revalidatePath('/products');
  revalidatePath('/admin');
  revalidatePath('/admin/categories');
  revalidatePath('/admin/products');
}

export async function createCategory({ name, description }) {
  await requireAdmin();
  const trimmed = (name || '').trim();
  if (!trimmed) throw new Error('Category name is required.');

  await prisma.category.create({
    data: { name: trimmed, slug: slugify(trimmed), description: description?.trim() || null },
  });
  revalidateCategoryViews();
}

export async function updateCategory(id, { name, description }) {
  await requireAdmin();
  const trimmed = (name || '').trim();
  if (!trimmed) throw new Error('Category name is required.');

  await prisma.category.update({
    where: { id },
    data: { name: trimmed, slug: slugify(trimmed), description: description?.trim() || null },
  });
  revalidateCategoryViews();
}

export async function deleteCategory(id) {
  await requireAdmin();
  const productCount = await prisma.product.count({ where: { categoryId: id } });
  if (productCount > 0) {
    throw new Error(
      `This category still has ${productCount} product(s). Move or delete them first.`
    );
  }
  await prisma.category.delete({ where: { id } });
  revalidateCategoryViews();
}
