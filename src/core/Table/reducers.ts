import { EActionType, TActionPayload, TTableState } from './types';

export const getTableReducers = <D extends Record<string, unknown>>(): TStateReducers<TTableState<D>, TActionPayload<D>> => ({
  [EActionType.SET_STATE]: (state) => state,
  [EActionType.SET_DATA]: (state, action) => ({
    ...state,
    data: action.payload
  }),
  [EActionType.SET_COLUMNS]: (state, action) => ({
    ...state,
    columns: action.payload
  }),
  [EActionType.SET_HIDDEN_COLUMNS]: (state, action) => ({
    ...state,
    hiddenColumns: action.payload
  }),
  [EActionType.SET_SETTINGS_OPENED]: (state, action) => ({
    ...state,
    settingsOpened: action.payload
  }),
});
