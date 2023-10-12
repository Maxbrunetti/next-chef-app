'use client';

import { recipesActions, RecipesSliceState } from './recipes-slice';
const apiKey = 'https://the-chef-app-default-rtdb.firebaseio.com/';

export async function sendUserData(userData: RecipesSliceState) {
  try {
    const response = await fetch(apiKey + 'user.json', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Error sending data');
    }
  } catch (error) {
    console.log(error);
  }
}

export function fetchUserData() {
  return async (dispatch: any) => {
    const fetchData = async function () {
      const response = await fetch(apiKey + 'user.json');
      if (!response.ok) {
        throw new Error('Fetching data failed');
      }
      const data = await response.json();
      return data;
    };

    try {
      const userData = await fetchData();
      dispatch(
        recipesActions.updateUser({
          recipes: userData.recipes || [],
          lists: userData.lists,
          currentList: userData.currentList,
          recipeSelected: userData.recipeSelected,
          ingredients: userData.ingredients,
          order: userData.order,
        }),
      );
    } catch (err) {
      console.log(err);
    }
  };
}
