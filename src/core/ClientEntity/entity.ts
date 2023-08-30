import { useCallback, useMemo } from 'react';

import { useClientStateAdapter } from './adapters';
import { TClientAdapter, TClientState } from './types';

export const useClient = (clientAdapter: TClientAdapter) => {
  const getState = useCallback((): TClientState => ({
    clientList: clientAdapter.clientList.getState(),
    clientInfo: clientAdapter.clientInfo.getState(),
  }), []); // eslint-disable-line

  return useMemo(() => ({
    getState,
    clientListSelectors: clientAdapter.clientList.selectors,
    clientInfoSelectors: clientAdapter.clientInfo.selectors,
  }), []); // eslint-disable-line
};

export const useLocalClient = (externalState?: TClientState) => {
  const stateAdapter = useClientStateAdapter(externalState);

  return useClient(stateAdapter);
};
