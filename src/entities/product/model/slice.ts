import { useMemo } from 'react';

import { useLocalSlice, useSliceUpdate } from 'shared/utils/slice';
import { DeepPartial } from 'shared/utils/types';

import { INITIAL_PRODUCT_META_SLICE } from './consts'
import { TProductState } from './types';

const useProductSliceUpdate = (productSlice: TProductSlice, externalState: DeepPartial<TProductState> = {}, deps: any[] = []) => {
  useSliceUpdate(productSlice.productMeta, externalState.productMeta, deps);
}

export const useLocalProductSlice = (externalState: DeepPartial<TProductState> = {}, deps: any[] = []) => {
  const productMeta = useLocalSlice(INITIAL_PRODUCT_META_SLICE);

  const productSlice = useMemo(() => ({
    productMeta,
  }), []); // eslint-disable-line

  useProductSliceUpdate(productSlice, externalState, deps);

  return productSlice;
};

export type TProductSlice = ReturnType<typeof useLocalProductSlice>;
