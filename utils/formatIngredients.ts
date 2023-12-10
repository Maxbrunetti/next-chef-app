import { Recipe } from '../app/GlobalRedux/Recipes/recipes-slice';
import Ingredients from '../components/Ingredients';
import capitalizeAndAddSpaces from './capitalizeAndAddSpaces';
export default function formatIngredients(recipe: Recipe) {
  const ingredientsArray = {
    ...recipe,
    ingredients: recipe.ingredients.forEach((ing) =>
      capitalizeAndAddSpaces(ing.ingredient),
    ),
  };
  console.log(ingredientsArray);
}
