import { useMemo } from 'react';
import { combineReducers } from '@reduxjs/toolkit';

import { useLocalSlice, useSliceUpdate, useStoreSlice, createStoreSlice, generateSliceName } from 'shared/utils/slice';
import { DeepPartial } from 'shared/utils/types';

import { INITIAL_PRODUCT_META_SLICE, PRODUCT_META_SLICE_NAME } from './consts'
import { TProductState } from './types';

const useProductSliceUpdate = (productSlice: TProductSlice, externalState: DeepPartial<TProductState> = {}, deps: any[] = []) => {
  useSliceUpdate(productSlice.productMeta, externalState.productMeta, deps);
}

export const useLocalProductSlice = (externalState: DeepPartial<TProductState> = {}, deps: any[] = []) => {
  const productMeta = useLocalSlice({
    ...INITIAL_PRODUCT_META_SLICE,
    ...(externalState?.productMeta || {})
  });

  const productSlice = useMemo(() => ({
    productMeta,
  }), []); // eslint-disable-line

  useProductSliceUpdate(productSlice, externalState, deps);

  return productSlice;
};

export type TProductSlice = ReturnType<typeof useLocalProductSlice>;

export const useStoreProductSlice = (name: string, externalState: DeepPartial<TProductState> = {}, deps: any[] = []) => {
  const productMeta = useStoreSlice(generateSliceName(name, PRODUCT_META_SLICE_NAME), {
    ...INITIAL_PRODUCT_META_SLICE,
    ...(externalState?.productMeta || {})
  });

  const productSlice = useMemo(() => ({
    productMeta,
  }), []); // eslint-disable-line

  useProductSliceUpdate(productSlice, externalState, deps);

  return productSlice;
};

type TProductSliceParams = {
  name: string;
  initialState?: DeepPartial<TProductState>;
  sliceSelector: (arg0: any) => TProductState;
}

export const createProductSlice = ({
  name,
  initialState,
  sliceSelector,
}: TProductSliceParams) => {
  const productMetaSelector = (state: any) => sliceSelector(state).productMeta;

  const productMetaReducer = createStoreSlice({
    name: generateSliceName(name, PRODUCT_META_SLICE_NAME),
    initialState: {
      ...INITIAL_PRODUCT_META_SLICE,
      ...(initialState?.productMeta || {})
    },
    sliceSelector: productMetaSelector
  });

  return combineReducers({
    productMeta: productMetaReducer,
  });
}
