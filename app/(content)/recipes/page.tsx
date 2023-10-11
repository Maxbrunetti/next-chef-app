'use client';
import styles from './recipes.module.css';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { RootState } from '../../GlobalRedux/recipes-slice';
import { Recipe, recipesActions } from '../../GlobalRedux/recipes-slice';
import { useSelector } from 'react-redux/es/hooks/useSelector';

function Recipes() {
  const dispatch = useDispatch();
  const recipes = useSelector((state: RootState) => state.recipes.recipes);
  function displayRecipes(type: string) {
    return (
      <div style={{ zIndex: 11 }}>
        {recipes
          .filter((recipe: Recipe) => recipe.type === type)
          .sort((a: { name: string }, b: { name: string }) =>
            a.name < b.name ? -1 : 1,
          )
          .map((recipe: Recipe) => (
            <div className={styles.recipesContainer} key={recipe.name}>
              <Link
                href="/recipeselected"
                onClick={(e: any) => {
                  dispatch(recipesActions.selectRecipe<any>(e.target.text));
                }}
              >
                {recipe.name}
              </Link>
            </div>
          ))}
      </div>
    );
  }
  return (
    <section className={styles.recipesListContainer}>
      <div className={styles.recipesList}>
        <h2>Starters</h2>
        {displayRecipes('Starter')}
        <h2>Mains</h2>
        {displayRecipes('Main')}
        <h2>Desserts</h2>
        {displayRecipes('Dessert')}
      </div>
    </section>
  );
}
export default Recipes;
