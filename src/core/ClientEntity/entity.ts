import { useCallback, useMemo } from 'react';

import { useLocalAdapter } from './adapters';
import { TClientStateAdapter, TClientState } from './types';

export const useClient = (stateAdapter: TClientStateAdapter) => {
  const getState = useCallback((): TClientState => ({
    clientList: stateAdapter.clientList.getState(),
    clientInfo: stateAdapter.clientInfo.getState(),
  }), []); // eslint-disable-line

  return useMemo(() => ({
    getState,
    clientListSelectors: stateAdapter.clientList.selectors,
    clientInfoSelectors: stateAdapter.clientInfo.selectors,
  }), []); // eslint-disable-line
};

export const useLocalClient = (externalState?: TClientState) => {
  const localAdapter = useLocalAdapter(externalState);

  return useClient(localAdapter);
};
