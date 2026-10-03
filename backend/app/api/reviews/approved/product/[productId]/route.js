import { getApprovedProductReviews } from '@/lib/data';
import { ok, handle } from '@/lib/http';

export const dynamic = 'force-dynamic';

export const GET = handle(async (request, { params }) => {
  const reviews = await getApprovedProductReviews(params.productId);
  return ok(reviews);
});
