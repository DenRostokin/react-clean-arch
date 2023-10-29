import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { TSlice } from 'shared/utils/slice';

import {
  TDataFetchingSelectors,
  TDataFetchingState,
  TDataFetchingSelectorHooks,
} from './types';

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

export const getDataFetchingSelectors = <D>(): TDataFetchingSelectors<D> => ({
  selectState: (state) => state,
  selectData: (state) => state.data,
  selectInitialized: (state) => state.initialized,
  selectLoading: (state) => state.loading,
  selectError: (state) => state.error,
});

type TStoreSelector<S extends Record<string, unknown>, D> = (
  state: S,
) => TDataFetchingState<D>;

export const useDataFetchingStoreSelectors = <
S extends Record<string, unknown>,
D,
>(
  storeSelector: TStoreSelector<S, D>,
): TDataFetchingSelectorHooks<D> => {
  const dataFetchingSelectors = getDataFetchingSelectors<D>();

  return useMemo(
    () => ({
      useData() {
        return useSelector(
          createSelector(storeSelector, dataFetchingSelectors.selectData),
        );
      },
      useFetchingFlags() {
        return useSelector(
          createSelector(storeSelector, (state: TDataFetchingState<D>) => ({
            loading: dataFetchingSelectors.selectLoading(state),
            initialized: dataFetchingSelectors.selectInitialized(state),
          })),
        );
      },
      useError() {
        return useSelector(
          createSelector(storeSelector, dataFetchingSelectors.selectError),
        );
      },
    }),
    [], // eslint-disable-line
  );
};
