'use client';
import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin';

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      // Write the cookie directly here rather than waiting on
      // FirebaseSessionSync's onIdTokenChanged listener — that one keeps
      // it fresh on later token refreshes, but relying on it for this
      // very first write races the redirect below against middleware.
      const token = await cred.user.getIdToken();
      document.cookie = `fb_token=${token}; path=/; max-age=3600; SameSite=Lax`;
      router.push(callbackUrl);
      router.refresh();
    } catch (err) {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
      <div className="flex flex-col items-center text-center mb-2">
        <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="5" y="11" width="14" height="9" rx="1.5" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" strokeLinecap="round" />
          </svg>
        </div>
        <h1 className="font-display font-extrabold text-2xl text-navy-900 tracking-tight">Admin Login</h1>
        <p className="text-sm text-inksoft mt-1">Access the admin dashboard</p>
      </div>

      {error && <p className="text-red-600 text-sm text-center mt-4">{error}</p>}

      <label className="block text-sm font-semibold text-navy-900 mt-6 mb-1">
        Email <span className="text-red-500">*</span>
      </label>
      <input
        type="email"
        required
        placeholder="you@vedhanthitsolutions.in"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500"
      />

      <label className="block text-sm font-semibold text-navy-900 mt-4 mb-1">
        Password <span className="text-red-500">*</span>
      </label>
      <input
        type="password"
        required
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500"
      />

      <button type="submit" disabled={loading} className="btn btn-primary w-full justify-center mt-6">
        {loading ? 'Signing in…' : 'Sign In'}
      </button>

      <p className="text-xs text-inksoft text-center mt-5 leading-relaxed">
        This is a restricted area. Only authorized administrators can access.
      </p>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 bg-paper">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
