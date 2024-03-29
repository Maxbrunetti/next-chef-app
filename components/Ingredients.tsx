'use client';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/GlobalRedux/store';
import { recipesActions } from '../app/GlobalRedux/Recipes/recipes-slice';
import styles from './../app/(content)/order/page.module.css';
function Ingredients() {
  const dispatch = useDispatch();
  const order = useSelector((state: RootState) => state.recipes.order);
  const currentList = useSelector(
    (state: RootState) => state.recipes.currentList,
  );
  const list = useSelector(
    (state: RootState) => state.recipes.lists[currentList],
  );
  const desktopScreen = 768;

  const [windowWidth, setWindowWidth] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchMove, setTouchMove] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function changeInputValue(e: any, key: string) {
    const ingredient = key;
    const currentValue: number = parseFloat(e.target.value);
    const increment: number = currentValue < 3 ? 0.1 : 0.5;
    const timeDelay: number = currentValue < 3 ? 40 : 120;
    if (touchStart < touchMove) {
      // Decrease the value
      if (currentValue > 0) {
        setTimeout(() => {
          const newValue: number = Math.max(
            0,
            parseFloat((currentValue - increment).toFixed(1)),
          );
          e.target.value = newValue;
          dispatch(
            recipesActions.updateOrder<any>({ ingredient, newValue, list }),
          );
        }, timeDelay);
      }
    }
    if (touchStart > touchMove) {
      // Increase the value
      setTimeout(() => {
        const newValue = Math.max(
          0,
          parseFloat((currentValue + increment).toFixed(1)),
        );
        e.target.value = newValue;
        dispatch(
          recipesActions.updateOrder<any>({ ingredient, newValue, list }),
        );
      }, timeDelay);
    }
  }

  function displayIngredients(ingredientsList: string[]) {
    const ingredients = [];
    if (windowWidth < desktopScreen) {
      // Mobile
      for (const key in ingredientsList) {
        // eslint-disable-next-line no-prototype-builtins
        if (Object.prototype.hasOwnProperty.call(ingredientsList, key)) {
          ingredients.push(
            <div className={styles.orderContainer} key={key}>
              <div className={styles.ingredientContainer}>
                <p className={styles.ingredientName}>{key}</p>
                <input
                  className={styles.ingredientQuantity}
                  key={key}
                  id={key}
                  value={order[list][key] + 'kg'}
                  onTouchStart={(e) => setTouchStart(e.touches[0].clientY)}
                  onTouchMove={(e) => {
                    setTouchMove(e.touches[0].clientY);
                    changeInputValue(e, key);
                  }}
                  onChange={(e) => e}
                />
              </div>
            </div>,
          );
        }
      }
    } else {
      // Desktop
      for (const key in ingredientsList) {
        // eslint-disable-next-line no-prototype-builtins
        if (Object.prototype.hasOwnProperty.call(ingredientsList, key)) {
          ingredients.push(
            <div className={styles.orderContainer} key={key}>
              <div className={styles.ingredientContainer}>
                <p className={styles.ingredientName}>{key}</p>
                <input
                  className={styles.ingredientQuantity}
                  key={key}
                  id={key}
                  min={0}
                  type="number"
                  value={order[list][key]}
                  onChange={(e) => {
                    console.log(+e.target.value);
                    dispatch(
                      recipesActions.updateOrder<any>({
                        list: list,
                        ingredient: key,
                        newValue: +e.target.value,
                      }),
                    );
                  }}
                />
                <div className={styles.unit}>
                  <p>kg</p>
                </div>
              </div>
            </div>,
          );
        }
      }
    }
    ingredients.sort((a: any, b: any) => (a.key > b.key ? 1 : -1));
    return ingredients;
  }
  if (!order) return <></>;
  return <>{displayIngredients(order[list])}</>;
}

export default Ingredients;
