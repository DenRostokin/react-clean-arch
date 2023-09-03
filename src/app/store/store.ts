import { configureStore } from '@reduxjs/toolkit';

import { catalogReducer } from './slices/catalog';

export const store = configureStore({
  reducer: {
    catalog: catalogReducer
  }
});

export type TRootState = ReturnType<typeof store.getState>;
