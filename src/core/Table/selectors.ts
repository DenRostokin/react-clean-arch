import { useCallback, useMemo } from 'react';

import { TTableState } from './consts';

const settingsOpenedSelector = (state: TTableState) => {
  return state.settingsOpened;
};

export const useTableSelectors = (state: TTableState) => {
  const selectSettingsOpened = useCallback(() => {
    return settingsOpenedSelector(state);
  }, [state]);

  return useMemo(() => ({
    selectSettingsOpened
  }), [selectSettingsOpened]);
};
