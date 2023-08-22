import { ReactElement, Dispatch } from 'react';

// import { TApiService } from 'utils/useApiService';
import { TEntityType } from 'utils/useEntity';

import { TTableState } from './consts';

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
  SET_STATE = 'setState',
  CHANGE_SETTINGS_OPENED = 'changeSettingsOpened'
}

export type TTableStateActions = 
  | {
    type: EActionType.SET_STATE,
    payload: TTableState
  }
  | {
    type: EActionType.CHANGE_SETTINGS_OPENED;
    payload: boolean;
  }

export type TTableDispatch = Dispatch<TTableStateActions>;

export type TTableActions = {
  changeSettingsOpened(arg0: boolean): void;
}

export type TTableSelectors = {
  selectState(): TTableState;
  selectSettingsOpened(): boolean;
}

export type TStateAdapter = {
  actions: TTableActions;
  selectors: TTableSelectors;
  // apiService: TApiService;
}

export type TTableMethodParams = TStateAdapter & TEntityType<TTableRegistry>;
