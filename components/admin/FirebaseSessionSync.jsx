'use client';
import { useEffect } from 'react';
import { onIdTokenChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

// Mirrors the live Firebase ID token into a readable cookie so
// middleware.js and Server Actions (which can't reach the client-side
// Firebase SDK) can see "is an admin currently signed in." Firebase
// auto-refreshes the token roughly every hour; onIdTokenChanged fires
// on every refresh, keeping the cookie current.
export default function FirebaseSessionSync() {
  useEffect(() => {
    const unsub = onIdTokenChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        document.cookie = `fb_token=${token}; path=/; max-age=3600; SameSite=Lax`;
      } else {
        document.cookie = 'fb_token=; path=/; max-age=0; SameSite=Lax';
      }
    });
    return () => unsub();
  }, []);

  return null;
}
