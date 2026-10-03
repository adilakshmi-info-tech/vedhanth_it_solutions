'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/requireAdmin';
import { backendFetch } from '@/lib/backend';

// Only revalidates this app's own admin pages. The public frontend's
// pages aren't reachable from here now that it's a separate app — see
// its own ISR revalidate window, or a future on-demand revalidation
// webhook if instant updates there turn out to matter.
function revalidateAdminViews() {
  revalidatePath('/admin');
  revalidatePath('/admin/categories');
  revalidatePath('/admin/products');
}

export async function createCategory({ name, description }) {
  const { token } = await requireAdmin();
  const category = await backendFetch('/api/categories', {
    method: 'POST',
    token,
    body: JSON.stringify({ name, description }),
  });
  revalidateAdminViews();
  return category;
}

export async function updateCategory(id, { name, description }) {
  const { token } = await requireAdmin();
  const category = await backendFetch(`/api/categories/${id}`, {
    method: 'PATCH',
    token,
    body: JSON.stringify({ name, description }),
  });
  revalidateAdminViews();
  return category;
}

export async function deleteCategory(id) {
  const { token } = await requireAdmin();
  await backendFetch(`/api/categories/${id}`, { method: 'DELETE', token });
  revalidateAdminViews();
}
