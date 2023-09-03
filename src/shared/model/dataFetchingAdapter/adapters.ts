import { useMemo, useEffect } from 'react';

import { useFirstRender } from 'shared/utils/useFirstRender';
import { useLocalState } from 'shared/utils/useLocalState';

import { getDataFetchingStateReducers } from './reducers';
import { getDataFetchingSelectors } from './selectors';
import { DATA_FETCHING_INITIAL_STATE } from './consts';
import { TDataFetchingState } from './types';

export const useDataFetchingStateAdapter = <D>(externalState?: Partial<TDataFetchingState<D>>, deps = []) => {
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

export type TDataFetchingAdapter<D> = ReturnType<typeof useDataFetchingStateAdapter<D>>;