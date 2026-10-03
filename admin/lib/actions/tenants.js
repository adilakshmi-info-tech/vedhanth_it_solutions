'use server';

import { revalidatePath } from 'next/cache';
import { requireSuperAdmin } from '@/lib/requireSuperAdmin';
import { backendFetch } from '@/lib/backend';

export async function createTenant(input) {
  const { token } = await requireSuperAdmin();
  const tenant = await backendFetch('/api/tenants', {
    method: 'POST',
    token,
    body: JSON.stringify(input),
  });
  revalidatePath('/super');
  return tenant;
}

export async function updateTenant(id, input) {
  const { token } = await requireSuperAdmin();
  const tenant = await backendFetch(`/api/tenants/${id}`, {
    method: 'PATCH',
    token,
    body: JSON.stringify(input),
  });
  revalidatePath('/super');
  return tenant;
}

export async function deleteTenant(id) {
  const { token } = await requireSuperAdmin();
  await backendFetch(`/api/tenants/${id}`, { method: 'DELETE', token });
  revalidatePath('/super');
}
