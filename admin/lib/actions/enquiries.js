'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/requireAdmin';
import { backendFetch } from '@/lib/backend';

function revalidateAdminViews() {
  revalidatePath('/admin/enquiries');
}

export async function updateEnquiryStatus(id, status) {
  const { token } = await requireAdmin();
  await backendFetch(`/api/enquiries/${id}`, {
    method: 'PATCH',
    token,
    body: JSON.stringify({ status }),
  });
  revalidateAdminViews();
}

export async function deleteEnquiry(id) {
  const { token } = await requireAdmin();
  await backendFetch(`/api/enquiries/${id}`, { method: 'DELETE', token });
  revalidateAdminViews();
}
