import { useMemo, useCallback } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import { useLocalSlice, useSliceUpdate } from 'shared/utils/slice';
import { DeepPartial } from 'shared/utils/types';

import {
  useDataFetchingStoreSelectors,
  useDataFetchingSelectors,
} from './selectors';
import { DATA_FETCHING_INITIAL_STATE } from './consts';
import { DataFetchingRegistry } from './registry';
import { TDataFetchingState, TDataFetchingAdapter } from './types';

export const useDataFetchingStateAdapter = <D>(
  externalState?: Partial<TDataFetchingState<D>>,
  deps = [],
): TDataFetchingAdapter<D> => {
  const dataFetchingSlice = useLocalSlice<TDataFetchingState<D>>({
    ...DATA_FETCHING_INITIAL_STATE,
    ...externalState,
  });
  const selectors = useDataFetchingSelectors(dataFetchingSlice);

  useSliceUpdate(
    dataFetchingSlice,
    externalState as DeepPartial<TDataFetchingState<D>>,
    deps
  );

  return useMemo(() => ({
    ...dataFetchingSlice,
    selectors,
  }), []); // eslint-disable-line
};

export const useDataFetchingStoreAdapter = <D>(
  name: string,
): TDataFetchingAdapter<D> => {
  const store = useStore();
  const dispatch = useDispatch();
  const registry = DataFetchingRegistry.getRegistry();
  const selector = registry.getSelector<D>(name);
  const selectors = useDataFetchingStoreSelectors(selector);
  const actions = bindActionCreators(registry.getActions<D>(name), dispatch);

  const getState = useCallback(() => selector(store.getState()), []); // eslint-disable-line

  return useMemo(
    () => ({
      actions,
      selectors,
      getState,
    }),
    [], // eslint-disable-line
  );
};
