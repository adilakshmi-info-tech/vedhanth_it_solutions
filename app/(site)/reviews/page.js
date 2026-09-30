import Image from 'next/image';
import styles from './reviews.module.css';
import FeedbackForm from '@/components/reviews/FeedbackForm';

export const metadata = {
  title: 'Client Reviews',
  description: 'Share your experience with Vedhanth IT Solutions and read feedback from our clients.',
};

const reviews = [
  {
    name: 'Rajesh Kumar',
    role: 'Business Owner',
    date: 'September 18, 2026',
    rating: '4.9',
    avatar: '/reviews/avatars/mirana.png',
    comment: 'Vedhanth completed our CCTV and networking installation professionally. The team understood our requirements, finished the work on time, and provided excellent support.',
  },
  {
    name: 'Priya Nair',
    role: 'Operations Manager',
    date: 'September 10, 2026',
    rating: '4.9',
    avatar: '/reviews/avatars/crystal.png',
    comment: 'The electrical and security solutions provided for our office were reliable and neatly installed. The team was responsive from the first discussion to the final setup.',
  },
  {
    name: 'Sneha Rao',
    role: 'Office Administrator',
    date: 'August 28, 2026',
    rating: '4.9',
    avatar: '/reviews/avatars/dazzle.png',
    comment: 'Vedhanth delivered a complete CCTV and networking setup for our business. Their technical knowledge and attention to detail made the entire process simple and dependable.',
  },
  {
    name: 'Arjun Mehta',
    role: 'Facility Manager',
    date: 'August 16, 2026',
    rating: '4.8',
    avatar: '/reviews/avatars/hearts.png',
    comment: 'The biometric access-control system was installed correctly and explained clearly. Everything has been working reliably, and the support team was very helpful.',
  },
  {
    name: 'Vikram Shah',
    role: 'IT Coordinator',
    date: 'August 4, 2026',
    rating: '4.9',
    avatar: '/reviews/avatars/mirana.png',
    comment: 'Our office network became faster and more organized after Vedhanth completed the installation. The cabling was clean, and the team handled the project with great professionalism.',
  },
  {
    name: 'Ananya Iyer',
    role: 'School Administrator',
    date: 'July 22, 2026',
    rating: '5.0',
    avatar: '/reviews/avatars/crystal.png',
    comment: 'The fire-alarm system was installed safely and completed within the agreed timeline. Vedhanth explained the maintenance process clearly and answered all our questions.',
  },
  {
    name: 'Karthik Reddy',
    role: 'Retail Store Owner',
    date: 'July 8, 2026',
    rating: '4.8',
    avatar: '/reviews/avatars/dazzle.png',
    comment: 'We received quick and reliable AMC support whenever we needed assistance. The team diagnosed the issue quickly and restored our systems without unnecessary delays.',
  },
  {
    name: 'Meera Thomas',
    role: 'Startup Founder',
    date: 'June 25, 2026',
    rating: '4.9',
    avatar: '/reviews/avatars/hearts.png',
    comment: 'Vedhanth handled our laptop, desktop, and networking requirements efficiently. The service was transparent, professional, and delivered exactly as promised.',
  },
  {
    name: 'Sanjay Menon',
    role: 'Project Manager',
    date: 'June 12, 2026',
    rating: '4.9',
    avatar: '/reviews/avatars/mirana.png',
    comment: 'The EPABX and intercom installation improved communication across our office. The setup was clean, dependable, and completed with minimal disruption.',
  },
  {
    name: 'Divya Sharma',
    role: 'Homeowner',
    date: 'May 30, 2026',
    rating: '5.0',
    avatar: '/reviews/avatars/crystal.png',
    comment: 'The CCTV installation was neat, properly configured, and easy to use. The team patiently explained every feature and provided excellent after-installation support.',
  },
];

function ReviewCard({ review }) {
  return (
    <article className={styles.reviewCard}>
      <div className={styles.testimonial}>
        <div className={styles.reviewTopline}>
          <Image className={styles.quote} src="/reviews/icons/quote.svg" alt="" width={50} height={36} />
          <div className={styles.rating} role="img" aria-label={`${review.rating} out of 5 stars`}>
            <Image src="/reviews/icons/review-stars.svg" alt="" width={128} height={24} />
          </div>
        </div>
        <p className={styles.comment}>{review.comment}</p>
      </div>
      <div className={styles.divider} />
      <div className={styles.profile}>
        <Image className={styles.avatar} src={review.avatar} alt="" width={72} height={72} sizes="72px" />
        <div className={styles.profileText}>
          <h3>{review.name}</h3>
          <p>{review.role} <span aria-hidden="true">·</span> {review.date}</p>
        </div>
      </div>
    </article>
  );
}

export default function ReviewsPage() {
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
            {reviews.map((review) => <ReviewCard key={review.name} review={review} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
