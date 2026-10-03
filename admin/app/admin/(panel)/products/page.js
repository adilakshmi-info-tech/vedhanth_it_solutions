import { getCategories, getProducts, getTenantConfig } from '@/lib/data';
import ProductManager from './ProductManager';
import ModuleNotConfigured from '../ModuleNotConfigured';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const tenant = await getTenantConfig();
  if (tenant?.features?.products === false) {
    return (
      <ModuleNotConfigured
        title="Products"
        kicker="FEATURE DISABLED"
        detail="Products are turned off for this site in the platform admin's tenant settings."
      />
    );
  }

  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  return <ProductManager initialCategories={categories} initialProducts={products} />;
}
