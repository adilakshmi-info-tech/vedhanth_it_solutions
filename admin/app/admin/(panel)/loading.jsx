import styles from './admin.module.css';

export default function AdminLoading() {
  return (
    <div role="status" aria-live="polite" aria-label="Loading admin workspace" aria-busy="true">
      <div className={styles.loadingGrid}><div className={styles.loadingCard}/><div className={styles.loadingCard}/><div className={styles.loadingCard}/><div className={styles.loadingCard}/></div>
      <div className={`${styles.loadingCard} ${styles.loadingPanel}`}/>
    </div>
  );
}
