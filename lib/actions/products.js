'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/slugify';
import { requireAdmin } from '@/lib/actions/require-admin';
import { saveProductImage, deleteUpload } from '@/lib/uploads';

function revalidateProductViews(slug) {
  revalidatePath('/');
  revalidatePath('/products');
  revalidatePath('/admin');
  revalidatePath('/admin/products');
  if (slug) revalidatePath(`/products/${slug}`);
}

function readFields(formData) {
  const name = (formData.get('name') || '').toString().trim();
  const description = (formData.get('description') || '').toString().trim();
  const categoryId = (formData.get('categoryId') || '').toString();
  const image = formData.get('image');
  return { name, description, categoryId, image };
}

export async function createProduct(formData) {
  await requireAdmin();
  const { name, description, categoryId, image } = readFields(formData);
  if (!name) throw new Error('Product name is required.');
  if (!categoryId) throw new Error('Please choose a category.');

  const imagePath = await saveProductImage(image);
  const slug = slugify(name);

  await prisma.product.create({
    data: {
      name,
      slug,
      description: description || null,
      categoryId,
      images: imagePath ? [imagePath] : [],
    },
  });
  revalidateProductViews(slug);
}

export async function updateProduct(id, formData) {
  await requireAdmin();
  const { name, description, categoryId, image } = readFields(formData);
  if (!name) throw new Error('Product name is required.');
  if (!categoryId) throw new Error('Please choose a category.');

  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) throw new Error('Product not found.');

  const newImagePath = await saveProductImage(image);
  const images = newImagePath ? [newImagePath] : existing.images;
  const slug = slugify(name);

  await prisma.product.update({
    where: { id },
    data: { name, slug, description: description || null, categoryId, images },
  });

  if (newImagePath) {
    await Promise.all(existing.images.map(deleteUpload));
  }
  revalidateProductViews(slug);
  if (existing.slug !== slug) revalidateProductViews(existing.slug);
}

export async function deleteProduct(id) {
  await requireAdmin();
  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) return;

  await prisma.product.delete({ where: { id } });
  await Promise.all(existing.images.map(deleteUpload));
  revalidateProductViews(existing.slug);
}
