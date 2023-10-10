import { configureStore } from '@reduxjs/toolkit';
import recipesSlice from './recipes-slice';

const store = configureStore({ reducer: { recipes: recipesSlice.reducer } });

export default store;
