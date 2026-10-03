import { getCategories } from '@/lib/data';
import { createCategory } from '@/lib/mutations/categories';
import { requireAdmin } from '@/lib/requireAdmin';
import { ok, handle } from '@/lib/http';

export const dynamic = 'force-dynamic';

export const GET = handle(async () => {
  const categories = await getCategories();
  return ok(categories);
});

export const POST = handle(async (request) => {
  await requireAdmin(request);
  const body = await request.json();
  const category = await createCategory(body);
  return ok(category, 201);
});
