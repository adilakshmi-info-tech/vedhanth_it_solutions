'use client';
import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

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
    const res = await signIn('credentials', { redirect: false, email, password });
    setLoading(false);

    if (res?.ok) {
      router.push(callbackUrl);
      router.refresh();
    } else {
      setError('Invalid email or password.');
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
