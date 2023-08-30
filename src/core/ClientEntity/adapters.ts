import { useMemo } from 'react';

import { useDataFetchingLocalAdapter } from 'core/DataFetchingAdapter';

import { TClientState, TClientData, TClientStateAdapter } from './types';

export const useLocalAdapter = (externalState?: TClientState): TClientStateAdapter => {
  const clientList = useDataFetchingLocalAdapter<TClientData[]>(externalState?.clientList);
  const clientInfo = useDataFetchingLocalAdapter<TClientData>(externalState?.clientInfo);

  return useMemo(() => ({
    clientList,
    clientInfo,
  }), []); // eslint-disable-line
};
