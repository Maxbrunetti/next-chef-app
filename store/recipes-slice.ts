import { createSlice } from '@reduxjs/toolkit';
import updateUserIngredients from '../utils/updateUserIngredients';
import { convertArrayIntoKeyValue } from '../utils/convertArraysIntoKeyValue';

export interface Ingredient {
  list: string;
  ingredient: string;
  weight: number;
}

export interface Recipe {
  name: string;
  type: string;
  portions: number;
  ingredients: Ingredient[];
  instructions: string;
  allergens: string[];
}

interface IngredientsState {
  vegetables: string[];
  meat: string[];
  fish: string[];
  spices: string[];
  misc: string[];
}

export interface RecipesSliceState {
  recipes: Recipe[];
  ingredients: IngredientsState;
  lists: string[];
  currentList: number;
  recipeSelected: string;
  order: any;
  // order: Record<string, Record<string, number>>;
}

export type RootState = {
  recipes: RecipesSliceState;
};

const recipesInitialState: RecipesSliceState = {
  recipes: [],
  ingredients: {
    vegetables: [],
    meat: [],
    fish: [],
    spices: [],
    misc: [],
  },
  lists: ['vegetables', 'meat', 'fish', 'spices', 'misc'],
  currentList: 0,
  recipeSelected: '',
  order: {},
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: recipesInitialState,
  reducers: {
    addRecipe(state: any, action: any) {
      const newRecipe: Recipe = action.payload;
      state.recipes.push(newRecipe);
      state.ingredients = updateUserIngredients(state.recipes);
      state.order = convertArrayIntoKeyValue(state.ingredients);
    },
    editRecipe(state: any, action: any) {
      const recipeIndex = state.recipes.findIndex(
        (recipe: Recipe) => recipe.name === action.payload.recipeName
      );
      const updatedRecipe = action.payload.recipe;
      state.recipes[recipeIndex] = updatedRecipe;
      state.ingredients = updateUserIngredients(state.recipes);
      state.order = convertArrayIntoKeyValue(state.ingredients);
    },
    deleteRecipe(state: any, action: any) {
      const recipeIndex = state.recipes.findIndex(
        (recipe: Recipe) => recipe.name === action.payload
      );
      state.recipes.splice(recipeIndex, 1);
      state.ingredients = updateUserIngredients(state.recipes);
      state.order = convertArrayIntoKeyValue(state.ingredients);
    },
    selectRecipe(state: any, action: any) {
      state.recipeSelected = action.payload;
    },
    changeList(state) {
      const arrLength = state.lists.length - 1;
      if (state.currentList === arrLength) {
        state.currentList = 0;
      } else state.currentList++;
    },
    setIngredientsList(state: any) {
      if (!state.recipes) return;
      state.ingredients = updateUserIngredients(state.recipes);
    },
    updateOrder(state: any, action: any) {
      const ingredient = action.payload.ingredient;
      const list = action.payload.list;
      state.order[list][ingredient] = action.payload.newValue;
    },
    updateUser(state, action) {
      state.recipes = action.payload.recipes;
      state.lists = action.payload.lists;
      state.currentList = action.payload.currentList;
      state.recipeSelected = action.payload.recipeSelected;
      state.ingredients = action.payload.ingredients;
      state.order = action.payload.order;
    },
    clearOrder(state: any) {
      state.order = convertArrayIntoKeyValue(state.ingredients);
    },
  },
});
export const recipesActions = recipesSlice.actions;
export default recipesSlice;
