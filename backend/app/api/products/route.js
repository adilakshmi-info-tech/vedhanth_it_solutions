import { getProducts } from '@/lib/data';
import { createProduct } from '@/lib/mutations/products';
import { requireAdmin } from '@/lib/requireAdmin';
import { ok, handle } from '@/lib/http';

export const dynamic = 'force-dynamic';

export const GET = handle(async () => {
  const products = await getProducts();
  return ok(products);
});

export const POST = handle(async (request) => {
  await requireAdmin(request);
  const body = await request.json();
  const product = await createProduct(body);
  return ok(product, 201);
});
