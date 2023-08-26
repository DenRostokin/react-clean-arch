import { useMemo } from 'react';
import { useEmitter } from 'utils/useEmitter';

import { TTableAdapter, useLocalAdapter } from './adapters';
import { getTableMethods } from './methods';
import { TTableRegistry } from './types';

export const useTable = <D extends Record<string, unknown>>(stateAdapter: TTableAdapter<D>) => {
  const emitter = useEmitter<TTableRegistry<D>>();
  const tableMethods = useMemo(() => getTableMethods({
    ...stateAdapter,
    ...emitter
  }), []); // eslint-disable-line

  return useMemo(() => ({
    ...emitter,
    ...stateAdapter.selectors,
    ...tableMethods,
    getState: stateAdapter.getState
  }), []) // eslint-disable-line
};

export type TTable<D extends Record<string, unknown>> = ReturnType<typeof useTable<D>>;

export const useLocalTable = <D extends Record<string, unknown>>(externalTable?: TTable<D>) => {
  const externalState = externalTable?.getState();
  const stateAdapter = useLocalAdapter<D>(externalState);

  return useTable(stateAdapter);
};
