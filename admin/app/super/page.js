import { getTenants } from '@/lib/data';
import TenantManager from './TenantManager';

export const dynamic = 'force-dynamic';

export default async function SuperAdminPage() {
  const tenants = await getTenants();
  return <TenantManager initialTenants={tenants} />;
}
