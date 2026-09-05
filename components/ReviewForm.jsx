'use client';
import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function ReviewForm() {
  const [form, setForm] = useState({ name: '', rating: 5, comment: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.comment.trim()) return;
    setStatus('sending');
    try {
      await addDoc(collection(db, 'reviews'), {
        name: form.name,
        rating: Number(form.rating),
        comment: form.comment,
        approved: false, // hidden until an admin approves it
        createdAt: serverTimestamp(),
      });
      setForm({ name: '', rating: 5, comment: '' });
      setStatus('sent');
    } catch (e) {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="card text-left">
        <p className="text-sm text-navy-900 font-semibold">Thanks for your feedback!</p>
        <p className="text-sm text-inksoft mt-1">Your review will appear on the site once reviewed.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card text-left">
      <h3 className="font-display text-xl text-navy-900 mb-4">Leave a review</h3>
      <label className="block text-xs font-semibold text-inksoft mb-1">Your name</label>
      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
        className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-3 text-sm"
      />
      <label className="block text-xs font-semibold text-inksoft mb-1">Rating</label>
      <select
        value={form.rating}
        onChange={(e) => setForm({ ...form, rating: e.target.value })}
        className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-3 text-sm"
      >
        {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} star{n > 1 ? 's' : ''}</option>)}
      </select>
      <label className="block text-xs font-semibold text-inksoft mb-1">Your review</label>
      <textarea
        value={form.comment}
        onChange={(e) => setForm({ ...form, comment: e.target.value })}
        required
        rows={3}
        className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-4 text-sm"
      />
      <button type="submit" disabled={status === 'sending'} className="btn btn-primary">
        {status === 'sending' ? 'Submitting…' : 'Submit Review'}
      </button>
      {status === 'error' && <p className="text-red-600 text-sm mt-2">Something went wrong — please try again.</p>}
    </form>
  );
}
