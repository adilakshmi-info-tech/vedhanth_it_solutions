'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/requireAdmin';
import { backendFetch } from '@/lib/backend';

function revalidateAdminViews() {
  revalidatePath('/admin');
  revalidatePath('/admin/products');
}

export async function createProduct(payload) {
  const { token } = await requireAdmin();
  const product = await backendFetch('/api/products', {
    method: 'POST',
    token,
    body: JSON.stringify(payload),
  });
  revalidateAdminViews();
  return product;
}

export async function updateProduct(id, payload) {
  const { token } = await requireAdmin();
  const product = await backendFetch(`/api/products/${id}`, {
    method: 'PATCH',
    token,
    body: JSON.stringify(payload),
  });
  revalidateAdminViews();
  return product;
}

export async function deleteProduct(id) {
  const { token } = await requireAdmin();
  const { images } = await backendFetch(`/api/products/${id}`, { method: 'DELETE', token });
  revalidateAdminViews();
  return images; // caller (client) deletes these from the image API
}
