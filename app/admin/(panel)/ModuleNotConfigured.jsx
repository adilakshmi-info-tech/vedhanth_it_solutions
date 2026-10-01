import Link from 'next/link';
import styles from './admin.module.css';

export default function ModuleNotConfigured({ title, detail, migration, href, linkLabel }) {
  return (
    <section>
      <div className={styles.pageIntro}><div><h2>{title}</h2><p>Admin module</p></div></div>
      <div className={styles.moduleBanner}>
        <span className={styles.moduleKicker}>STORAGE NOT CONFIGURED</span>
        <h2>{title} records are not available yet</h2>
        <p>{detail}</p>
        {migration && <p className={styles.moduleMigration}>{migration}</p>}
        {href && <Link href={href} className={styles.secondaryButton}>{linkLabel}</Link>}
      </div>
    </section>
  );
}
