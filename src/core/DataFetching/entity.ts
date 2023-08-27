import { useMemo } from 'react';

import { TDataFetchingStateAdapter, useLocalStateAdapter } from './adapters';
import { TDataFetchingState } from './types';

export const useDataFetching = <D>(stateAdapter: TDataFetchingStateAdapter<D>) => {
  return useMemo(() => ({
    ...stateAdapter.actions,
    ...stateAdapter.selectors,
    getState: stateAdapter.getState,
  }), []); // eslint-disable-line
};

export type TDataFetching<D> = ReturnType<typeof useDataFetching<D>>;

export const useLocalDataFetching = <D>(externalState?: Partial<TDataFetchingState<D>>, deps = []) => {
  const localStateAdapter = useLocalStateAdapter<D>(externalState, deps);

  return useDataFetching(localStateAdapter);
};
