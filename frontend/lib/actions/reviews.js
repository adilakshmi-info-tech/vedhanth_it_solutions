'use server';

import { revalidatePath } from 'next/cache';
import { backendFetch } from '@/lib/backend';

function revalidateReviewViews(slug) {
  revalidatePath('/');
  revalidatePath('/reviews');
  if (slug) revalidatePath(`/products/${slug}`);
}

// Public submission (company or product review) — no auth, always lands
// as pending on backend.
export async function submitReview({ name, rating, comment, productId = null }) {
  const result = await backendFetch('/api/reviews', {
    method: 'POST',
    body: JSON.stringify({ name, rating, comment, productId }),
  });
  revalidateReviewViews(result?.productSlug);
}
