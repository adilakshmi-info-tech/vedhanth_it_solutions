'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteEnquiry, updateEnquiryStatus } from '@/lib/actions/enquiries';
import AdminConfirmDialog from '@/components/admin/AdminConfirmDialog';
import styles from '../admin.module.css';

const statuses = ['new', 'in_progress', 'resolved', 'closed'];
const statusLabels = { new: 'New', in_progress: 'In progress', resolved: 'Resolved', closed: 'Closed' };

export default function EnquiryManager({ initialEnquiries }) {
  const router = useRouter();
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [dialog, setDialog] = useState(null);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const rows = useMemo(() => initialEnquiries.filter((item) => {
    const matchesStatus = filter === 'all' || item.status === filter;
    const needle = query.trim().toLowerCase();
    return matchesStatus && (!needle || `${item.name} ${item.email || ''} ${item.phone} ${item.message}`.toLowerCase().includes(needle));
  }), [initialEnquiries, filter, query]);

  function run(action) {
    setError('');
    startTransition(async () => {
      try { await action(); setDialog(null); router.refresh(); }
      catch (cause) { setError(cause.message || 'Unable to complete this action.'); }
    });
  }

  return <section>
    <div className={styles.pageIntro}><div><h2>Enquiries</h2><p>Review and update customer enquiries.</p></div><span className={styles.metricStrip}><strong>{initialEnquiries.length}</strong> total enquiries</span></div>
    {error && !dialog && <p className={styles.errorNotice} role="alert">{error}</p>}
    <div className={styles.card}>
      <div className={styles.reviewFilters}>
        <input className={styles.searchInput} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search enquiries" aria-label="Search enquiries" />
        <select className={styles.selectInput} value={filter} onChange={(event) => setFilter(event.target.value)} aria-label="Filter enquiries by status"><option value="all">All statuses</option>{statuses.map((status) => <option key={status} value={status}>{statusLabels[status]}</option>)}</select>
      </div>
      <div className={styles.tableScroll}><table className={styles.dataTable}><thead><tr><th>Customer</th><th>Contact</th><th>Message</th><th>Received</th><th>Status</th><th>Actions</th></tr></thead><tbody>
        {rows.map((item) => <tr key={item.id}>
          <td><span className={styles.tablePrimary}>{item.name}</span></td>
          <td><span className={styles.tableSecondary}>{item.phone}{item.email ? ` · ${item.email}` : ''}</span></td>
          <td><span className={styles.tableSecondary} title={item.message}>{item.message}</span></td>
          <td>{new Date(item.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</td>
          <td><select className={styles.selectInput} value={item.status} disabled={isPending} onChange={(event) => run(() => updateEnquiryStatus(item.id, event.target.value))} aria-label={`Status for enquiry from ${item.name}`}>{statuses.map((status) => <option key={status} value={status}>{statusLabels[status]}</option>)}</select></td>
          <td><button className={styles.rowDanger} type="button" onClick={() => { setError(''); setDialog(item); }}>Delete</button></td>
        </tr>)}
        {!rows.length && <tr><td colSpan="6"><div className={styles.emptyState}><div><strong>{initialEnquiries.length ? 'No enquiries match these filters' : 'No enquiries yet'}</strong>{initialEnquiries.length ? 'Try changing your search or filter.' : 'Submitted contact forms will appear here.'}</div></div></td></tr>}
      </tbody></table></div>
      <div className={styles.tableFooter}>Showing {rows.length} of {initialEnquiries.length} enquiries</div>
    </div>
    <AdminConfirmDialog open={Boolean(dialog)} itemName={dialog?.name || ''} itemType="enquiry" busy={isPending} error={error} onCancel={() => { setDialog(null); setError(''); }} onConfirm={() => run(() => deleteEnquiry(dialog.id))} />
  </section>;
}
