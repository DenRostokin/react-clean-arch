import { useMemo } from 'react';

import { useDataFetchingStateAdapter } from 'shared/model/dataFetchingAdapter';

import { TCatalogState, TCatalogSubjectInfo } from './types';

export const useCatalogStateAdapter = (externalState?: Partial<TCatalogState>, deps = []) => {
  const subjectInfo = useDataFetchingStateAdapter<TCatalogSubjectInfo>(externalState?.subjectInfo, deps);

  return useMemo(() => ({
    subjectInfo,
  }), []); // eslint-disable-line
};

export type TCatalogAdapter = ReturnType<typeof useCatalogStateAdapter>;
