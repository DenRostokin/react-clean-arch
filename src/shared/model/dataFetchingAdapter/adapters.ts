import { useMemo, useEffect, useCallback } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import { useFirstRender } from 'shared/utils/useFirstRender';
import { useLocalState } from 'shared/utils/useLocalState';

import { getDataFetchingStateReducers } from './reducers';
import { getDataFetchingSelectors, useDataFetchingStoreSelectors } from './selectors';
import { DATA_FETCHING_INITIAL_STATE } from './consts';
import { DataFetchingRegistry } from './registry';
import { TDataFetchingState, TDataFetchingAdapter } from './types';

export const useDataFetchingStateAdapter = <D>(externalState?: Partial<TDataFetchingState<D>>, deps = []): TDataFetchingAdapter<D> => {
  const isFirstRender = useFirstRender();
  const reducers = getDataFetchingStateReducers<D>();
  const rawSelectors = getDataFetchingSelectors<D>();
  const initialState = {
    ...DATA_FETCHING_INITIAL_STATE,
    ...externalState
  };
  const { actions, getState, useSelector } = useLocalState({
    initialState,
    reducers
  });

  const selectors = useMemo(() => ({
    useData() {
      return useSelector(rawSelectors.selectData);
    },
    useFetchingFlags() {
      const initialized = useSelector(rawSelectors.selectInitialized);
      const loading = useSelector(rawSelectors.selectLoading);

      return { initialized, loading };
    },
    useError() {
      return useSelector(rawSelectors.selectError);
    }
  }), []); // eslint-disable-line

  useEffect(() => {
    if (externalState && !isFirstRender.current) {
      actions.setState(initialState);
    }
  }, deps); // eslint-disable-line

  return useMemo(() => ({
    actions,
    selectors,
    getState
  }), []); // eslint-disable-line
};

export const useDataFetchingStoreAdapter = <D>(name: string): TDataFetchingAdapter<D> => {
  const store = useStore();
  const dispatch = useDispatch();
  const registry = DataFetchingRegistry.getRegistry();
  const selector = registry.getSelector<D>(name);
  const selectors = useDataFetchingStoreSelectors(selector);
  const actions = bindActionCreators(registry.getActions<D>(name), dispatch);

  const getState = useCallback(() => selector(store.getState()), []); // eslint-disable-line

  return useMemo(() => ({
    actions,
    selectors,
    getState,
  }), []); // eslint-disable-line
};
