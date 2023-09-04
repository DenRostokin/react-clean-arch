import { configureStore } from '@reduxjs/toolkit';

import { catalogReducer, registerCatalogSelector } from 'entities/catalog/model';

export const store = configureStore({
  reducer: {
    catalog: catalogReducer
  }
});

export type TRootState = ReturnType<typeof store.getState>;

registerCatalogSelector((state: TRootState) => state.catalog);
