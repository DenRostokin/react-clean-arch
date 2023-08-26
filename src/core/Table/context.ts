import { createContext } from 'react';

import { TTable } from './entity';
import { DEFAULT_TABLE_CONTEXT } from './consts';

const TableContext = createContext<TTable<never>>(DEFAULT_TABLE_CONTEXT);

export default TableContext;
