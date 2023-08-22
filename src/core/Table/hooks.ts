import { useMemo, useReducer, useEffect } from 'react';

import { useEntity } from 'utils/useEntity';
import { useFirstRender } from 'utils/useFirstRender';

import { TTableRegistry, TStateAdapter, EActionType } from './types';
import { TABLE_INITIAL_STATE, TTableState } from './consts';
import { useTableReducer } from './reducer';
import { useTableSelectors } from './selectors';
import { useTableActions } from './actions';
import { useTableMethods } from './methods';

const useLocalAdapter = (externalState?: TTableState, deps = []): TStateAdapter => {
  const isFirstRender = useFirstRender();
  const tableReducer = useTableReducer();
  const [state, dispatch] = useReducer(tableReducer, externalState || TABLE_INITIAL_STATE);
  const selectors = useTableSelectors(state);
  const actions = useTableActions(dispatch, selectors);

  useEffect(() => {
    if (externalState && !isFirstRender.current) {
      dispatch({
        type: EActionType.SET_STATE,
        payload: externalState
      });
    }
  }, [deps]); // eslint-disable-line

  return useMemo(() => ({
    actions,
    selectors,
  }), [actions, selectors]);
};

export const useTable = (stateAdapter: TStateAdapter) => {
  const entity = useEntity<TTableRegistry>();
  const methods = useTableMethods({
    ...stateAdapter,
    ...entity
  });

  return useMemo(() => ({
    ...methods,
    ...entity,
    ...stateAdapter.selectors,
  }), [stateAdapter.selectors, entity, methods]);
};

export type TTable = ReturnType<typeof useTable>;

export const useLocalTable = (externalTable?: TTable, deps = []) => {
  const externalState = externalTable?.selectState();
  const stateAdapter = useLocalAdapter(externalState, deps);

  return useTable(stateAdapter);
};
