import { useCallback, useMemo, useContext } from 'react';

import { HttpServiceContext } from 'core/ApiService';

import { useClientStateAdapter } from './adapters';
import { getClientMethods } from './methods';
import { TClientAdapter, TClientState, TClientGetState } from './types';

export const useClient = (clientAdapter: TClientAdapter) => {
  const apiService = useContext(HttpServiceContext);

  const getState = useCallback<TClientGetState>(() => ({
    clientList: clientAdapter.clientList.getState(),
    clientInfo: clientAdapter.clientInfo.getState(),
  }), []); // eslint-disable-line

  const clientMethods = useMemo(() => getClientMethods({
    ...clientAdapter,
    apiService,
    getState,
  }), []); // eslint-disable-line

  return useMemo(() => ({
    getState,
    clientListSelectors: clientAdapter.clientList.selectors,
    clientInfoSelectors: clientAdapter.clientInfo.selectors,
    ...clientMethods,
  }), []); // eslint-disable-line
};

export type TClient = ReturnType<typeof useClient>;

export const useLocalClient = (externalState?: TClientState, deps = []) => {
  const stateAdapter = useClientStateAdapter(externalState, deps);

  return useClient(stateAdapter);
};
