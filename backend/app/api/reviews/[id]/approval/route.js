import { setReviewApproval } from '@/lib/mutations/reviews';
import { requireAdmin } from '@/lib/requireAdmin';
import { ok, handle } from '@/lib/http';

export const dynamic = 'force-dynamic';

// Status-only change (approve/reject/reset to pending) — the common case
// from the reviews table, kept separate from the full edit form.
export const PATCH = handle(async (request, { params }) => {
  await requireAdmin(request);
  const { status } = await request.json();
  const result = await setReviewApproval(params.id, status);
  return ok(result);
});
