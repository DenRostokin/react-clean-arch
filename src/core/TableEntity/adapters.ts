import { useMemo, useEffect } from 'react';

import { useLocalState } from 'utils/useLocalState';
import { useFirstRender } from 'utils/useFirstRender';

import { getTableReducers } from './reducers';
import { getTableSelectors } from './selectors';
import { TABLE_INITIAL_STATE } from './consts';
import { TTableState, TTableDataExtension } from './types';

export const useTableStateAdapter = <D extends TTableDataExtension>(externalState: Partial<TTableState<D>> = {}, deps = []) => {
  const firstRender = useFirstRender();
  const tableReducers = getTableReducers<D>();
  const tableSelectors = getTableSelectors<D>();
  const initialState = useMemo(() => ({
    ...TABLE_INITIAL_STATE,
    ...externalState
  }), [externalState]);
  const { actions, useSelector, getState } = useLocalState({
    initialState,
    reducers: tableReducers
  });

  const selectors = useMemo(() => ({
    useData() {
      return useSelector(tableSelectors.selectData);
    },
    useColumns() {
      return useSelector(tableSelectors.selectColumns);
    },
    useHiddenColumns() {
      return useSelector(tableSelectors.selectHiddenColumns);
    },
    useSettingsOpened() {
      return useSelector(tableSelectors.selectSettingsOpened);
    }
  }), []); // eslint-disable-line

  useEffect(() => {
    if (!firstRender.current) {
      actions.setState(initialState);
    }
  }, deps); // eslint-disable-line

  return useMemo(() => ({
    actions,
    selectors,
    getState
  }), []); // eslint-disable-line
};

export type TTableAdapter<D extends TTableDataExtension> = ReturnType<typeof useTableStateAdapter<D>>;
