'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/slugify';
import { requireAdmin } from '@/lib/actions/require-admin';

// Image bytes never reach the server — the admin's browser uploads
// directly to the shared image API (lib/imageUpload.js) using their own
// Firebase session, and hands these actions the resulting URL as a plain
// string. Cleanup of replaced/removed images also happens client-side for
// the same reason (only the browser holds the Firebase token that API needs).

function revalidateProductViews(slug) {
  revalidatePath('/');
  revalidatePath('/products');
  revalidatePath('/admin');
  revalidatePath('/admin/products');
  if (slug) revalidatePath(`/products/${slug}`);
}

export async function createProduct({ name, description, categoryId, imageUrl }) {
  await requireAdmin();
  const trimmedName = (name || '').trim();
  if (!trimmedName) throw new Error('Product name is required.');
  if (!categoryId) throw new Error('Please choose a category.');

  const slug = slugify(trimmedName);
  await prisma.product.create({
    data: {
      name: trimmedName,
      slug,
      description: description?.trim() || null,
      categoryId,
      images: imageUrl ? [imageUrl] : [],
    },
  });
  revalidateProductViews(slug);
}

export async function updateProduct(id, { name, description, categoryId, imageUrl }) {
  await requireAdmin();
  const trimmedName = (name || '').trim();
  if (!trimmedName) throw new Error('Product name is required.');
  if (!categoryId) throw new Error('Please choose a category.');

  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) throw new Error('Product not found.');

  const slug = slugify(trimmedName);
  const images = imageUrl ? [imageUrl] : existing.images;

  await prisma.product.update({
    where: { id },
    data: { name: trimmedName, slug, description: description?.trim() || null, categoryId, images },
  });

  revalidateProductViews(slug);
  if (existing.slug !== slug) revalidateProductViews(existing.slug);
}

export async function deleteProduct(id) {
  await requireAdmin();
  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) return null;

  await prisma.product.delete({ where: { id } });
  revalidateProductViews(existing.slug);
  return existing.images; // caller (client) deletes these from the image API
}
