import { getEnquiries } from '@/lib/data';
import { submitEnquiry } from '@/lib/mutations/enquiries';
import { requireAdmin } from '@/lib/requireAdmin';
import { ok, handle } from '@/lib/http';

export const dynamic = 'force-dynamic';

export const GET = handle(async (request) => {
  await requireAdmin(request);
  const enquiries = await getEnquiries();
  return ok(enquiries);
});

// Public contact-form submission.
export const POST = handle(async (request) => {
  const body = await request.json();
  await submitEnquiry(body);
  return ok(null, 201);
});
