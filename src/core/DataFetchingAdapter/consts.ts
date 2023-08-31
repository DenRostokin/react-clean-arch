import noop from 'lodash/noop';

import { EDataFetchingAction } from './types';

export const DATA_FETCHING_INITIAL_STATE = {
  data: null,
  loading: false,
  initialized: false,
  error: null
};

export const DEFAULT_DATA_FETCHING_ADAPTER = {
  getState: () => DATA_FETCHING_INITIAL_STATE,
  actions: {
    [EDataFetchingAction.SET_STATE]: noop,
    [EDataFetchingAction.SET_DATA]: noop,
    [EDataFetchingAction.SET_LOADING]: noop,
    [EDataFetchingAction.SET_INITIALIZED]: noop,
    [EDataFetchingAction.SET_ERROR]: noop,
  },
  selectors: {
    useData: () => DATA_FETCHING_INITIAL_STATE.data,
    useFetchingFlags: () => ({
      loading: DATA_FETCHING_INITIAL_STATE.loading,
      initialized: DATA_FETCHING_INITIAL_STATE.initialized
    }),
    useError: () => DATA_FETCHING_INITIAL_STATE.error
  }
}
