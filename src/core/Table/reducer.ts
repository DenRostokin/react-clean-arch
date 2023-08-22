import { useCallback } from 'react';
import { TTableState } from './consts';
import { TTableStateActions, EActionType } from './types';

export const useTableReducer = () => {
  return useCallback((state: TTableState, action: TTableStateActions) => {
    switch (action.type) {
      case EActionType.SET_STATE: {
        return action.payload;
      }
      case EActionType.CHANGE_SETTINGS_OPENED: {
        return {
          ...state,
          settingsOpened: action.payload
        }
      }
    }
  }, []);
};
