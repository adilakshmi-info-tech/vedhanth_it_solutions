// Server-side Firebase ID token verification via the REST API (no Admin
// SDK / service-account key — see conversation notes on why: this project
// shares the sjs-technology Firebase project with other apps, and a
// service-account key would grant broad access across that whole project,
// not just Vedhanth's slice of it. This uses only the public web API key.
//
// Works in both middleware (Edge runtime) and Server Actions (Node
// runtime) — nothing here is Node-specific, just fetch.
import 'server-only';

const ALLOWED_EMAILS = (process.env.ADMIN_ALLOWED_EMAILS || 'admin@vedhanthitsolutions.com')
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

// Returns the verified admin's email if the token is valid AND allowlisted,
// otherwise null. Never throws — callers decide what "null" means for them.
export async function verifyAdminToken(idToken) {
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
    const email = data?.users?.[0]?.email?.toLowerCase();
    if (!email || !ALLOWED_EMAILS.includes(email)) return null;

    return email;
  } catch {
    return null;
  }
}
