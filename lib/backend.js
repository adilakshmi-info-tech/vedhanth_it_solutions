import 'server-only';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000';

// This app serves exactly one tenant per deployment — hardcoded here the
// same way lib/imageUpload.js hardcodes its upload slug. The backend now
// serves more than one client's data from the same tables, so every call
// has to say which tenant it's acting for.
export const TENANT_SLUG = 'vedhanthitsolutions';

// Every public read/submission goes through here instead of Prisma
// directly, now that the data lives in a separately deployed backend app.
export async function backendFetch(path, { token, ...options } = {}) {
  const response = await fetch(`${BACKEND_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Slug': TENANT_SLUG,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    cache: 'no-store',
  });
  const body = await response.json().catch(() => null);
  if (!response.ok || !body?.result) {
    throw new Error(body?.message || 'The backend request failed.');
  }
  return body.data;
}
