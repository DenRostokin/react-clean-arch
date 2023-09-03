import noop from 'lodash/noop';

import { DEFAULT_EMITTER_CONTEXT } from 'shared/utils/useEmitter';

export const TABLE_INITIAL_STATE = {
  data: [],
  columns: [],
  settingsOpened: false,
  hiddenColumns: [],
};

export const DEFAULT_SELECTORS_CONTEXT = {
  useData: () => [],
  useColumns: () => [],
  useHiddenColumns: () => [],
  useSettingsOpened: () => false,
};

export const DEFAULT_METHODS_CONTEXT = {
  setData: noop,
  setColumns: noop,
  openSettings: noop,
  hideColumns: noop,
}

export const DEFAULT_TABLE_CONTEXT = {
  ...DEFAULT_EMITTER_CONTEXT,
  ...DEFAULT_SELECTORS_CONTEXT,
  ...DEFAULT_METHODS_CONTEXT,
  getState: () => TABLE_INITIAL_STATE,
};