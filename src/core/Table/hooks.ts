import { useCallback, useMemo, useReducer, useEffect } from 'react';

import { TRegistryEmitter } from 'utils/useRegistry';
import { useEntity } from 'utils/useEntity';
import { useFirstRender } from 'utils/useFirstRender';
// import { ApiServiceContext } from 'utils/useApiService';

import { TTableRegistry, TTableActions, TStateAdapter, EActionType } from './types';
import { TABLE_INITIAL_STATE, TTableState } from './consts';
import { useTableReducer } from './reducer';
import { useTableSelectors } from './selectors';
import { useTableActions } from './actions';

const useSettingsOpener = ({ actions, emit }: {
  actions: TTableActions;
  emit: TRegistryEmitter<TTableRegistry>;
}) => {
  return useCallback((value: boolean) => {
    actions.changeSettingsOpened(value);

    emit('openSettings', value);
  }, [emit, actions]);
};

// const useTableDataFetcher = () => {
//   const apiService = useContext(ApiServiceContext);
//
//   return useCallback(() => {
//     return apiService();
//   }, [apiService]);
// };

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

export const useTable = ({ actions, selectors }: TStateAdapter) => {
  const { emit, ...entity } = useEntity<TTableRegistry>();
  const openSettings = useSettingsOpener({ actions, emit });

  return useMemo(() => ({
    openSettings,
    emit,
    ...entity,
    ...selectors,
  }), [openSettings, selectors]); // eslint-disable-line
};

export type TTable = ReturnType<typeof useTable>;

export const useLocalTable = (externalTable?: TTable, deps = []) => {
  const externalState = externalTable?.selectState();
  const stateAdapter = useLocalAdapter(externalState, deps);

  return useTable(stateAdapter);
};
