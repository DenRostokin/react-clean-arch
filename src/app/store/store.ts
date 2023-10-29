import { configureStore } from '@reduxjs/toolkit';

import { createProductSlice } from 'entities/product/model';
import { createCatalogSlice } from 'entities/catalog/model';

const productReducer = createProductSlice({
  name: 'productSlice',
  sliceSelector: (state) => state.product,
});

const catalogSlice = createCatalogSlice({
  name: 'catalogSlice',
  sliceSelector: (state) => state.catalog
})

export const store = configureStore({
  reducer: {
    product: productReducer,
    catalog: catalogSlice,
  },
});
