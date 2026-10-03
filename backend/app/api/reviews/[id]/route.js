import { updateAdminReview, deleteReview } from '@/lib/mutations/reviews';
import { requireAdmin } from '@/lib/requireAdmin';
import { ok, handle } from '@/lib/http';

export const dynamic = 'force-dynamic';

// Full edit of an admin-authored or public review (name/comment/rating/date/status).
export const PATCH = handle(async (request, { params }) => {
  await requireAdmin(request);
  const body = await request.json();
  const result = await updateAdminReview(params.id, body);
  return ok(result);
});

export const DELETE = handle(async (request, { params }) => {
  await requireAdmin(request);
  const result = await deleteReview(params.id);
  return ok(result);
});
