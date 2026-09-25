import { getCategories } from '@/lib/data';
import CategoryManager from './CategoryManager';

export const dynamic = 'force-dynamic';

export default async function AdminCategoriesPage() {
  const categories = await getCategories();
  return <CategoryManager initialCategories={categories} />;
}
