import { ReactElement } from 'react';

type TSortingDir = 'asc' | 'desc';

export interface ISortingValue {
  field: string;
  dir: TSortingDir;
}

export type TTableData = Record<string, unknown>;

export interface ITableColumn<T extends TTableData = TTableData> {
  id: keyof T;
  header: ReactElement | string;
  cell: ((arg: T[keyof T]) => ReactElement) | string;
}

export type TColumnSortingHandler = (value: ISortingValue) => void;

interface ISettingsChangeParams {
  visible: ITableColumn[];
  hidden: ITableColumn[];
}

export type TTableRegistry = {
  sortColumn: TColumnSortingHandler;
  openSettings: (arg0: boolean) => void;
  changeSettings: (arg0: ISettingsChangeParams) => void;
};

export interface IUseTablePayload<T extends TTableData> {
  data: T[];
  columns: ITableColumn<T>[];
}

export const enum EActionType {
  CHANGE_SETTINGS_OPENED = 'changeSettingsOpened'
}

export type TTableAction = 
  | {
    type: EActionType.CHANGE_SETTINGS_OPENED;
    payload: boolean;
  }

export type TTableActions = {
  changeSettingsOpened(arg0: boolean): void;
}

export type TTableSelectors = {
  selectSettingsOpened(): boolean;
}

export type TStateAdapter = {
  actions: TTableActions,
  selectors: TTableSelectors
}
