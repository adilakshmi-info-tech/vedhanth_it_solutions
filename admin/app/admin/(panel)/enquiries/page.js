import { getEnquiries, getTenantConfig } from '@/lib/data';
import EnquiryManager from './EnquiryManager';
import ModuleNotConfigured from '../ModuleNotConfigured';

export const dynamic = 'force-dynamic';

export default async function AdminEnquiriesPage() {
  const tenant = await getTenantConfig();
  if (tenant?.features?.enquiries === false) {
    return (
      <ModuleNotConfigured
        title="Enquiries"
        kicker="FEATURE DISABLED"
        detail="Enquiries are turned off for this site in the platform admin's tenant settings."
      />
    );
  }

  return <EnquiryManager initialEnquiries={await getEnquiries()} />;
}
