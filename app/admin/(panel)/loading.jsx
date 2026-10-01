import styles from './admin.module.css';

export default function AdminLoading() {
  return (
    <div aria-label="Loading admin workspace" aria-busy="true">
      <div className={styles.loadingGrid}><div className={styles.loadingCard}/><div className={styles.loadingCard}/><div className={styles.loadingCard}/><div className={styles.loadingCard}/></div>
      <div className={`${styles.loadingCard} ${styles.loadingPanel}`}/>
    </div>
  );
}
