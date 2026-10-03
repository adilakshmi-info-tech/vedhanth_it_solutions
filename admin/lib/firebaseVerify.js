// Server-side Firebase ID token verification via the REST API (no Admin
// SDK / service-account key — see conversation notes on why: this project
// shares the sjs-technology Firebase project with other apps, and a
// service-account key would grant broad access across that whole project,
// not just Vedhanth's slice of it. This uses only the public web API key.
//
// Works in both middleware (Edge runtime) and Server Actions (Node
// runtime) — nothing here is Node-specific, just fetch.
import 'server-only';

function parseAllowlist(value, fallback) {
  return (value || fallback)
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

const ADMIN_ALLOWED_EMAILS = parseAllowlist(process.env.ADMIN_ALLOWED_EMAILS, 'admin@vedhanthitsolutions.com');
const SUPER_ADMIN_ALLOWED_EMAILS = parseAllowlist(process.env.SUPER_ADMIN_ALLOWED_EMAILS, '');

// Verifies the token itself against Firebase, with no allowlist check.
// Returns the verified email, or null if the token is missing/invalid.
// Never throws — callers decide what "null" means for them.
async function verifyFirebaseToken(idToken) {
  if (!idToken) return null;

  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
        cache: 'no-store',
      }
    );
    if (!res.ok) return null;

    const data = await res.json();
    return data?.users?.[0]?.email?.toLowerCase() || null;
  } catch {
    return null;
  }
}

// Returns the verified admin's email if the token is valid AND allowlisted
// for the regular (tenant-scoped) admin, otherwise null.
export async function verifyAdminToken(idToken) {
  const email = await verifyFirebaseToken(idToken);
  if (!email || !ADMIN_ALLOWED_EMAILS.includes(email)) return null;
  return email;
}

// Same verification, checked against the separate, platform-level
// super-admin allowlist instead — being a tenant admin never implies
// being a super admin, and vice versa.
export async function verifySuperAdminToken(idToken) {
  const email = await verifyFirebaseToken(idToken);
  if (!email || !SUPER_ADMIN_ALLOWED_EMAILS.includes(email)) return null;
  return email;
}
