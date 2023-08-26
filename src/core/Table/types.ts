import { ReactElement } from 'react';

export type TTableColumn<T extends Record<string, unknown>> = {
  id: keyof T;
  header: ReactElement | string;
  cell: ((arg: T[keyof T]) => ReactElement) | string;
}

export type TTableData<D> = D[]

export type TTableColumns<D extends Record<string, unknown>> = TTableColumn<D>[]

export type TTableHiddenColumn<D extends Record<string, unknown>> = keyof D;

export type TTableHiddenColumns<D extends Record<string, unknown>> = TTableHiddenColumn<D>[];

export type TTableState<D extends Record<string, unknown>> = {
  data: TTableData<D>;
  columns: TTableColumns<D>;
  settingsOpened: boolean;
  hiddenColumns: TTableHiddenColumns<D>;
}

export const enum EActionType {
  SET_STATE = 'setState',
  SET_DATA = 'setData',
  SET_COLUMNS = 'setColumns',
  SET_SETTINGS_OPENED = 'setSettingsOpened',
  SET_HIDDEN_COLUMNS = 'setHiddenColumns',
}

export type TActionPayload<D extends Record<string, unknown>> = {
  [EActionType.SET_STATE]: TTableState<D>;
  [EActionType.SET_DATA]: TTableData<D>;
  [EActionType.SET_COLUMNS]: TTableColumns<D>;
  [EActionType.SET_SETTINGS_OPENED]: boolean;
  [EActionType.SET_HIDDEN_COLUMNS]: TTableHiddenColumns<D>;
}

export type TTableSelectors<D extends Record<string, unknown>> = {
  selectData: (state: TTableState<D>) => TTableData<D>;
  selectColumns: (state: TTableState<D>) => TTableColumns<D>;
  selectHiddenColumns: (state: TTableState<D>) => TTableHiddenColumns<D>;
  selectSettingsOpened: (state: TTableState<D>) => boolean;
}

export type TTableRegistry<D extends Record<string, unknown>> = {
  openSettings: (arg0: boolean) => void;
  hideColumns: (arg0: TTableHiddenColumns<D>) => void;
}
