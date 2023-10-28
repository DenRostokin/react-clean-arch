import { useMemo } from 'react';
import { DeepPartial } from '@reduxjs/toolkit';

import { useDataFetchingStateAdapter, useDataFetchingStoreAdapter } from 'shared/utils/dataFetchingAdapter';

import { SUBJECT_INFO_SLICE_NAME } from './consts';
import { TCatalogState, TCatalogSubjectInfo } from './types';

export const useCatalogStateAdapter = (externalState?: DeepPartial<TCatalogState>, deps = []) => {
  const subjectInfo = useDataFetchingStateAdapter<TCatalogSubjectInfo>(externalState?.subjectInfo, deps);

  return useMemo(() => ({
    subjectInfo,
  }), []); // eslint-disable-line
};

export type TCatalogAdapter = ReturnType<typeof useCatalogStateAdapter>;

export const useCatalogStoreAdapter = (): TCatalogAdapter => {
  const subjectInfo = useDataFetchingStoreAdapter<TCatalogSubjectInfo>(SUBJECT_INFO_SLICE_NAME);

  return useMemo(() => ({
    subjectInfo
  }), []) // eslint-disable-line
};
