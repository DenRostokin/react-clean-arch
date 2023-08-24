import { createContext } from 'react';

import { DEFAULT_EMITTER_CONTEXT } from 'utils/useEmitter';

import { TTable } from './entity';
import { DEFAULT_SELECTORS_CONTEXT } from './selectors';
import { DEFAULT_METHODS_CONTEXT } from './methods';

const defaultTable: TTable = {
  ...DEFAULT_EMITTER_CONTEXT,
  ...DEFAULT_SELECTORS_CONTEXT,
  ...DEFAULT_METHODS_CONTEXT,
};

const TableContext = createContext<TTable>(defaultTable);

export default TableContext;
