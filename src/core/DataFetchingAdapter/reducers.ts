import { TDataFetchingState, EDataFetchingAction, TActionPayload } from './types';

export const getDataFetchingReducers = <D>(): TStateReducers<TDataFetchingState<D>, TActionPayload<D>> => ({
  [EDataFetchingAction.SET_STATE]: (state) => state,
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
