'use client';
import Link from 'next/link';
import styles from './index.module.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/GlobalRedux/store';
import { usePathname } from 'next/navigation';

function Navbar() {
  const pathname = usePathname();
  const list = useSelector(
    (state: RootState) => state.recipes.lists[state.recipes.currentList],
  );

  const [menuOpen, setMenuOpen] = useState(false);
  function setTitle() {
    if (pathname === '/order') {
      return list;
    }
    if (pathname === '/') {
      return 'THE CHEF APP';
    }
    if (pathname === '/recipes') {
      return 'RECIPES';
    }
    if (pathname === '/addrecipes') {
      return 'ADD RECIPES';
    } else return 'THE CHEF APP';
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav>
      <div className={`${styles.navbar} ${menuOpen ? styles.active : ''}`}>
        <div
          className={`${styles.hamburgerIcon} ${menuOpen ? styles.active : ''}`}
          onClick={toggleMenu}
        >
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </div>
        <p className={styles.title}>{setTitle().toUpperCase()}</p>
      </div>
      <ul
        className={`${styles.navElements} ${
          menuOpen ? styles.active : styles.hidden
        }`}
      >
        <li>
          <Link href="/" onClick={toggleMenu}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/order" onClick={toggleMenu}>
            Order
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
