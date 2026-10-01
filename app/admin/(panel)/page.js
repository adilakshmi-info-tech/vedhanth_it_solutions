import Link from 'next/link';
import { getAdminDashboardData } from '@/lib/data';
import styles from './admin.module.css';

export const dynamic = 'force-dynamic';

const formatDate = (date) => new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

export default async function AdminDashboard() {
  const data = await getAdminDashboardData();
  const metrics = [
    { label: 'Total client reviews', value: data.reviews, note: 'All customer submissions', icon: '★' },
    { label: 'Pending enquiries', value: '—', note: 'Enquiry data storage is not configured', icon: '↳', unavailable: true },
    { label: 'Published reviews', value: data.publishedReviews, note: 'Visible on the public website', icon: '✓' },
    { label: 'New enquiries', value: '—', note: 'Enquiry data storage is not configured', icon: '✉', unavailable: true },
  ];

  return (
    <section>
      <div className={styles.pageIntro}>
        <div><h2>Workspace overview</h2><p>Review your content and keep customer feedback up to date.</p></div>
        <div className={styles.quickLinks}><Link href="/admin/reviews" className={styles.primaryButton}>Manage reviews</Link><Link href="/admin/products" className={styles.secondaryButton}>Manage products</Link></div>
      </div>

      <div className={styles.metricGrid}>
        {metrics.map((metric) => <article key={metric.label} className={styles.metricCard}>
          <div className={styles.metricLabel}><span>{metric.label}</span><span className={styles.metricIcon} aria-hidden="true">{metric.icon}</span></div>
          <div className={`${styles.metricValue} ${metric.unavailable ? styles.metricUnavailable : ''}`}>{metric.value}</div>
          <div className={styles.metricHint}>{metric.note}</div>
        </article>)}
      </div>

      <div className={styles.dashboardGrid}>
        <section className={styles.card} aria-labelledby="recent-reviews-heading">
          <div className={styles.cardHeading}><h2 id="recent-reviews-heading">Recent reviews</h2><Link href="/admin/reviews">View all</Link></div>
          <div className={styles.tableScroll}>
            <table className={styles.dataTable}>
              <thead><tr><th>Client</th><th>Rating</th><th>Submitted</th><th>Status</th></tr></thead>
              <tbody>{data.recentReviews.map((review) => <tr key={review.id}>
                <td><span className={styles.tablePrimary}>{review.name}</span><span className={styles.tableSecondary}>{review.comment}</span></td>
                <td><span className={styles.rating}>{'★'.repeat(review.rating)} <span className={styles.ratingValue}>{review.rating}.0</span></span></td>
                <td>{formatDate(review.createdAt)}</td>
                <td><span className={`${styles.badge} ${review.approved ? styles.badgeGreen : styles.badgeMuted}`}>{review.approved ? 'Published' : 'Pending'}</span></td>
              </tr>)}
              {data.recentReviews.length === 0 && <tr><td colSpan="4"><div className={styles.emptyState}><div><strong>No reviews yet</strong>Customer feedback submissions will appear here.</div></div></td></tr>}
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.card} aria-labelledby="recent-enquiries-heading">
          <div className={styles.cardHeading}><h2 id="recent-enquiries-heading">Recent enquiries</h2><Link href="/admin/enquiries">Open inbox</Link></div>
          <div className={styles.emptyState}><div><strong>Enquiry inbox is not connected</strong>The public contact form currently sends messages through WhatsApp. No enquiry records are stored in this application.</div></div>
          <div className={styles.notice}>Add an Enquiry database model and connect form submissions before showing accurate enquiry counts or managing requests.</div>
        </section>
      </div>

      <div className={styles.dashboardFootnote}><span><strong>{data.products}</strong> products</span><span><strong>{data.categories}</strong> categories</span><Link href="/admin/categories">Manage categories</Link></div>
    </section>
  );
}
