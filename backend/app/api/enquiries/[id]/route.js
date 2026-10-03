import { updateEnquiryStatus, deleteEnquiry } from '@/lib/mutations/enquiries';
import { requireAdmin } from '@/lib/requireAdmin';
import { ok, handle } from '@/lib/http';

export const dynamic = 'force-dynamic';

export const PATCH = handle(async (request, { params }) => {
  await requireAdmin(request);
  const { status } = await request.json();
  await updateEnquiryStatus(params.id, status);
  return ok(null);
});

export const DELETE = handle(async (request, { params }) => {
  await requireAdmin(request);
  await deleteEnquiry(params.id);
  return ok(null);
});
