'use client';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function AdminLogoutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await signOut(auth);
    // FirebaseSessionSync's onIdTokenChanged also clears the cookie on
    // sign-out, but clear it here too so the redirect below is immediate
    // rather than racing that listener.
    document.cookie = 'fb_token=; path=/; max-age=0; SameSite=Lax';
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      className="btn border border-green-500 text-green-600 hover:bg-green-500/10 bg-transparent shrink-0"
    >
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 21H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Logout
    </button>
  );
}
