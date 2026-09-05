// Thin wrapper. The real, session-gated chrome lives in app/admin/(panel)/layout.js
// so that /admin/login can render without it.
export const metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }) {
  return children;
}
