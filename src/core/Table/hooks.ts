import { useCallback, useMemo, useReducer } from 'react';

import { TRegistryEmitter } from 'utils/useRegistry';
import { useEntity } from 'utils/useEntity';
// import { ApiServiceContext } from 'utils/useApiService';

import { TTableRegistry, TTableActions, TStateAdapter } from './types';
import { TABLE_INITIAL_STATE } from './consts';
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

const useLocalAdapter = (): TStateAdapter => {
  const tableReducer = useTableReducer();
  const [state, dispatch] = useReducer(tableReducer, TABLE_INITIAL_STATE);
  const selectors = useTableSelectors(state);
  const actions = useTableActions(dispatch, selectors);

  return useMemo(() => ({
    actions,
    selectors,
  }), [actions, selectors]);
};
//
// const useExternalAdapter = () => {
//
// };

const useTable = ({ actions, selectors }: TStateAdapter) => {
  const { emit, ...entity } = useEntity<TTableRegistry>();
  const openSettings = useSettingsOpener({ actions, emit });

  return useMemo(() => ({
    openSettings,
    emit,
    ...entity,
    ...selectors,
  }), [openSettings, selectors]); // eslint-disable-line
};

export const useLocalTable = () => {
  const stateAdapter = useLocalAdapter();

  return useTable(stateAdapter);
};

// export const useExternalTable = () => {
//
// };

export type TTable = ReturnType<typeof useTable>;
