import Link from 'next/link';

import styles from './navbar.module.css';

export default async function Navbar() {
  return (
    <header className={styles.navbar}>
      <nav className={styles.nav}>
        <ul className={styles.links}>
          <Link href='/'>
            <li>Home</li>
          </Link>
          <Link href='/about'>
            <li>About</li>
          </Link>
          <Link href='/contact'>
            <li>Contact</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}
