import { useMemo, useCallback } from 'react';

import { useODataService } from 'shared/model/apiService';

import { TCatalogAdapter, useCatalogStateAdapter } from './adapters';
import { getCatalogMethods } from './methods';
import { TCatalogState, TCatalogGetState } from './types';

export const useCatalog = (adapter: TCatalogAdapter) => {
  const apiService = useODataService();

  const getState = useCallback<TCatalogGetState>(() => ({
    subjectInfo: adapter.subjectInfo.getState(),
  }), []); // eslint-disable-line

  const catalogMethods = useMemo(() => getCatalogMethods({
    apiService,
    getState,
    ...adapter
  }), []); // eslint-disable-line

  return useMemo(() => ({
    getState,
    subjectInfoSelectors: adapter.subjectInfo.selectors,
    ...catalogMethods,
  }), []); // eslint-disable-line
};

export type TCatalog = ReturnType<typeof useCatalog>;

export const useLocalCatalog = (externalState?: Partial<TCatalogState>, deps = []) => {
  const stateAdapter = useCatalogStateAdapter(externalState, deps);

  return useCatalog(stateAdapter);
};
