import { useMemo, useReducer, useEffect } from 'react';

import { useFirstRender } from 'utils/useFirstRender';

import { useTableReducer } from './reducer';
import { useTableSelectors } from './selectors';
import { useTableActions } from './actions';
import { TABLE_INITIAL_STATE, TTableState } from './consts';
import { TStateAdapter, EActionType } from './types';

export const useLocalAdapter = (externalState?: TTableState, deps = []): TStateAdapter => {
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
