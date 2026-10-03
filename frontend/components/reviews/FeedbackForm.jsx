'use client';

import { useState } from 'react';
import Image from 'next/image';
import { submitReview } from '@/lib/actions/reviews';
import styles from '@/app/(site)/reviews/reviews.module.css';

const inputIcons = {
  name: '/reviews/icons/user.svg',
  company: '/reviews/icons/company.svg',
  phone: '/reviews/icons/phone.svg',
};

export default function FeedbackForm() {
  const [rating, setRating] = useState(3);
  const [status, setStatus] = useState('idle');

  async function handleSubmit(event) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    if (!formData.get('privacy')) return;
    setStatus('sending');

    try {
      await submitReview({
        name: formData.get('name'),
        rating,
        comment: formData.get('feedback'),
      });
      setStatus('sent');
      formElement.reset();
      setRating(3);
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className={styles.formCard} role="status">
        <p className={styles.successTitle}>Thank you for your feedback.</p>
        <p className={styles.successCopy}>Your review will appear on the site once it has been reviewed.</p>
      </div>
    );
  }

  return (
    <form className={styles.formCard} onSubmit={handleSubmit}>
      <div className={styles.fields}>
        <label className={styles.field}>
          <span>Full Name</span>
          <div className={styles.inputShell}>
            <input name="name" placeholder="Your full name" autoComplete="name" required />
            <Image src={inputIcons.name} alt="" width={16} height={18} />
          </div>
        </label>
        <label className={styles.field}>
          <span>Company Name</span>
          <div className={styles.inputShell}>
            <input name="company" placeholder="Your company name" autoComplete="organization" />
            <Image src={inputIcons.company} alt="" width={18} height={18} />
          </div>
        </label>
        <label className={`${styles.field} ${styles.phoneField}`}>
          <span>Phone Number</span>
          <div className={styles.inputShell}>
            <input name="phone" type="tel" placeholder="(123) 456-7890" autoComplete="tel" />
            <Image src={inputIcons.phone} alt="" width={12} height={18} />
          </div>
        </label>
      </div>

      <fieldset className={styles.ratingField}>
        <legend>Service Rating</legend>
        <div className={styles.ratingChoices}>
          {Array.from({ length: 5 }, (_, index) => {
            const value = index + 1;
            const active = value <= rating;
            return (
              <button
                key={value}
                type="button"
                className={styles.starButton}
                onClick={() => setRating(value)}
                aria-label={`${value} star${value === 1 ? '' : 's'}`}
                aria-pressed={rating === value}
              >
                <Image src={active ? '/reviews/icons/star-filled.svg' : '/reviews/icons/star-empty.svg'} alt="" width={24} height={24} />
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className={`${styles.field} ${styles.feedbackField}`}>
        <span>Additional Feedback</span>
        <textarea name="feedback" placeholder="Tell us about your experience with Vedhanth…" required />
      </label>

      <label className={styles.privacy}>
        <input name="privacy" type="checkbox" required />
        <span>I have read and accept the Privacy Policy.</span>
      </label>

      <button className={styles.submitButton} type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Submitting…' : 'Submit Feedback'}
      </button>
      {status === 'error' && <p className={styles.formError} role="alert">Please complete the name, rating, feedback, and privacy fields, then try again.</p>}
    </form>
  );
}
