import './globals.css';

// Minimal shell — all real admin chrome/metadata lives under app/admin/*
// (copied unchanged from the single-app layout), which this just hosts.
export const metadata = {
  title: 'Vedhanth Admin',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
