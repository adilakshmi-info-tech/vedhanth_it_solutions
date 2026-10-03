import Link from 'next/link';
import { getAdminDashboardData, getTenantConfig } from '@/lib/data';
import styles from './admin.module.css';

export const dynamic = 'force-dynamic';

const formatDate = (date) => new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

export default async function AdminDashboard() {
  const [data, tenant] = await Promise.all([getAdminDashboardData(), getTenantConfig()]);
  const enquiriesEnabled = tenant?.features?.enquiries !== false;
  const metrics = [
    { label: 'Total client reviews', value: data.reviews, note: 'All customer submissions', icon: '★' },
    { label: 'Published reviews', value: data.publishedReviews, note: 'Visible on the public website', icon: '✓' },
    ...(enquiriesEnabled ? [
      { label: 'Total enquiries', value: data.enquiries, note: 'All contact form submissions', icon: '✉' },
      { label: 'New enquiries', value: data.newEnquiries, note: 'Awaiting first response', icon: '↳' },
    ] : []),
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
          <div className={styles.cardHeading}><h2 id="recent-enquiries-heading">Recent enquiries</h2>{enquiriesEnabled && <Link href="/admin/enquiries">Open inbox</Link>}</div>
          {enquiriesEnabled ? (
            <div className={styles.tableScroll}>
              <table className={styles.dataTable}>
                <thead><tr><th>Customer</th><th>Message</th><th>Received</th><th>Status</th></tr></thead>
                <tbody>{data.recentEnquiries.map((enquiry) => <tr key={enquiry.id}>
                  <td><span className={styles.tablePrimary}>{enquiry.name}</span><span className={styles.tableSecondary}>{enquiry.phone}{enquiry.email ? ` · ${enquiry.email}` : ''}</span></td>
                  <td><span className={styles.tableSecondary} title={enquiry.message}>{enquiry.message}</span></td>
                  <td>{formatDate(enquiry.createdAt)}</td>
                  <td><span className={`${styles.badge} ${enquiry.status === 'new' ? styles.badgeGreen : styles.badgeMuted}`}>{enquiry.status}</span></td>
                </tr>)}
                {data.recentEnquiries.length === 0 && <tr><td colSpan="4"><div className={styles.emptyState}><div><strong>No enquiries yet</strong>Submitted contact forms will appear here.</div></div></td></tr>}
                </tbody>
              </table>
            </div>
          ) : (
            <div className={styles.emptyState}><div><strong>Enquiries are turned off</strong>Enable this in the platform admin&apos;s tenant settings to collect and manage enquiries here.</div></div>
          )}
        </section>
      </div>

      <div className={styles.dashboardFootnote}><span><strong>{data.products}</strong> products</span><span><strong>{data.categories}</strong> categories</span><Link href="/admin/categories">Manage categories</Link></div>
    </section>
  );
}
