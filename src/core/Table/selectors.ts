import { TTableSelectors } from './types';

export const getTableSelectors = <D extends Record<string, unknown>>(): TTableSelectors<D> => ({
  selectData: (state) => state.data,
  selectColumns: (state) => state.columns,
  selectHiddenColumns: (state) => state.hiddenColumns,
  selectSettingsOpened: (state) => state.settingsOpened,
});
