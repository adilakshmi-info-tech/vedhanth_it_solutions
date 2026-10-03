import { getAdminDashboardData } from '@/lib/data';
import { requireAdmin } from '@/lib/requireAdmin';
import { ok, handle } from '@/lib/http';

export const dynamic = 'force-dynamic';

export const GET = handle(async (request) => {
  await requireAdmin(request);
  const dashboard = await getAdminDashboardData();
  return ok(dashboard);
});
