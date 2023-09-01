import { TStateReducers, TStoreReducers } from 'types';

import { DATA_FETCHING_INITIAL_STATE } from './consts';
import { TDataFetchingState, EDataFetchingAction, TActionPayload } from './types';

export const getDataFetchingStateReducers = <D>(): TStateReducers<TDataFetchingState<D>, TActionPayload<D>> => ({
  [EDataFetchingAction.SET_STATE]: (_, action) => action.payload,
  [EDataFetchingAction.CLEAN_STATE]: () => DATA_FETCHING_INITIAL_STATE,
  [EDataFetchingAction.SET_DATA]: (state, action) => ({
    ...state,
    data: action.payload
  }),
  [EDataFetchingAction.SET_INITIALIZED]: (state, action) => ({
    ...state,
    initialized: action.payload
  }),
  [EDataFetchingAction.SET_LOADING]: (state, action) => ({
    ...state,
    loading: action.payload
  }),
  [EDataFetchingAction.SET_ERROR]: (state, action) => ({
    ...state,
    error: action.payload
  }),
});

export const getDataFetchingStoreReducers = <D>(): TStoreReducers<TDataFetchingState<D>, TActionPayload<D>> => ({
  [EDataFetchingAction.SET_STATE]: (state, action) => {
    state.data = action.payload.data;
    state.initialized = action.payload.initialized;
    state.loading = action.payload.loading;
    state.error = action.payload.error;
  },
  [EDataFetchingAction.CLEAN_STATE]: (state) => {
    state.data = DATA_FETCHING_INITIAL_STATE.data;
    state.initialized = DATA_FETCHING_INITIAL_STATE.initialized;
    state.loading = DATA_FETCHING_INITIAL_STATE.loading;
    state.error = DATA_FETCHING_INITIAL_STATE.error;
  },
  [EDataFetchingAction.SET_DATA]: (state, action) => {
    state.data = action.payload;
  },
  [EDataFetchingAction.SET_INITIALIZED]: (state, action) => {
    state.initialized = action.payload;
  },
  [EDataFetchingAction.SET_LOADING]: (state, action) => {
    state.loading = action.payload;
  },
  [EDataFetchingAction.SET_ERROR]: (state, action) => {
    state.error = action.payload;
  },
});
