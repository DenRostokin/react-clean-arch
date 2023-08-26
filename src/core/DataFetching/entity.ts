import { useMemo } from 'react';

import { TDataFetchingStateAdapter, useLocalStateAdapter } from './adapters';
import { DEFAULT_DATA_FETCHING } from './consts';

export const useDataFetching = <D>(stateAdapter: TDataFetchingStateAdapter<D>) => {
  return useMemo(() => ({
    ...stateAdapter.actions,
    ...stateAdapter.selectors,
    getState: stateAdapter.getState,
  }), []); // eslint-disable-line
};

export type TDataFetching<D> = ReturnType<typeof useDataFetching<D>>;

export const useLocalDataFetching = <D>(externalEntity: TDataFetching<D> = DEFAULT_DATA_FETCHING, deps = []) => {
  const externalState = externalEntity.getState();
  const localStateAdapter = useLocalStateAdapter<D>(externalState, deps);

  return useDataFetching(localStateAdapter);
};
