import { useMemo } from 'react';
import { useEmitter } from 'utils/useEmitter';

import { TTableAdapter, useTableStateAdapter } from './adapters';
import { getTableMethods } from './methods';
import { TTableRegistry, TTableState, TTableDataExtension } from './types';

export const useTable = <D extends TTableDataExtension>(tableAdapter: TTableAdapter<D>) => {
  const emitter = useEmitter<TTableRegistry<D>>();
  const tableMethods = useMemo(() => getTableMethods({
    ...tableAdapter,
    ...emitter
  }), []); // eslint-disable-line

  return useMemo(() => ({
    ...emitter,
    ...tableAdapter.selectors,
    ...tableMethods,
    getState: tableAdapter.getState,
  }), []) // eslint-disable-line
};

export type TTable<D extends TTableDataExtension> = ReturnType<typeof useTable<D>>;

export const useLocalTable = <D extends TTableDataExtension>(externalState?: Partial<TTableState<D>>, deps = []) => {
  const stateAdapter = useTableStateAdapter<D>(externalState, deps);

  return useTable(stateAdapter);
};
