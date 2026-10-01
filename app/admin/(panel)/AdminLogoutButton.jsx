'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import styles from './admin.module.css';

export default function AdminLogoutButton() {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSignOut() {
    setPending(true);
    setError('');
    try {
      await signOut(auth);
      document.cookie = 'fb_token=; path=/; max-age=0; SameSite=Lax';
      router.push('/admin/login');
      router.refresh();
    } catch {
      setError('Unable to sign out. Please try again.');
      setPending(false);
    }
  }

  return (
    <>
      <button type="button" className={styles.logoutButton} onClick={() => setOpen(true)}>
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 17l5-5-5-5M15 12H3"/><path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6"/></svg>
        Sign out
      </button>
      {open && (
        <div className={styles.modalBackdrop} role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget && !pending) setOpen(false); }}>
          <section className={styles.confirmModal} role="alertdialog" aria-modal="true" aria-labelledby="signout-title" aria-describedby="signout-description">
            <div className={styles.confirmIcon} aria-hidden="true">↗</div>
            <h2 id="signout-title">Sign out?</h2>
            <p id="signout-description">You’ll need to sign in again to access the admin workspace.</p>
            {error && <p className={styles.errorNotice} role="alert">{error}</p>}
            <div className={styles.modalActions}>
              <button className={styles.secondaryButton} type="button" disabled={pending} onClick={() => setOpen(false)}>Cancel</button>
              <button className={styles.primaryButton} type="button" disabled={pending} onClick={handleSignOut}>{pending ? 'Signing out…' : 'Sign out'}</button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
