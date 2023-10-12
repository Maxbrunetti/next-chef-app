'use client';

import { Provider } from 'react-redux';
import { RootState, store } from './store';
import { ReactNode } from 'react';
import { useEffect } from 'react';
import { sendUserData } from './Recipes/recipes-actions';
import { useDispatch } from 'react-redux';
import { fetchUserData } from './Recipes/recipes-actions';

type LayoutProps = {
  children: ReactNode;
};

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

// Previous export
// export function Providers({ children }: LayoutProps) {
//   return <Provider store={store}>{children}</Provider>;
// }
