'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/actions/require-admin';

const reviewStatuses = new Set(['pending', 'approved', 'rejected']);

function normalizeStatus(status, fallback = 'pending') {
  const value = typeof status === 'boolean' ? (status ? 'approved' : 'pending') : String(status || fallback);
  if (!reviewStatuses.has(value)) throw new Error('Choose a valid review status.');
  return value;
}

function revalidateReviewViews(slug) {
  revalidatePath('/');
  revalidatePath('/reviews');
  revalidatePath('/admin');
  revalidatePath('/admin/reviews');
  if (slug) revalidatePath(`/products/${slug}`);
}

// Public submissions are always pending. productId is optional and only
// provided by the product-detail form; a missing id makes this a company review.
export async function submitReview({ name, rating, comment, productId = null }) {
  const cleanName = String(name || '').trim();
  const cleanComment = String(comment || '').trim();
  const cleanRating = Math.min(5, Math.max(1, parseInt(rating, 10) || 5));
  if (!cleanName || !cleanComment) throw new Error('Name and review text are required.');
  if (cleanName.length > 120 || cleanComment.length > 2000) throw new Error('That review is too long.');

  let product = null;
  if (productId) {
    product = await prisma.product.findUnique({ where: { id: productId }, select: { id: true, slug: true } });
    if (!product) throw new Error('The selected product could not be found.');
  }
  await prisma.review.create({
    data: {
      name: cleanName,
      rating: cleanRating,
      comment: cleanComment,
      approved: false,
      workflow: { create: { productId: product?.id || null, reviewType: product ? 'product' : 'company', status: 'pending' } },
    },
  });
  revalidateReviewViews(product?.slug);
}

export async function setReviewApproval(id, nextStatus) {
  await requireAdmin();
  const status = normalizeStatus(nextStatus);
  const existing = await prisma.review.findUnique({ where: { id }, include: { workflow: { include: { product: true } } } });
  if (!existing) throw new Error('Review not found.');
  const workflow = existing.workflow;
  const productId = workflow?.productId || null;
  await prisma.$transaction(async (tx) => {
    await tx.review.update({ where: { id }, data: { approved: status === 'approved' } });
    await tx.reviewWorkflow.upsert({
      where: { reviewId: id },
      create: { reviewId: id, reviewType: workflow?.reviewType || 'company', productId, status, approvedAt: status === 'approved' ? new Date() : null },
      update: { status, approvedAt: status === 'approved' ? (workflow?.approvedAt || new Date()) : null },
    });
  });
  revalidateReviewViews(workflow?.product?.slug);
}

function validateAdminReview(input) {
  const name = String(input?.name || '').trim();
  const comment = String(input?.comment || '').trim();
  const rating = Number(input?.rating);
  const dateValue = String(input?.date || '').trim();
  const reviewType = input?.reviewType === 'product' ? 'product' : 'company';
  const status = normalizeStatus(input?.status, input?.approved ? 'approved' : 'pending');
  const productId = reviewType === 'product' ? String(input?.productId || '') : null;
  if (!name) throw new Error('Client name is required.');
  if (name.length > 120) throw new Error('Client name must be 120 characters or fewer.');
  if (!comment) throw new Error('Review text is required.');
  if (comment.length > 2000) throw new Error('Review text must be 2,000 characters or fewer.');
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) throw new Error('Choose a rating from 1 to 5.');
  if (reviewType === 'product' && !productId) throw new Error('Choose the product for this review.');
  const createdAt = dateValue ? new Date(`${dateValue}T12:00:00.000Z`) : new Date();
  if (Number.isNaN(createdAt.getTime()) || (dateValue && createdAt.toISOString().slice(0, 10) !== dateValue)) throw new Error('Choose a valid review date.');
  return { name, comment, rating, status, reviewType, productId, approved: status === 'approved', createdAt };
}

export async function createAdminReview(input) {
  await requireAdmin();
  const data = validateAdminReview(input);
  const product = data.productId ? await prisma.product.findUnique({ where: { id: data.productId }, select: { slug: true } }) : null;
  if (data.productId && !product) throw new Error('The selected product could not be found.');
  await prisma.review.create({
    data: {
      name: data.name,
      comment: data.comment,
      rating: data.rating,
      approved: data.approved,
      createdAt: data.createdAt,
      workflow: { create: { reviewType: data.reviewType, productId: data.productId, status: data.status, approvedAt: data.status === 'approved' ? new Date() : null } },
    },
  });
  revalidateReviewViews(product?.slug);
}

export async function updateAdminReview(id, input) {
  await requireAdmin();
  if (!id) throw new Error('Review not found.');
  const data = validateAdminReview(input);
  const [product, existing] = await Promise.all([
    data.productId ? prisma.product.findUnique({ where: { id: data.productId }, select: { slug: true } }) : null,
    prisma.review.findUnique({ where: { id }, include: { workflow: { include: { product: true } } } }),
  ]);
  if (!existing) throw new Error('Review not found.');
  if (data.productId && !product) throw new Error('The selected product could not be found.');
  await prisma.$transaction(async (tx) => {
    await tx.review.update({
      where: { id },
      data: { name: data.name, comment: data.comment, rating: data.rating, approved: data.approved, createdAt: data.createdAt },
    });
    await tx.reviewWorkflow.upsert({
      where: { reviewId: id },
      create: { reviewId: id, reviewType: data.reviewType, productId: data.productId, status: data.status, approvedAt: data.status === 'approved' ? new Date() : null },
      update: { reviewType: data.reviewType, productId: data.productId, status: data.status, approvedAt: data.status === 'approved' ? (existing.workflow?.approvedAt || new Date()) : null },
    });
  });
  revalidateReviewViews(existing.workflow?.product?.slug);
  if (product?.slug !== existing.workflow?.product?.slug) revalidateReviewViews(product?.slug);
}

export async function deleteReview(id) {
  await requireAdmin();
  const existing = await prisma.review.findUnique({ where: { id }, include: { workflow: { include: { product: true } } } });
  if (!existing) return;
  await prisma.review.delete({ where: { id } });
  revalidateReviewViews(existing.workflow?.product?.slug);
}
