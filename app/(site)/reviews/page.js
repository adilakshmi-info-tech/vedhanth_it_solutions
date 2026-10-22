import Image from 'next/image';
import styles from './reviews.module.css';
import FeedbackForm from '@/components/reviews/FeedbackForm';
import { getAllApprovedReviews } from '@/lib/data';

export const metadata = {
  title: 'Client Reviews',
  description: 'Share your experience with Vedhanth IT Solutions and read feedback from our clients.',
};

export const dynamic = 'force-dynamic';

function ReviewCard({ review }) {
  const rating = Number(review.rating) || 5;
  return (
    <article className={styles.reviewCard}>
      <div className={styles.testimonial}>
        <div className={styles.reviewTopline}>
          <Image className={styles.quote} src="/reviews/icons/quote.svg" alt="" width={50} height={36} />
          <div className={styles.rating} role="img" aria-label={`${rating} out of 5 stars`}>
            <Image src="/reviews/icons/review-stars.svg" alt="" width={128} height={24} />
          </div>
        </div>
        <p className={styles.comment}>{review.comment}</p>
      </div>
      <div className={styles.divider} />
      <div className={styles.profile}>
        <div className={styles.avatar} aria-hidden="true">{review.name.trim().charAt(0).toUpperCase()}</div>
        <div className={styles.profileText}>
          <h3>{review.name}</h3>
          <p>{review.role}{review.date ? <> <span aria-hidden="true">·</span> {review.date}</> : null}</p>
        </div>
      </div>
    </article>
  );
}

function normalizeReview(review) {
  const date = new Date(review.createdAt);
  return {
    id: review.id,
    name: review.name,
    role: 'Customer',
    date: Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString('en-IN', { dateStyle: 'medium' }),
    rating: Number(review.rating) || 5,
    comment: review.comment,
  };
}

export default async function ReviewsPage() {
  let storedReviews = [];
  try {
    // Backend already filters to approved-only — this app has no admin
    // token to call the unfiltered admin endpoint with.
    storedReviews = await getAllApprovedReviews();
  } catch {
    // Backend unreachable — render the page with no review cards.
  }

  const approvedReviews = storedReviews.map(normalizeReview);

  return (
    <div className={styles.page}>
      <section className={styles.intro} aria-labelledby="feedback-title">
        <div className={styles.introInner}>
          <div className={styles.introCopy}>
            <p className={styles.eyebrow}><span />RATE OUR SERVICES</p>
            <h1 id="feedback-title">Share Your Experience With Vedhanth</h1>
            <p className={styles.description}>
              Tell us about your experience with our security, networking, electrical, and IT support services. Your feedback helps us continue delivering reliable solutions.
            </p>
          </div>
          <FeedbackForm />
        </div>
      </section>

      <section className={styles.feedback} aria-labelledby="reviews-title">
        <div className={styles.feedbackInner}>
          <header className={styles.sectionHeading}>
            <p>Client Feedback</p>
            <h2 id="reviews-title">What Our Client Says About Us</h2>
          </header>

          <div className={styles.reviewGrid}>
            {approvedReviews.length
              ? approvedReviews.map((review) => <ReviewCard key={review.id} review={review} />)
              : <p>No reviews yet — be the first to share your experience.</p>}
          </div>
        </div>
      </section>
    </div>
  );
}
