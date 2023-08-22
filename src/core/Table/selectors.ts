import { useCallback, useMemo } from 'react';

import { TTableState, TABLE_INITIAL_STATE } from './consts';
import { TTableSelectors } from './types';

const settingsOpenedSelector = (state: TTableState) => {
  return state.settingsOpened;
};

export const useTableSelectors = (state: TTableState): TTableSelectors => {
  const selectState = useCallback(() => {
    return state;
  }, [state]);

  const selectSettingsOpened = useCallback(() => {
    return settingsOpenedSelector(state);
  }, [state]);

  return useMemo(() => ({
    selectState,
    selectSettingsOpened
  }), [selectState, selectSettingsOpened]);
};

export const DEFAULT_SELECTORS_CONTEXT: TTableSelectors = {
  selectSettingsOpened: () => false,
  selectState: () => TABLE_INITIAL_STATE,
};
