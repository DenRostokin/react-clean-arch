import { useMemo } from 'react';
import { useEmitter } from 'utils/useEmitter';

import { TTableAdapter, useLocalAdapter } from './adapters';
import { getTableMethods } from './methods';
import { TTableRegistry, TTableState, TTableDataExtension } from './types';

export const useTable = <D extends TTableDataExtension>(stateAdapter: TTableAdapter<D>) => {
  const emitter = useEmitter<TTableRegistry<D>>();
  const tableMethods = useMemo(() => getTableMethods({
    ...stateAdapter,
    ...emitter
  }), []); // eslint-disable-line

  return useMemo(() => ({
    ...emitter,
    ...stateAdapter.selectors,
    ...tableMethods,
    getState: stateAdapter.getState,
  }), []) // eslint-disable-line
};

export type TTable<D extends TTableDataExtension> = ReturnType<typeof useTable<D>>;

export const useLocalTable = <D extends TTableDataExtension>(externalState?: Partial<TTableState<D>>) => {
  const stateAdapter = useLocalAdapter<D>(externalState);

  return useTable(stateAdapter);
};
