import { getEnquiries } from '@/lib/data';
import EnquiryManager from './EnquiryManager';

export const dynamic = 'force-dynamic';

export default async function AdminEnquiriesPage() {
  return <EnquiryManager initialEnquiries={await getEnquiries()} />;
}
