import { getTenants } from '@/lib/data';
import { createTenant } from '@/lib/mutations/tenants';
import { requireSuperAdmin } from '@/lib/requireSuperAdmin';
import { ok, handle } from '@/lib/http';

export const dynamic = 'force-dynamic';

export const GET = handle(async (request) => {
  await requireSuperAdmin(request);
  const tenants = await getTenants();
  return ok(tenants);
});

export const POST = handle(async (request) => {
  await requireSuperAdmin(request);
  const body = await request.json();
  const tenant = await createTenant(body);
  return ok(tenant, 201);
});
