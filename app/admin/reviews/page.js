'use client';
import { useEffect, useState } from 'react';
import {
  collection, updateDoc, deleteDoc, doc, getDocs, query, orderBy,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const snap = await getDocs(query(collection(db, 'reviews'), orderBy('createdAt', 'desc')));
    setReviews(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function toggleApproved(id, current) {
    await updateDoc(doc(db, 'reviews', id), { approved: !current });
    load();
  }

  async function handleDelete(id) {
    if (!confirm('Delete this review?')) return;
    await deleteDoc(doc(db, 'reviews', id));
    load();
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-navy-900 mb-6">Reviews</h1>
      <p className="text-sm text-inksoft mb-6">
        Reviews are submitted by customers (via a public form you can add to the Contact page) and stay
        hidden from the site until approved here.
      </p>

      {loading ? (
        <p className="text-inksoft text-sm">Loading…</p>
      ) : (
        <div className="space-y-3">
          {reviews.map((r) => (
            <div key={r.id} className="border border-slate-200 rounded-lg px-4 py-3">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="font-semibold text-navy-900 text-sm">{r.name}</div>
                  <div className="text-cyan-500 text-xs mb-1">{'★'.repeat(r.rating || 5)}</div>
                  <p className="text-sm text-ink">{r.comment}</p>
                </div>
                <div className="flex gap-2 text-sm shrink-0">
                  <button
                    onClick={() => toggleApproved(r.id, r.approved)}
                    className={`font-semibold ${r.approved ? 'text-amber-600' : 'text-green-600'}`}
                  >
                    {r.approved ? 'Unapprove' : 'Approve'}
                  </button>
                  <button onClick={() => handleDelete(r.id)} className="text-red-600 font-semibold">Delete</button>
                </div>
              </div>
              <span className={`inline-block mt-2 text-[11px] font-bold px-2 py-0.5 rounded-full ${r.approved ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                {r.approved ? 'Approved — visible on site' : 'Pending'}
              </span>
            </div>
          ))}
          {reviews.length === 0 && <p className="text-inksoft text-sm">No reviews yet.</p>}
        </div>
      )}
    </div>
  );
}
