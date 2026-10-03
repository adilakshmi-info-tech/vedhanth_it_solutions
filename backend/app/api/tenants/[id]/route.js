import { updateTenant, deleteTenant } from '@/lib/mutations/tenants';
import { requireSuperAdmin } from '@/lib/requireSuperAdmin';
import { ok, handle } from '@/lib/http';

export const dynamic = 'force-dynamic';

export const PATCH = handle(async (request, { params }) => {
  await requireSuperAdmin(request);
  const body = await request.json();
  const tenant = await updateTenant(params.id, body);
  return ok(tenant);
});

export const DELETE = handle(async (request, { params }) => {
  await requireSuperAdmin(request);
  await deleteTenant(params.id);
  return ok(null);
});
