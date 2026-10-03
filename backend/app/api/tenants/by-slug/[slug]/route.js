import { getTenantBySlug } from '@/lib/data';
import { ok, fail, handle } from '@/lib/http';

export const dynamic = 'force-dynamic';

export const GET = handle(async (request, { params }) => {
  const tenant = await getTenantBySlug(params.slug);
  if (!tenant) return fail('Tenant not found.', 404);
  return ok(tenant);
});
