import { useMemo } from 'react';

import { useDataFetchingStateAdapter } from 'core/DataFetchingAdapter';

import { TClientState, TClientData, TClientAdapter } from './types';

export const useClientStateAdapter = (externalState?: TClientState, deps = []): TClientAdapter => {
  const clientList = useDataFetchingStateAdapter<TClientData[]>(externalState?.clientList, deps);
  const clientInfo = useDataFetchingStateAdapter<TClientData>(externalState?.clientInfo, deps);

  return useMemo(() => ({
    clientList,
    clientInfo,
  }), []); // eslint-disable-line
};
