import { useMemo, useCallback } from 'react';
import { useDispatch, useStore, useSelector as useStoreSelector } from 'react-redux';
import { bindActionCreators, createSelector } from '@reduxjs/toolkit';

import { useSelectors } from './useSelectors';
import { SliceRegistry } from './registry';
import { TUseSelector } from './types';

export const useStoreSlice = <D extends Record<string, unknown>>(name: string, initialState: D) => {
  const store = useStore();
  const dispatch = useDispatch();
  const registry = SliceRegistry.getRegistry();
  const sliceSelector = registry.getSelector<D>(name);
  const actions = bindActionCreators(registry.getActions<D>(name), dispatch);

  const getState = useCallback(() => sliceSelector(store.getState()), []); // eslint-disable-line

  const useSelector = useCallback<TUseSelector<D>>((selector) => {
    // eslint-disable-next-line
    return useStoreSelector(
      createSelector(sliceSelector, selector)
    );
  }, []); // eslint-disable-line

  const selectors = useSelectors(initialState, useSelector);

  return useMemo(
    () => ({
      actions,
      selectors,
      getState,
    }),
    [], // eslint-disable-line
  );
}
