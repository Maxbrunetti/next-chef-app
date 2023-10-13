'use client';
import Link from 'next/link';
import styles from './page.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserData } from './api/recipes/newRecipe';
import { sendUserData } from './api/recipes/newRecipe';
import { RootState } from './GlobalRedux/store';
let isInitial = true;

function Home() {
  const state = useSelector((state: RootState) => state.recipes);
  const recipes = useSelector((state: RootState) => state.recipes.recipes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(fetchUserData());
  }, [dispatch]);

  // Send user data
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    sendUserData(state);
  }, [recipes, dispatch, state]);

  return (
    <section className={styles.home}>
      <Link className={`btn ${styles.btnHome}`} href="/order">
        Order
      </Link>
      <Link className={`btn ${styles.btnHome}`} href="/recipes">
        Recipes
      </Link>
      <Link className={`btn ${styles.btnHome}`} href="/recipes/addrecipe">
        Add Recipes
      </Link>
    </section>
  );
}

export default Home;
