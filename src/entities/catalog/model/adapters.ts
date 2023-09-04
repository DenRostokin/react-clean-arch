import { useMemo, useCallback } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { DeepPartial, combineReducers, bindActionCreators, createSelector } from '@reduxjs/toolkit';

import { useDataFetchingStateAdapter, useDataFetchingStoreSelectors } from 'shared/model/dataFetchingAdapter';
import { createDataFetchingSlice } from 'shared/utils/createDataFetchingSlice';

import { CatalogRegistry } from './registry';
import { TCatalogState, TCatalogSubjectInfo } from './types';

export const useCatalogStateAdapter = (externalState?: DeepPartial<TCatalogState>, deps = []) => {
  const subjectInfo = useDataFetchingStateAdapter<TCatalogSubjectInfo>(externalState?.subjectInfo, deps);

  return useMemo(() => ({
    subjectInfo,
  }), []); // eslint-disable-line
};

export type TCatalogAdapter = ReturnType<typeof useCatalogStateAdapter>;

const subjectInfoSlice = createDataFetchingSlice<TCatalogSubjectInfo>({
  name: 'catalogSubjectInfo'
});

export const catalogReducer = combineReducers<TCatalogState>({
  subjectInfo: subjectInfoSlice.reducer,
});

export const useCatalogStoreAdapter = (): TCatalogAdapter => {
  const store = useStore();
  const dispatch = useDispatch();
  const selectCatalog = CatalogRegistry.getRegistry().catalogSelector;

  // eslint-disable-next-line
  const selectSubjectInfo = useCallback(createSelector(
    selectCatalog,
    state => state.subjectInfo,
  ), []);

  const subjectInfoSelectors = useDataFetchingStoreSelectors(selectSubjectInfo);

  return useMemo(() => ({
    subjectInfo: {
      actions: bindActionCreators(subjectInfoSlice.actions, dispatch),
      selectors: subjectInfoSelectors,
      getState: () => selectSubjectInfo(store.getState()),
    }
  }), []) // eslint-disable-line
};
