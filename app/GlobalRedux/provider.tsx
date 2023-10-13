'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { ReactNode } from 'react';

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
