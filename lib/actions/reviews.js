'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/actions/require-admin';

// Public — anyone can submit. Always lands as approved = false.
export async function submitReview({ name, rating, comment }) {
  const cleanName = (name || '').trim();
  const cleanComment = (comment || '').trim();
  const cleanRating = Math.min(5, Math.max(1, parseInt(rating, 10) || 5));

  if (!cleanName || !cleanComment) {
    throw new Error('Name and review text are required.');
  }
  if (cleanName.length > 120 || cleanComment.length > 2000) {
    throw new Error('That review is too long.');
  }

  await prisma.review.create({
    data: { name: cleanName, rating: cleanRating, comment: cleanComment, approved: false },
  });
}

// Admin only.
export async function setReviewApproval(id, approved) {
  await requireAdmin();
  await prisma.review.update({ where: { id }, data: { approved: Boolean(approved) } });
  revalidatePath('/');
  revalidatePath('/admin');
  revalidatePath('/admin/reviews');
}

export async function deleteReview(id) {
  await requireAdmin();
  await prisma.review.delete({ where: { id } });
  revalidatePath('/');
  revalidatePath('/admin');
  revalidatePath('/admin/reviews');
}
