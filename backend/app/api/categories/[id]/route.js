import { updateCategory, deleteCategory } from '@/lib/mutations/categories';
import { requireAdmin } from '@/lib/requireAdmin';
import { ok, handle } from '@/lib/http';

export const dynamic = 'force-dynamic';

export const PATCH = handle(async (request, { params }) => {
  await requireAdmin(request);
  const body = await request.json();
  const category = await updateCategory(params.id, body);
  return ok(category);
});

export const DELETE = handle(async (request, { params }) => {
  await requireAdmin(request);
  await deleteCategory(params.id);
  return ok(null);
});
