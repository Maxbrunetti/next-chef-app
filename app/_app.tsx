import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from './GlobalRedux/store';
import { sendUserData } from './GlobalRedux/Recipes/recipes-actions';
import { fetchUserData } from './GlobalRedux/Recipes/recipes-actions';
let isInitial = true;
function App() {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.recipes);
  const recipes = useSelector((state: RootState) => state.recipes.recipes);
  const order = useSelector((state: RootState) => state.recipes.order);

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

  return '';
}
export default App;
