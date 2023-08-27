import { TTableSelectors, TTableDataExtension } from './types';

export const getTableSelectors = <D extends TTableDataExtension>(): TTableSelectors<D> => ({
  selectData: (state) => state.data,
  selectColumns: (state) => state.columns,
  selectHiddenColumns: (state) => state.hiddenColumns,
  selectSettingsOpened: (state) => state.settingsOpened,
});
