'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Popup from 'reactjs-popup';
import { useDispatch } from 'react-redux';
import { RootState } from '../../../GlobalRedux/store';
import { recipesActions } from '../../../GlobalRedux/Recipes/recipes-slice';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import styles from './../recipes.module.css';
function RecipeSelected() {
  const router = useRouter();
  const recipes = useSelector((state: RootState) => state.recipes.recipes);
  const recipeSelected = useSelector(
    (state: RootState) => state.recipes.recipeSelected,
  );

  const dispatch = useDispatch();

  function deleteRecipe() {
    dispatch(recipesActions.deleteRecipe<any>(recipeSelected));
    router.push('/recipes');
  }

  const popupBody: any = (close: () => void) => (
    <div className={styles.confirmDeleteContainer}>
      <p style={{ fontWeight: 600 }}>
        Are you sure you want to delete this recipe?
      </p>
      <p>This will also remove its ingredients from the order list.</p>
      <div>
        <button className="btn btnDelete" onClick={deleteRecipe}>
          Confirm
        </button>
        <button className="btn" onClick={close}>
          Cancel
        </button>
      </div>
    </div>
  );

  if (recipeSelected) {
    const [currentRecipe] = recipes.filter(
      (recipe) => recipe.name === recipeSelected,
    );
    const ingredientsList = currentRecipe.ingredients.map((ing) => (
      <li key={ing.ingredient}>
        {ing.weight}kg: {ing.ingredient}
      </li>
    ));

    return (
      <section className={styles.recipeSelected}>
        <h1>{currentRecipe.name}</h1>
        <p className={styles.details}>Type: {currentRecipe.type}</p>
        <p className={styles.details}>Portions: {currentRecipe.portions}</p>
        <div className={styles.instructions}>
          <h2>Ingredients</h2>
          <ul>{ingredientsList || ''}</ul>
          <h2>Instructions</h2>
          <p>{currentRecipe.instructions || ''}</p>
          <h2>Allergens</h2>
          <ul>
            {currentRecipe.allergens
              ? currentRecipe.allergens.map((el) => <li key={el}>{el}</li>)
              : ''}
          </ul>
        </div>
        <div className="containerBtnDelete">
          <Popup
            trigger={<button className="btn btnDelete">Delete Recipe</button>}
            modal
            nested
          >
            {popupBody}
          </Popup>
        </div>
        <div className={styles.btnContainer}>
          <button className="btn btnBottom" onClick={() => router.back()}>
            Back
          </button>
          <button
            className="btn btnBottom"
            onClick={() => router.push('/editrecipe')}
          >
            Edit
          </button>
        </div>
      </section>
    );
  } else return <></>;
}
export default RecipeSelected;
