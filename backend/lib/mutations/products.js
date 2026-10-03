import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/slugify';
import { parseProductContent } from '@/lib/product-content';

// Image bytes never reach this app — the admin's browser uploads directly
// to the shared image API using its own Firebase session, and callers hand
// these functions the resulting URL as a plain string. Cleanup of
// replaced/removed images also happens client-side for the same reason.

function normalizeSpecifications(specifications) {
  return (Array.isArray(specifications) ? specifications : [])
    .map(({ label = '', value = '' }) => ({ label: String(label).trim(), value: String(value).trim() }))
    .filter(({ label, value }) => label || value)
    .map(({ label, value }) => {
      if (!label || !value) throw new Error('Complete both the specification label and value, or clear both fields.');
      return { label, value };
    });
}

export async function createProduct({ name, description, categoryId, imageUrl, images, specifications }) {
  const trimmedName = (name || '').trim();
  if (!trimmedName) throw new Error('Product name is required.');
  if (!categoryId) throw new Error('Please choose a category.');

  const slug = slugify(trimmedName);
  const existingContent = parseProductContent(description || '');
  const rows = normalizeSpecifications(specifications === undefined ? existingContent.specifications : specifications);
  return prisma.product.create({
    data: {
      name: trimmedName,
      slug,
      description: existingContent.description.trim() || null,
      categoryId,
      images: Array.isArray(images) ? images : imageUrl ? [imageUrl] : [],
      specifications: { create: rows.map((row, displayOrder) => ({ ...row, displayOrder })) },
    },
  });
}

export async function updateProduct(id, { name, description, categoryId, imageUrl, images, specifications }) {
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

  return prisma.product.findUnique({ where: { id }, include: { specifications: { orderBy: { displayOrder: 'asc' } } } });
}

export async function deleteProduct(id) {
  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) return null;

  await prisma.product.delete({ where: { id } });
  return existing.images; // caller (client) deletes these from the image API
}
