// Server-side read helpers — same function names/signatures the admin
// pages already import, but backed by the shared backend's API instead
// of a direct Prisma query, since the database lives in that app now.
import 'server-only';
import { backendFetch } from '@/lib/backend';
import { requireAdmin } from '@/lib/requireAdmin';
import { requireSuperAdmin } from '@/lib/requireSuperAdmin';

export function getCategories() {
  return backendFetch('/api/categories');
}

export function getProducts() {
  return backendFetch('/api/products');
}

export async function getAllReviews() {
  const { token } = await requireAdmin();
  return backendFetch('/api/reviews', { token });
}

export async function getEnquiries() {
  const { token } = await requireAdmin();
  return backendFetch('/api/enquiries', { token });
}

export async function getAdminDashboardData() {
  const { token } = await requireAdmin();
  return backendFetch('/api/dashboard', { token });
}

export async function getTenants() {
  const { token } = await requireSuperAdmin();
  return backendFetch('/api/tenants', { token });
}

// This app serves exactly one tenant today — hardcoded here the same way
// lib/imageUpload.js hardcodes its upload slug. Fails open (null) on any
// error so a transient backend hiccup can't silently hide features that
// are actually enabled.
const TENANT_SLUG = 'vedhanthitsolutions';

export async function getTenantConfig() {
  try {
    return await backendFetch(`/api/tenants/by-slug/${TENANT_SLUG}`);
  } catch {
    return null;
  }
}
