import Link from 'next/link';
import styles from './page.module.css';

function Home() {
  return (
    <section className={styles.home}>
      <Link className={`btn ${styles.btnHome}`} href="/order">
        Order
      </Link>
      <Link className={`btn ${styles.btnHome}`} href="/recipes">
        Recipes
      </Link>
      <Link className={`btn ${styles.btnHome}`} href="/addrecipes">
        Add Recipes
      </Link>
    </section>
  );
}

export default Home;
