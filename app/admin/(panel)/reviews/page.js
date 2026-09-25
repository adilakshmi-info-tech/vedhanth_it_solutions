import { getAllReviews } from '@/lib/data';
import ReviewManager from './ReviewManager';

export const dynamic = 'force-dynamic';

export default async function AdminReviewsPage() {
  const reviews = await getAllReviews();
  return <ReviewManager initialReviews={reviews} />;
}
