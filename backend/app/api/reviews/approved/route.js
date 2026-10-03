import { getApprovedReviews, getAllApprovedReviews } from '@/lib/data';
import { ok, handle } from '@/lib/http';

export const dynamic = 'force-dynamic';

// ?type=company (default) → homepage's company-only reviews, limited by
// ?take. ?type=all → every approved review regardless of type, for the
// public /reviews page's combined feed.
export const GET = handle(async (request) => {
  const params = new URL(request.url).searchParams;
  const take = Number(params.get('take')) || (params.get('type') === 'all' ? undefined : 3);
  const reviews = params.get('type') === 'all' ? await getAllApprovedReviews(take) : await getApprovedReviews(take);
  return ok(reviews);
});
