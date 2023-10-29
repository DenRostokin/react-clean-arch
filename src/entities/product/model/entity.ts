import { useMemo } from 'react';

import { DeepPartial } from 'shared/utils/types';

import { useLocalProductSlice, TProductSlice } from './slice';
import { TProductState } from './types';

const useProduct = (slice: TProductSlice) => {
  return useMemo(() => ({
    ...slice,
  }), []); // eslint-disable-line
}

export type TProduct = ReturnType<typeof useProduct>;

export const useLocalProduct = (externalState?: DeepPartial<TProductState>, deps: any[] = []) => {
  const localSlice = useLocalProductSlice(externalState, deps);

  return useProduct(localSlice);
}
