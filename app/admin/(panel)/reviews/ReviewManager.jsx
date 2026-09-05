'use client';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { setReviewApproval, deleteReview } from '@/lib/actions/reviews';

export default function ReviewManager({ initialReviews }) {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  function run(action) {
    setError('');
    startTransition(async () => {
      try {
        await action();
        router.refresh();
      } catch (e) {
        setError(e.message || 'Something went wrong.');
      }
    });
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-navy-900 mb-6">Reviews</h1>
      <p className="text-sm text-inksoft mb-6">
        Reviews are submitted by customers via the form on the Contact page and stay hidden from the
        site until approved here.
      </p>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <div className="space-y-3">
        {initialReviews.map((r) => (
          <div key={r.id} className="border border-slate-200 rounded-lg px-4 py-3">
            <div className="flex justify-between items-start gap-4">
              <div>
                <div className="font-semibold text-navy-900 text-sm">{r.name}</div>
                <div className="text-cyan-500 text-xs mb-1">{'★'.repeat(r.rating || 5)}</div>
                <p className="text-sm text-ink">{r.comment}</p>
              </div>
              <div className="flex gap-2 text-sm shrink-0">
                <button
                  disabled={isPending}
                  onClick={() => run(() => setReviewApproval(r.id, !r.approved))}
                  className={`font-semibold ${r.approved ? 'text-amber-600' : 'text-green-600'}`}
                >
                  {r.approved ? 'Unapprove' : 'Approve'}
                </button>
                <button
                  disabled={isPending}
                  onClick={() => {
                    if (confirm('Delete this review?')) run(() => deleteReview(r.id));
                  }}
                  className="text-red-600 font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
            <span className={`inline-block mt-2 text-[11px] font-bold px-2 py-0.5 rounded-full ${r.approved ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
              {r.approved ? 'Approved — visible on site' : 'Pending'}
            </span>
          </div>
        ))}
        {initialReviews.length === 0 && <p className="text-inksoft text-sm">No reviews yet.</p>}
      </div>
    </div>
  );
}
