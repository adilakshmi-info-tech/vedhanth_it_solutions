import FirebaseSessionSync from '@/components/admin/FirebaseSessionSync';

// Thin wrapper. The real, session-gated chrome lives in app/admin/(panel)/layout.js
// so that /admin/login can render without it. FirebaseSessionSync mounts here so
// it's active on both the login page and the panel, keeping the fb_token cookie
// in sync with the live Firebase session wherever an admin might be.
export const metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }) {
  return (
    <>
      <FirebaseSessionSync />
      {children}
    </>
  );
}
