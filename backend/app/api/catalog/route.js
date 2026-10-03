import { getCatalog } from '@/lib/data';
import { ok, handle } from '@/lib/http';

export const dynamic = 'force-dynamic';

// Categories with their products attached, for the public /products page.
export const GET = handle(async () => {
  const catalog = await getCatalog();
  return ok(catalog);
});
