import { useMemo } from 'react';

import { TSlice } from 'shared/utils/slice';

import { TDataFetchingState } from './types';

export const useDataFetchingSelectors = <D>(slice: TSlice<TDataFetchingState<D>>) => {
  return useMemo(() => ({
    useData: slice.selectors.useData,
    useError: slice.selectors.useError,
    useFetchingFlags() {
      const loading = slice.selectors.useLoading();
      const initialized = slice.selectors.useInitialized();

      return { loading, initialized };
    }
  }), []); // eslint-disable-line
}
