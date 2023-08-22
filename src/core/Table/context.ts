import { createContext } from 'react';
import noop from 'lodash/noop';

import { TTable } from './hooks';

const defaultTable: TTable = {
  openSettings: noop,
  subscribe: () => noop,
  useRenderingSubscribe: noop,
  emit: noop,
  selectSettingsOpened: () => false,
};

const TableContext = createContext<TTable>(defaultTable);

export default TableContext;
