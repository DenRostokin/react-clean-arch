import { DATA_FETCHING_INITIAL_STATE, DEFAULT_DATA_FETCHING_ADAPTER  } from 'core/DataFetchingAdapter';

import { TClientState } from './types';
import { TClient } from './entity';

export const CLIENT_INITIAL_STATE: TClientState = {
  clientList: DATA_FETCHING_INITIAL_STATE,
  clientInfo: DATA_FETCHING_INITIAL_STATE
};

export const CLIENT_DEFAULT_CONTEXT: TClient = {
  fetchClientList: async () => undefined,
  getState: () => CLIENT_INITIAL_STATE,
  clientListSelectors: DEFAULT_DATA_FETCHING_ADAPTER.selectors,
  clientInfoSelectors: DEFAULT_DATA_FETCHING_ADAPTER.selectors
};
