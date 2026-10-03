import { getCategories, getTenantConfig } from '@/lib/data';
import CategoryManager from './CategoryManager';
import ModuleNotConfigured from '../ModuleNotConfigured';

export const dynamic = 'force-dynamic';

export default async function AdminCategoriesPage() {
  const tenant = await getTenantConfig();
  if (tenant?.features?.categories === false) {
    return (
      <ModuleNotConfigured
        title="Categories"
        kicker="FEATURE DISABLED"
        detail="Categories are turned off for this site in the platform admin's tenant settings."
      />
    );
  }

  const categories = await getCategories();
  return <CategoryManager initialCategories={categories} />;
}
