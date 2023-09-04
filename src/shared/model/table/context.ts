import { createContext } from 'react';

import { TTable } from './entity';
import { DEFAULT_TABLE_CONTEXT } from './consts';
import { TTableDataExtension } from './types';

export const createTableContext = <D extends TTableDataExtension>() => {
  return createContext<TTable<D>>(DEFAULT_TABLE_CONTEXT);
};
