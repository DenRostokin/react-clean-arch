import { createContext } from 'react';
import noop from 'lodash/noop';

import { DEFAULT_ENTITY_CONTEXT } from 'utils/useEntity';

import { TTable } from './hooks';
import { DEFAULT_SELECTORS_CONTEXT } from './selectors';

const defaultTable: TTable = {
  ...DEFAULT_ENTITY_CONTEXT,
  ...DEFAULT_SELECTORS_CONTEXT,
  openSettings: noop,
};

const TableContext = createContext<TTable>(defaultTable);

export default TableContext;
