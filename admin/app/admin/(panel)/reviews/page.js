import { getAllReviews, getTenantConfig } from '@/lib/data';
import ReviewManager from './ReviewManager';
import ModuleNotConfigured from '../ModuleNotConfigured';

export const dynamic = 'force-dynamic';

export default async function AdminReviewsPage() {
  const tenant = await getTenantConfig();
  if (tenant?.features?.reviews === false) {
    return (
      <ModuleNotConfigured
        title="Client Reviews"
        kicker="FEATURE DISABLED"
        detail="Reviews are turned off for this site in the platform admin's tenant settings."
      />
    );
  }

  try {
    const reviews = await getAllReviews();
    return <ReviewManager initialReviews={reviews} />;
  } catch {
    // Keep the management screen renderable during a transient database or
    // request failure; the client component displays a clear load error.
    return <ReviewManager initialReviews={[]} initialLoadError="Reviews could not be loaded. Check the connection and refresh the page." />;
  }
}
