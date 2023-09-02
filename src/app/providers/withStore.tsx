import { FC } from 'react';
import { Provider } from 'react-redux';

import { store } from '../store';

export const withStore = <P extends Record<string, unknown>>(Component: FC<P>) => {
  const StoreProvider: FC<P> = (props) => (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );

  return StoreProvider;
};
