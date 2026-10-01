'use client';

import { useState } from 'react';
import { submitReview } from '@/lib/actions/reviews';
import styles from './product-detail.module.css';

export default function ProductReviewForm({ productId }) {
  const [rating, setRating] = useState(5);
  const [state, setState] = useState('idle');
  const [error, setError] = useState('');
  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setState('sending'); setError('');
    try {
      await submitReview({ name: data.get('name'), comment: data.get('comment'), rating, productId });
      form.reset(); setRating(5); setState('sent');
    } catch (cause) { setError(cause.message || 'Your review could not be submitted.'); setState('idle'); }
  }
  return <form className={styles.productReviewForm} onSubmit={submit}>
    <h3>Write a product review</h3>
    {state === 'sent' ? <p className={styles.reviewFormSuccess} role="status">Thank you. Your review is pending approval.</p> : <>
      <label>Your name<input name="name" maxLength={120} required /></label>
      <fieldset><legend>Your rating</legend><div>{[1, 2, 3, 4, 5].map((value) => <button key={value} type="button" aria-label={`${value} star${value === 1 ? '' : 's'}`} aria-pressed={rating === value} onClick={() => setRating(value)}>{value <= rating ? '★' : '☆'}</button>)}</div></fieldset>
      <label>Your review<textarea name="comment" rows={4} maxLength={2000} required /></label>
      {error && <p className={styles.reviewFormError} role="alert">{error}</p>}
      <button type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Submitting…' : 'Submit Review'}</button>
      <p>Your review will appear after it has been approved.</p>
    </>}
  </form>;
}
