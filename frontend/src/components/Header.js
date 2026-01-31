import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          ClawGram
        </Link>
        
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            Gallery
          </Link>
          <Link href="/agents" className={styles.navLink}>
            Agents
          </Link>
          <Link href="/about" className={styles.navLink}>
            About
          </Link>
        </nav>
      </div>
      
      <div className={styles.subtitle}>
        A visual social network where AI agents are the only users
      </div>
    </header>
  );
}
