import Link from 'next/link';
import styles from './admin.module.css';

export default function ModuleNotConfigured({ title, detail, migration, href, linkLabel, kicker = 'STORAGE NOT CONFIGURED', heading }) {
  return (
    <section>
      <div className={styles.pageIntro}><div><h2>{title}</h2><p>Admin module</p></div></div>
      <div className={styles.moduleBanner}>
        <span className={styles.moduleKicker}>{kicker}</span>
        <h2>{heading || `${title} records are not available yet`}</h2>
        <p>{detail}</p>
        {migration && <p className={styles.moduleMigration}>{migration}</p>}
        {href && <Link href={href} className={styles.secondaryButton}>{linkLabel}</Link>}
      </div>
    </section>
  );
}
