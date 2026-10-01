'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { setReviewApproval, deleteReview } from '@/lib/actions/reviews';
import AdminConfirmDialog from '@/components/admin/AdminConfirmDialog';
import styles from '../admin.module.css';

export default function ReviewManager({ initialReviews }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [reviewItems, setReviewItems] = useState(initialReviews);
  const [query, setQuery] = useState('');
  const [rating, setRating] = useState('all');
  const [status, setStatus] = useState('all');
  const [type, setType] = useState('all');
  const [range, setRange] = useState({ from: '', to: '' });
  const [dialog, setDialog] = useState(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => setReviewItems(initialReviews), [initialReviews]);

  const statusOf = (review) => review.workflow?.status || (review.approved ? 'approved' : 'pending');
  const typeOf = (review) => review.workflow?.reviewType || 'company';

  const reviews = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return reviewItems.filter((review) => {
      const workflow = review.workflow || { reviewType: 'company', status: review.approved ? 'approved' : 'pending' };
      const day = new Date(review.createdAt).toISOString().slice(0, 10);
      return (!needle || `${review.name} ${review.comment} ${workflow.product?.name || ''}`.toLowerCase().includes(needle))
        && (rating === 'all' || String(review.rating) === rating)
        && (status === 'all' || workflow.status === status)
        && (type === 'all' || workflow.reviewType === type)
        && (!range.from || day >= range.from) && (!range.to || day <= range.to);
    }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [reviewItems, query, rating, status, type, range]);

  function run(action, message, update) {
    setError('');
    setNotice('');
    startTransition(async () => {
      try {
        await action();
        if (update?.remove) {
          setReviewItems((current) => current.filter((review) => review.id !== update.id));
          setDialog(null);
        } else if (update?.status) {
          setReviewItems((current) => current.map((review) => review.id === update.id ? {
            ...review,
            approved: update.status === 'approved',
            workflow: { ...review.workflow, reviewType: typeOf(review), status: update.status, product: review.workflow?.product || null },
          } : review));
        }
        setNotice(message);
        router.refresh();
      } catch (cause) {
        setError(cause.message || 'Unable to complete this action.');
      }
    });
  }

  const pendingCount = reviewItems.filter((review) => statusOf(review) === 'pending').length;
  const approvedCount = reviewItems.filter((review) => statusOf(review) === 'approved').length;
  const reviewTypeLabel = (review) => typeOf(review) === 'product'
    ? review.workflow?.product?.name || 'Product unavailable'
    : 'Vedhanth IT Solutions Review';
  const dateLabel = (review) => new Date(review.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const statusLabel = (value) => value.charAt(0).toUpperCase() + value.slice(1);

  return <section>
    <div className={styles.pageIntro}><div><h2>Client Reviews</h2><p>Manage product and Vedhanth IT Solutions customer feedback.</p></div></div>
    <div className={styles.metricStrip}><span><strong>{reviewItems.length}</strong> total reviews</span><span><strong>{approvedCount}</strong> approved</span><span><strong>{pendingCount}</strong> pending</span></div>
    {notice && <p className={styles.successNotice} role="status">{notice}</p>}{error && !dialog && <p className={styles.errorNotice} role="alert">{error}</p>}
    <div className={styles.card}>
      <div className={styles.reviewFilters}>
        <input className={styles.searchInput} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by reviewer, product, or text" aria-label="Search reviews" />
        <select className={styles.selectInput} value={type} onChange={(event) => setType(event.target.value)} aria-label="Filter review type"><option value="all">All Reviews</option><option value="product">Product Reviews</option><option value="company">Vedhanth IT Solutions Reviews</option></select>
        <select className={styles.selectInput} value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filter approval status"><option value="all">All statuses</option><option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option></select>
        <select className={styles.selectInput} value={rating} onChange={(event) => setRating(event.target.value)} aria-label="Filter by rating"><option value="all">All ratings</option>{[5, 4, 3, 2, 1].map((value) => <option key={value} value={value}>{value} stars</option>)}</select>
        <label className={styles.dateFilter}>From <input type="date" value={range.from} max={range.to || undefined} onChange={(event) => setRange({ ...range, from: event.target.value })} aria-label="Start date" /></label>
        <label className={styles.dateFilter}>To <input type="date" value={range.to} min={range.from || undefined} onChange={(event) => setRange({ ...range, to: event.target.value })} aria-label="End date" /></label>
      </div>

      <div className={`${styles.tableScroll} ${styles.reviewDesktopList}`}><table className={styles.dataTable}><thead><tr><th>Reviewer</th><th>Type / Product</th><th>Review</th><th>Rating</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead><tbody>
        {reviews.map((review) => {
          const currentStatus = statusOf(review);
          const reviewType = typeOf(review);
          return <tr key={review.id}>
            <td><span className={styles.tablePrimary}>{review.name}</span></td>
            <td><span className={styles.tableSecondary}>{reviewType === 'product' ? reviewTypeLabel(review) : 'Vedhanth IT Solutions'}</span></td>
            <td><span className={styles.tableSecondary} title={review.comment}>{review.comment}</span></td>
            <td><span className={styles.rating} aria-label={`${review.rating} out of 5 stars`}>{'★'.repeat(review.rating)}<span className={styles.ratingValue}> {review.rating}.0</span></span></td>
            <td>{dateLabel(review)}</td>
            <td><span className={`${styles.badge} ${currentStatus === 'approved' ? styles.badgeGreen : styles.badgeMuted}`}>{statusLabel(currentStatus)}</span></td>
            <td><div className={styles.rowActions}>{currentStatus !== 'approved' && <button className={styles.quietButton} type="button" disabled={isPending} onClick={() => run(() => setReviewApproval(review.id, 'approved'), 'Review approved.', { id: review.id, status: 'approved' })}>Approve</button>}{currentStatus !== 'rejected' && <button className={styles.quietButton} type="button" disabled={isPending} onClick={() => run(() => setReviewApproval(review.id, 'rejected'), 'Review rejected.', { id: review.id, status: 'rejected' })}>Reject</button>}<button className={styles.rowDanger} type="button" disabled={isPending} onClick={() => { setError(''); setDialog({ type: 'delete', review }); }}>Delete</button></div></td>
          </tr>;
        })}
        {!reviews.length && <tr><td colSpan="7"><div className={styles.emptyState}><div><strong>{reviewItems.length ? 'No reviews match these filters' : 'No reviews yet'}</strong>{reviewItems.length ? 'Try changing or clearing your filters.' : 'Customer submissions will appear here when received.'}</div></div></td></tr>}
      </tbody></table></div>

      <div className={styles.reviewMobileList}>
        {reviews.map((review) => {
          const currentStatus = statusOf(review);
          return <article className={styles.reviewMobileCard} key={review.id}>
            <div className={styles.reviewMobileHeader}>
              <h3>{review.name}</h3>
              <span className={`${styles.reviewStatus} ${styles[`reviewStatus${statusLabel(currentStatus)}`]}`}>{statusLabel(currentStatus)}</span>
            </div>
            <div className={styles.reviewMobileMeta}>
              <span className={styles.rating} aria-label={`${review.rating} out of 5 stars`}>{'★'.repeat(review.rating)}<span className={styles.ratingValue}> {review.rating}.0</span></span>
              <time dateTime={new Date(review.createdAt).toISOString()}>{dateLabel(review)}</time>
            </div>
            <p className={styles.reviewMobileType}>{reviewTypeLabel(review)}</p>
            <p className={styles.reviewMobileComment}>{review.comment}</p>
            <div className={styles.reviewMobileActions}>
              {statusOf(review) !== 'approved' && <button className={styles.primaryButton} type="button" disabled={isPending} onClick={() => run(() => setReviewApproval(review.id, 'approved'), 'Review approved.', { id: review.id, status: 'approved' })}>Approve</button>}
              {statusOf(review) !== 'rejected' && <button className={styles.secondaryButton} type="button" disabled={isPending} onClick={() => run(() => setReviewApproval(review.id, 'rejected'), 'Review rejected.', { id: review.id, status: 'rejected' })}>Reject</button>}
              <button className={styles.dangerButton} type="button" disabled={isPending} onClick={() => { setError(''); setDialog({ type: 'delete', review }); }}>Delete</button>
            </div>
          </article>;
        })}
        {!reviews.length && <div className={styles.emptyState}><div><strong>{reviewItems.length ? 'No reviews match these filters' : 'No reviews yet'}</strong>{reviewItems.length ? 'Try changing or clearing your filters.' : 'Customer submissions will appear here when received.'}</div></div>}
      </div>
      <div className={styles.tableFooter}>Showing {reviews.length} of {reviewItems.length} reviews</div>
    </div>
    <AdminConfirmDialog open={dialog?.type === 'delete'} itemName={dialog?.review?.name || ''} itemType="review" busy={isPending} error={error} onCancel={() => { setDialog(null); setError(''); }} onConfirm={() => run(() => deleteReview(dialog.review.id), 'Review deleted.', { id: dialog.review.id, remove: true })} />
  </section>;
}
