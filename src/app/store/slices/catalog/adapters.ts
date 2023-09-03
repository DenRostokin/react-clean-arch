import { useMemo } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { TCatalogAdapter } from 'entities/catalog/model';
import { useDataFetchingStoreSelectors } from 'shared/model/dataFetchingAdapter';
import { store, TRootState } from 'app/store';

import { subjectInfoSlice } from './slices';

const selectSubjectInfo = (state: TRootState) => state.catalog.subjectInfo;

export const useCatalogStoreAdapter = (): TCatalogAdapter => {
  const dispatch = useDispatch();

  const subjectInfoSelectors = useDataFetchingStoreSelectors(selectSubjectInfo);

  return useMemo(() => ({
    subjectInfo: {
      actions: bindActionCreators(subjectInfoSlice.actions, dispatch),
      selectors: subjectInfoSelectors,
      getState: () => selectSubjectInfo(store.getState()),
    }
  }), []) // eslint-disable-line
};
