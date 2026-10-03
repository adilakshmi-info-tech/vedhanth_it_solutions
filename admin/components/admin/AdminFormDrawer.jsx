'use client';

import { useEffect, useRef } from 'react';
import styles from '../../app/admin/(panel)/admin.module.css';

export default function AdminFormDrawer({
  open,
  title,
  description,
  formId,
  submitLabel,
  busy = false,
  onClose,
  children,
}) {
  const closeButton = useRef(null);
  const onCloseRef = useRef(onClose);
  const busyRef = useRef(busy);
  onCloseRef.current = onClose;
  busyRef.current = busy;

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && !busyRef.current) onCloseRef.current();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className={styles.drawerBackdrop}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !busy) onClose();
      }}
    >
      <section className={styles.formDrawer} role="dialog" aria-modal="true" aria-labelledby={`${formId}-title`}>
        <header className={styles.drawerHeader}>
          <div>
            <h2 id={`${formId}-title`}>{title}</h2>
            {description && <p>{description}</p>}
          </div>
          <button ref={closeButton} type="button" className={styles.iconButton} aria-label="Close form" disabled={busy} onClick={onClose}>×</button>
        </header>
        <div className={styles.drawerBody}>{children}</div>
        <footer className={styles.drawerFooter}>
          <button type="button" className={styles.secondaryButton} disabled={busy} onClick={onClose}>Cancel</button>
          <button type="submit" form={formId} className={styles.primaryButton} disabled={busy}>
            {busy ? 'Saving…' : submitLabel}
          </button>
        </footer>
      </section>
    </div>
  );
}
