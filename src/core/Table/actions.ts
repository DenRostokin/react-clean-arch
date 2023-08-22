import { useCallback, useMemo } from 'react';

import { TTableDispatch, TTableSelectors, EActionType } from './types';

export const useTableActions = (dispatch: TTableDispatch, selectors: TTableSelectors) => {
  const changeSettingsOpened = useCallback((value: boolean) => {
    dispatch({
      type: EActionType.CHANGE_SETTINGS_OPENED,
      payload: value
    });
  }, [dispatch]);

  return useMemo(() => ({
    changeSettingsOpened
  }), [changeSettingsOpened]);
};
