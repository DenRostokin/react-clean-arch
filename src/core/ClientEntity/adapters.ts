import { useMemo } from 'react';

import { useDataFetchingStateAdapter } from 'core/DataFetchingAdapter';

import { TClientState, TClientData, TClientAdapter } from './types';

export const useClientStateAdapter = (externalState?: TClientState): TClientAdapter => {
  const clientList = useDataFetchingStateAdapter<TClientData[]>(externalState?.clientList);
  const clientInfo = useDataFetchingStateAdapter<TClientData>(externalState?.clientInfo);

  return useMemo(() => ({
    clientList,
    clientInfo,
  }), []); // eslint-disable-line
};
