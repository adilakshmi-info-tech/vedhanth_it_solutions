'use client';

import { useEffect } from 'react';
import styles from '../../app/admin/(panel)/admin.module.css';

export default function AdminConfirmDialog({ open, itemName, itemType, busy = false, error, onCancel, onConfirm }) {
  useEffect(() => {
    if (!open || busy) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open, busy, onCancel]);

  if (!open) return null;
  return <div className={styles.modalBackdrop} role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget && !busy) onCancel(); }}>
    <section className={styles.confirmModal} role="alertdialog" aria-modal="true" aria-labelledby="confirm-delete-title">
      <div className={styles.deleteIcon} aria-hidden="true">!</div>
      <h2 id="confirm-delete-title">Delete {itemType}?</h2>
      <p>Are you sure you want to delete “{itemName}”? This action cannot be undone.</p>
      {error && <p className={styles.errorNotice} role="alert">{error}</p>}
      <div className={styles.modalActions}><button type="button" className={styles.secondaryButton} disabled={busy} onClick={onCancel}>Cancel</button><button type="button" className={styles.dangerButton} disabled={busy} onClick={onConfirm}>{busy ? 'Deleting…' : 'Delete'}</button></div>
    </section>
  </div>;
}
