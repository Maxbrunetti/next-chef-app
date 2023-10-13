'use client';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserData } from '../app/api/recipes/newRecipe';
import { sendUserData } from '../app/api/recipes/newRecipe';
import { RootState } from '../app/GlobalRedux/store';
let isInitial = true;

function Init() {
  const dispatch = useDispatch();
  const recipes = useSelector((state: RootState) => state.recipes.recipes);
  const state = useSelector((state: RootState) => state.recipes);
  const order = useSelector((state: RootState) => state.recipes.order);

  // Fetch user data
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

  // Update order
  useEffect(() => {
    const sendDataDelay = setTimeout(() => {
      sendUserData(state);
    }, 500);
    return () => {
      clearTimeout(sendDataDelay);
    };
  }, [order, state]);
  return <></>;
}
export default Init;
