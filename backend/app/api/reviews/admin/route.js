import { createAdminReview } from '@/lib/mutations/reviews';
import { requireAdmin } from '@/lib/requireAdmin';
import { ok, handle } from '@/lib/http';

export const dynamic = 'force-dynamic';

// Admin-authored review (e.g. a testimonial collected offline), distinct
// from a public submission — always has an explicit status, not forced pending.
export const POST = handle(async (request) => {
  await requireAdmin(request);
  const body = await request.json();
  const result = await createAdminReview(body);
  return ok(result, 201);
});
