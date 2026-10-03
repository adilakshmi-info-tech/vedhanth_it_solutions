import { getAllReviews } from '@/lib/data';
import ReviewManager from './ReviewManager';

export const dynamic = 'force-dynamic';

export default async function AdminReviewsPage() {
  try {
    const reviews = await getAllReviews();
    return <ReviewManager initialReviews={reviews} />;
  } catch {
    // Keep the management screen renderable during a transient database or
    // request failure; the client component displays a clear load error.
    return <ReviewManager initialReviews={[]} initialLoadError="Reviews could not be loaded. Check the connection and refresh the page." />;
  }
}
