'use client';

import { configureStore } from '@reduxjs/toolkit';
import recipesSlice from './Recipes/recipes-slice';

export const store = configureStore({
  reducer: { recipes: recipesSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
