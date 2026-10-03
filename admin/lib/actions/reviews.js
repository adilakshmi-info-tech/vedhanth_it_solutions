'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/requireAdmin';
import { backendFetch } from '@/lib/backend';

function revalidateAdminViews() {
  revalidatePath('/admin');
  revalidatePath('/admin/reviews');
}

export async function setReviewApproval(id, nextStatus) {
  const { token } = await requireAdmin();
  const result = await backendFetch(`/api/reviews/${id}/approval`, {
    method: 'PATCH',
    token,
    body: JSON.stringify({ status: nextStatus }),
  });
  revalidateAdminViews();
  return result;
}

export async function createAdminReview(input) {
  const { token } = await requireAdmin();
  const result = await backendFetch('/api/reviews/admin', {
    method: 'POST',
    token,
    body: JSON.stringify(input),
  });
  revalidateAdminViews();
  return result;
}

export async function updateAdminReview(id, input) {
  const { token } = await requireAdmin();
  const result = await backendFetch(`/api/reviews/${id}`, {
    method: 'PATCH',
    token,
    body: JSON.stringify(input),
  });
  revalidateAdminViews();
  return result;
}

export async function deleteReview(id) {
  const { token } = await requireAdmin();
  const result = await backendFetch(`/api/reviews/${id}`, { method: 'DELETE', token });
  revalidateAdminViews();
  return result;
}
