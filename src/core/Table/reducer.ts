import { useCallback } from 'react';
import { TTableState } from './consts';
import { TTableAction, EActionType } from './types';

const reducers = {
  [EActionType.CHANGE_SETTINGS_OPENED]: (state: TTableState, action: TTableAction) => ({
    ...state,
    settingsOpened: action.payload
  }),
};

export const useTableReducer = () => {
  return useCallback((state: TTableState, action: TTableAction) => {
    const reducer = reducers[action.type];

    if (!reducer) {
      return state;
    }

    return reducer(state, action);
  }, []);
};
