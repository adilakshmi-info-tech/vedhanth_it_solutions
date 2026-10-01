'use client';

import styles from './admin.module.css';

export default function AdminRouteError({ reset }) {
  return (
    <section className={styles.errorPanel} role="alert">
      <h2>This admin view couldn’t load</h2>
      <p>The data request did not complete. Your existing records have not been changed.</p>
      <button className={styles.primaryButton} onClick={() => reset()} type="button">Try again</button>
    </section>
  );
}
