import { DATA_FETCHING_INITIAL_STATE } from 'core/DataFetchingAdapter';

import { TClientState } from './types';

export const CLIENT_INITIAL_STATE: TClientState = {
  clientList: DATA_FETCHING_INITIAL_STATE,
  clientInfo: DATA_FETCHING_INITIAL_STATE
};
