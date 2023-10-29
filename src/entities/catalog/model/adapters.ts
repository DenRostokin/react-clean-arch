import { useMemo } from 'react';
import { combineReducers } from '@reduxjs/toolkit';

import { useDataFetchingStateAdapter, useDataFetchingStoreAdapter, createDataFetchingSlice } from 'shared/utils/dataFetchingAdapter';
import { generateSliceName } from 'shared/utils/slice';
import { DeepPartial } from 'shared/utils/types';

import { SUBJECT_INFO_SLICE_NAME } from './consts';
import { TCatalogState, TCatalogSubjectInfo } from './types';

export const useCatalogStateAdapter = (externalState?: DeepPartial<TCatalogState>, deps: any[] = []) => {
  const subjectInfo = useDataFetchingStateAdapter<TCatalogSubjectInfo>(externalState?.subjectInfo, deps);

  return useMemo(() => ({
    subjectInfo,
  }), []); // eslint-disable-line
};

export type TCatalogAdapter = ReturnType<typeof useCatalogStateAdapter>;

export const useCatalogStoreAdapter = (name: string, externalState?: DeepPartial<TCatalogState>, deps: any[] = []): TCatalogAdapter => {
  const subjectInfo = useDataFetchingStoreAdapter<TCatalogSubjectInfo>(generateSliceName(name, SUBJECT_INFO_SLICE_NAME), externalState?.subjectInfo, deps);

  return useMemo(() => ({
    subjectInfo
  }), []) // eslint-disable-line
};

type TCatalogSliceParams = {
  name: string;
  initialState?: DeepPartial<TCatalogState>;
  sliceSelector: (arg0: any) => TCatalogState;
}

export const createCatalogSlice = ({
  name,
  initialState,
  sliceSelector,
}: TCatalogSliceParams) => {
  const catalogSubjectInfoSelector = (state: any) => sliceSelector(state).subjectInfo;

  const catalogSubjectInfoReducer = createDataFetchingSlice({
    name: generateSliceName(name, SUBJECT_INFO_SLICE_NAME),
    sliceSelector: catalogSubjectInfoSelector,
    initialState: initialState?.subjectInfo
  });

  return combineReducers({
    subjectInfo: catalogSubjectInfoReducer,
  });
}
