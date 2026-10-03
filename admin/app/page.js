import { redirect } from 'next/navigation';

// This app is reached at <client-domain>/admin via the reverse proxy, with
// the /admin prefix preserved — every real route lives under app/admin/*.
// Bare "/" only happens hitting this service directly (e.g. in local dev).
export default function RootPage() {
  redirect('/admin');
}
