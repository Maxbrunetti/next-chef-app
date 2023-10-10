import { Recipe, Ingredient } from '../store/recipes-slice';

interface IngredientList {
  vegetables: string[];
  meat: string[];
  fish: string[];
  spices: string[];
  misc: string[];
}

const updateUserIngredients = function (arr: Recipe[]): IngredientList {
  if (!arr) {
    return {
      vegetables: [],
      meat: [],
      fish: [],
      spices: [],
      misc: [],
    };
  }

  const vegetables = new Set<string>();
  const meat = new Set<string>();
  const fish = new Set<string>();
  const spices = new Set<string>();
  const misc = new Set<string>();

  arr.forEach((recipe: Recipe) => {
    recipe.ingredients.forEach((ingredient: Ingredient) => {
      const list = ingredient.list;
      const ingredientName: string = ingredient.ingredient;

      switch (list) {
        case 'vegetables':
          vegetables.add(ingredientName);
          break;
        case 'meat':
          meat.add(ingredientName);
          break;
        case 'fish':
          fish.add(ingredientName);
          break;
        case 'spices':
          spices.add(ingredientName);
          break;
        case 'misc':
          misc.add(ingredientName);
          break;
        default:
          break;
      }
    });
  });

  function sortIngredients(array: string[]): string[] {
    const sortedArray = [...array];
    sortedArray.sort((a, b) => (a < b ? -1 : 1));
    return sortedArray;
  }

  const newList: IngredientList = {
    vegetables: sortIngredients(Array.from(vegetables)),
    meat: sortIngredients(Array.from(meat)),
    fish: sortIngredients(Array.from(fish)),
    spices: sortIngredients(Array.from(spices)),
    misc: sortIngredients(Array.from(misc)),
  };

  return newList;
};

export default updateUserIngredients;
