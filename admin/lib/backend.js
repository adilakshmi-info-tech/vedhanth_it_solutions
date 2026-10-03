import 'server-only';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000';

// Every admin data read/mutation goes through here instead of Prisma
// directly, now that the data lives in a separately deployed backend app.
export async function backendFetch(path, { token, ...options } = {}) {
  const response = await fetch(`${BACKEND_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
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
