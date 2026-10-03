'use server';

import { backendFetch } from '@/lib/backend';

// Public contact-form submission — no auth.
export async function submitEnquiry(input) {
  await backendFetch('/api/enquiries', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}
