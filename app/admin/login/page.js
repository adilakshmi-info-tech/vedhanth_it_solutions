'use client';

import { Suspense, useId, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import styles from './login.module.css';

function LoginForm() {
  const id = useId();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin';

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      // Write the first Firebase token before redirecting so middleware sees
      // the authenticated session on the dashboard request.
      const token = await credential.user.getIdToken();
      document.cookie = `fb_token=${token}; path=/; max-age=3600; SameSite=Lax`;
      router.push(callbackUrl);
      router.refresh();
    } catch (authError) {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formIntro}>
        <span className={styles.loginBadge} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>
        </span>
        <h1 className={styles.pageTitle}>Admin Login</h1>
        <p>Sign in to manage Vedhanth IT Solutions</p>
      </div>

      <div className={`${styles.field} ${styles.emailField}`}>
        <label className={styles.label} htmlFor={`${id}-email`}>Email</label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="username"
          inputMode="email"
          required
          placeholder="username@gmail.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={styles.input}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      </div>

      <div className={`${styles.field} ${styles.passwordField}`}>
        <label className={styles.label} htmlFor={`${id}-password`}>Password</label>
        <div className={styles.passwordControl}>
          <input
            id={`${id}-password`}
            name="password"
            type={passwordVisible ? 'text' : 'password'}
            autoComplete="current-password"
            required
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={styles.input}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
          />
          <button
            className={styles.visibilityToggle}
            type="button"
            onClick={() => setPasswordVisible((visible) => !visible)}
            aria-label={passwordVisible ? 'Hide password' : 'Show password'}
            aria-pressed={passwordVisible}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z" />
              <circle cx="12" cy="12" r="2.6" />
              {!passwordVisible && <path d="m4 4 16 16" />}
            </svg>
          </button>
        </div>
      </div>

      <p className={styles.forgotPassword}>Forgot Password?</p>

      <button type="submit" disabled={loading} className={styles.submitButton}>
        {loading ? 'Signing in…' : 'Sign in'}
      </button>

      {error && <p className={styles.error} id={`${id}-error`} role="alert">{error}</p>}
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <main className={styles.stage}>
      <div className={styles.loginBrand}><Image src="/logo-full.svg" alt="Vedhanth IT Solutions" width={202} height={52} priority /></div>
      <section className={styles.loginCard} aria-label="Administrator sign in">
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </section>
    </main>
  );
}
