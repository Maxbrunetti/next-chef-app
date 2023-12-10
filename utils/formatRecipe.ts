import { Recipe } from '../app/GlobalRedux/Recipes/recipes-slice';
import capitalizeAndAddSpaces from './capitalizeAndAddSpaces';
export default function formatedRecipe(recipe: Recipe) {
  const formatedRecipe = {
    ...recipe,
    name: capitalizeAndAddSpaces(recipe.name),
    ingredients: recipe.ingredients.map((ingredient) => ({
      ...ingredient,
      ingredient: capitalizeAndAddSpaces(ingredient.ingredient),
    })),
  };
  return formatedRecipe;
}
