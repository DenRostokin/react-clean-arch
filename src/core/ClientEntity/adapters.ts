import { useMemo } from 'react';

import { useDataFetchingStateAdapter } from 'core/DataFetchingAdapter';

import { TClientState, TClientData, TClientStateAdapter } from './types';

export const useLocalAdapter = (externalState?: TClientState): TClientStateAdapter => {
  const clientList = useDataFetchingStateAdapter<TClientData[]>(externalState?.clientList);
  const clientInfo = useDataFetchingStateAdapter<TClientData>(externalState?.clientInfo);

  return useMemo(() => ({
    clientList,
    clientInfo,
  }), []); // eslint-disable-line
};
