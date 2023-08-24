import { useMemo } from 'react';

import { useEmitter } from 'utils/useEmitter';

import { TTableRegistry, TStateAdapter } from './types';
import { useTableMethods } from './methods';
import { useLocalAdapter } from './adapters';

export const useTable = (stateAdapter: TStateAdapter) => {
  const entity = useEmitter<TTableRegistry>();
  const methods = useTableMethods({
    ...stateAdapter,
    ...entity
  });

  return useMemo(() => ({
    ...methods,
    ...entity,
    ...stateAdapter.selectors,
  }), [stateAdapter.selectors, entity, methods]);
};

export type TTable = ReturnType<typeof useTable>;

export const useLocalTable = (externalTable?: TTable, deps = []) => {
  const externalState = externalTable?.selectState();
  const stateAdapter = useLocalAdapter(externalState, deps);

  return useTable(stateAdapter);
};
