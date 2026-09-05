import { getCounts } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const counts = await getCounts();

  return (
    <div>
      <h1 className="font-display text-2xl text-navy-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="card">
          <div className="font-display text-3xl text-navy-900">{counts.categories}</div>
          <div className="text-sm text-inksoft mt-1">Categories</div>
        </div>
        <div className="card">
          <div className="font-display text-3xl text-navy-900">{counts.products}</div>
          <div className="text-sm text-inksoft mt-1">Products</div>
        </div>
        <div className="card">
          <div className="font-display text-3xl text-navy-900">{counts.reviews}</div>
          <div className="text-sm text-inksoft mt-1">Reviews</div>
        </div>
      </div>
    </div>
  );
}
