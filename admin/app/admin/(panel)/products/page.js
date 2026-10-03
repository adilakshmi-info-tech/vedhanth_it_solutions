import { getCategories, getProducts } from '@/lib/data';
import ProductManager from './ProductManager';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  return <ProductManager initialCategories={categories} initialProducts={products} />;
}
