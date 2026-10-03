import { updateProduct, deleteProduct } from '@/lib/mutations/products';
import { requireAdmin } from '@/lib/requireAdmin';
import { ok, handle } from '@/lib/http';

export const dynamic = 'force-dynamic';

export const PATCH = handle(async (request, { params }) => {
  await requireAdmin(request);
  const body = await request.json();
  const product = await updateProduct(params.id, body);
  return ok(product);
});

export const DELETE = handle(async (request, { params }) => {
  await requireAdmin(request);
  const removedImages = await deleteProduct(params.id);
  return ok({ images: removedImages || [] });
});
