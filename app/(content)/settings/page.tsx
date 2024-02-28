'use client';
import Link from 'next/link';
import styles from './page.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserData } from '../../api/recipes/newRecipe';
import { sendUserData } from '../../api/recipes/newRecipe';
import { RootState } from '../../GlobalRedux/store';
let isInitial = true;

function Settings() {
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
    <section className={styles.settings}>
      <Link className={`btn ${styles.btnHome}`} href={'/settings/lists'}>
        Edit Lists
      </Link>
    </section>
  );
}

export default Settings;
