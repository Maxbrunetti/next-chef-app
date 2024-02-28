'use client';
import styles from './page.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../GlobalRedux/store';
import { recipesActions } from '../../../GlobalRedux/Recipes/recipes-slice';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useState } from 'react';

function Lists() {
  const dispatch = useDispatch();
  const lists = useSelector((state: RootState) => state.recipes.lists);

  const [newList, setNewList] = useState<string>('');

  return (
    <section className={styles.listSection}>
      {lists.map((list) => (
        <div className={styles.list}>
          <p>{list}</p>
        </div>
      ))}
      <div className={styles.list}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(recipesActions.addList<any>(newList));
          }}
        >
          <Input
            id="newList"
            value={newList}
            type="text"
            onChange={(e) => setNewList(e.target.value)}
            placeholder="New list name"
          />
        </form>
      </div>
    </section>
  );
}

export default Lists;
