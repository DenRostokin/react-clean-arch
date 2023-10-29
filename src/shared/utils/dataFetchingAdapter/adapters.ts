import { useMemo } from 'react';

import { useLocalSlice, useSliceUpdate, useStoreSlice } from 'shared/utils/slice';
import { DeepPartial } from 'shared/utils/types';

import {
  useDataFetchingSelectors,
} from './selectors';
import { DATA_FETCHING_INITIAL_STATE } from './consts';
import { TDataFetchingState } from './types';

export const useDataFetchingStateAdapter = <D>(
  externalState?: Partial<TDataFetchingState<D>>,
  deps: any[] = [],
) => {
  const dataFetchingSlice = useLocalSlice<TDataFetchingState<D>>({
    ...DATA_FETCHING_INITIAL_STATE,
    ...externalState,
  });
  const selectors = useDataFetchingSelectors(dataFetchingSlice);

  useSliceUpdate(
    dataFetchingSlice,
    externalState as DeepPartial<TDataFetchingState<D>>,
    deps
  );

  return useMemo(() => ({
    ...dataFetchingSlice,
    selectors,
  }), []); // eslint-disable-line
};

export type TDataFetchingAdapter<D> = ReturnType<typeof useDataFetchingStateAdapter<D>>;

export const useDataFetchingStoreAdapter = <D>(
  name: string,
  externalState?: Partial<TDataFetchingState<D>>,
  deps: any[] = [],
): TDataFetchingAdapter<D> => {
  const dataFetchingSlice = useStoreSlice<TDataFetchingState<D>>(name, {
    ...DATA_FETCHING_INITIAL_STATE,
    ...externalState,
  });
  const selectors = useDataFetchingSelectors(dataFetchingSlice);

  useSliceUpdate(
    dataFetchingSlice,
    externalState as DeepPartial<TDataFetchingState<D>>,
    deps
  );

  return useMemo(() => ({
    ...dataFetchingSlice,
    selectors,
  }), []); // eslint-disable-line
};
