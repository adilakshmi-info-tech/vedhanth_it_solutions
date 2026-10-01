'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/slugify';
import { requireAdmin } from '@/lib/actions/require-admin';
import { parseProductContent } from '@/lib/product-content';

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

export async function createProduct({ name, description, categoryId, imageUrl, images, specifications }) {
  await requireAdmin();
  const trimmedName = (name || '').trim();
  if (!trimmedName) throw new Error('Product name is required.');
  if (!categoryId) throw new Error('Please choose a category.');

  const slug = slugify(trimmedName);
  const existingContent = parseProductContent(description || '');
  const rows = normalizeSpecifications(specifications === undefined ? existingContent.specifications : specifications);
  await prisma.product.create({
    data: {
      name: trimmedName,
      slug,
      description: existingContent.description.trim() || null,
      categoryId,
      images: Array.isArray(images) ? images : imageUrl ? [imageUrl] : [],
      specifications: { create: rows.map((row, displayOrder) => ({ ...row, displayOrder })) },
    },
  });
  revalidateProductViews(slug);
}

export async function updateProduct(id, { name, description, categoryId, imageUrl, images, specifications }) {
  await requireAdmin();
  const trimmedName = (name || '').trim();
  if (!trimmedName) throw new Error('Product name is required.');
  if (!categoryId) throw new Error('Please choose a category.');

  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) throw new Error('Product not found.');

  const slug = slugify(trimmedName);
  const nextImages = Array.isArray(images) ? images : imageUrl ? [imageUrl] : existing.images;
  const existingContent = parseProductContent(description || '');
  const rows = normalizeSpecifications(specifications === undefined ? existingContent.specifications : specifications);

  await prisma.$transaction(async (tx) => {
    await tx.product.update({
      where: { id },
      data: { name: trimmedName, slug, description: existingContent.description.trim() || null, categoryId, images: nextImages },
    });
    await tx.productSpecification.deleteMany({ where: { productId: id } });
    if (rows.length) {
      await tx.productSpecification.createMany({
        data: rows.map((row, displayOrder) => ({ ...row, productId: id, displayOrder })),
      });
    }
  });

  revalidateProductViews(slug);
  if (existing.slug !== slug) revalidateProductViews(existing.slug);
}

function normalizeSpecifications(specifications) {
  return (Array.isArray(specifications) ? specifications : [])
    .map(({ label = '', value = '' }) => ({ label: String(label).trim(), value: String(value).trim() }))
    .filter(({ label, value }) => label || value)
    .map(({ label, value }) => {
      if (!label || !value) throw new Error('Complete both the specification label and value, or clear both fields.');
      return { label, value };
    });
}

export async function deleteProduct(id) {
  await requireAdmin();
  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) return null;

  await prisma.product.delete({ where: { id } });
  revalidateProductViews(existing.slug);
  return existing.images; // caller (client) deletes these from the image API
}
