import { getCounts } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const counts = await getCounts();

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card text-left">
          <div className="font-display font-extrabold text-4xl text-cyan-500">{counts.categories}</div>
          <div className="text-sm text-inksoft mt-1">Categories</div>
        </div>
        <div className="card text-left">
          <div className="font-display font-extrabold text-4xl text-cyan-500">{counts.products}</div>
          <div className="text-sm text-inksoft mt-1">Products</div>
        </div>
        <div className="card text-left">
          <div className="font-display font-extrabold text-4xl text-cyan-500">{counts.reviews}</div>
          <div className="text-sm text-inksoft mt-1">Reviews</div>
        </div>
      </div>
    </div>
  );
}
