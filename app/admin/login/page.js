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
    <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white border border-slate-200 rounded-2xl p-8">
      <h1 className="font-display text-2xl text-navy-900 mb-6">Admin Login</h1>
      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
      <label className="block text-sm font-semibold text-inksoft mb-1">Email</label>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-4 text-sm"
      />
      <label className="block text-sm font-semibold text-inksoft mb-1">Password</label>
      <input
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-6 text-sm"
      />
      <button type="submit" disabled={loading} className="btn btn-primary w-full justify-center">
        {loading ? 'Signing in…' : 'Sign In'}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
