'use client';
import './../../globals.css';
import styles from './page.module.css';
import Popup from 'reactjs-popup';
import capitalizeAndAddSpaces from '../../../utils/capitalizeAndAddSpaces';
import Ingredients from '../../../components/Ingredients';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../GlobalRedux/store';
import { recipesActions } from '../../GlobalRedux/Recipes/recipes-slice';

function Order() {
  const order = useSelector((state: RootState) => state.recipes.order);
  const popupBody: any = (close: () => void) => (
    <div className={'confirmDeleteContainer'}>
      <p style={{ fontWeight: 600 }}>
        Are you sure you want to clear all orders?
      </p>
      <div>
        <button
          className={'btn btnDelete'}
          onClick={() => {
            clearOrder();
            close();
          }}
        >
          Confirm
        </button>
        <button className="btn" onClick={close}>
          Cancel
        </button>
      </div>
    </div>
  );

  const dispatch = useDispatch();
  const currentList = useSelector(
    (state: RootState) => state.recipes.currentList,
  );
  const list = useSelector(
    (state: RootState) => state.recipes.lists[currentList],
  );

  function clearOrder() {
    dispatch(recipesActions.clearOrder());
  }

  function copyList() {
    let copiedText: string | string[] = [];
    for (const key in order[list]) {
      if (order[list][key] === 0) continue;
      copiedText.push(`${capitalizeAndAddSpaces(key)}: ${order[list][key]}kg`);
    }
    copiedText = copiedText.join('\n');
    return navigator.clipboard.writeText(copiedText);
  }

  return (
    <section className={styles[list]}>
      <Ingredients />
      <div className="containerBtn">
        <button className="btn btnBottom" onClick={copyList}>
          Copy
        </button>
        <button
          className="btn btnBottom"
          onClick={() => {
            dispatch(recipesActions.changeList());
          }}
        >
          Next List
        </button>
      </div>
      <div className="containerBtnDelete">
        <Popup
          trigger={<button className={'btn btnDelete'}>Clear Order</button>}
          modal
          nested
        >
          {popupBody}
        </Popup>
      </div>
    </section>
  );
}

export default Order;
