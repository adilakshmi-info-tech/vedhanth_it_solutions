import { getAllReviews } from '@/lib/data';
import { submitReview } from '@/lib/mutations/reviews';
import { requireAdmin } from '@/lib/requireAdmin';
import { ok, handle } from '@/lib/http';

export const dynamic = 'force-dynamic';

// Admin review table — every review, any status.
export const GET = handle(async (request) => {
  await requireAdmin(request);
  const reviews = await getAllReviews();
  return ok(reviews);
});

// Public submission (company or product review) — always lands as pending.
export const POST = handle(async (request) => {
  const body = await request.json();
  const result = await submitReview(body);
  return ok(result, 201);
});
