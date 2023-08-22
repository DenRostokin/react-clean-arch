import { useCallback, useMemo, useReducer } from 'react';

import { TRegistryEmitter } from 'utils/useRegistry';
import { useEntity } from 'utils/useEntity';
// import { ApiServiceContext } from 'utils/useApiService';

import { TTableRegistry, EActionType, TTableActions, TStateAdapter } from './types';
import { TABLE_INITIAL_STATE } from './consts';
import { tableReducer } from './reducer';
import * as commonSelectors from './selectors';

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

const useLocalStateAdapter = (): TStateAdapter => {
  const [state, dispatch] = useReducer(tableReducer, TABLE_INITIAL_STATE);

  const selectSettingsOpened = useCallback(() => {
    return commonSelectors.selectSettingsOpened(state);
  }, [state]);

  const changeSettingsOpened = useCallback((value: boolean) => {
    dispatch({
      type: EActionType.CHANGE_SETTINGS_OPENED,
      payload: value
    });
  }, [dispatch]);

  return useMemo(() => ({
    actions: {
      changeSettingsOpened
    },
    selectors: {
      selectSettingsOpened
    }
  }), [changeSettingsOpened, selectSettingsOpened]);
};
//
// const useStoreActionsWithSelectors = () => {
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

export const useLocalStateTable = () => {
  const stateAdapter = useLocalStateAdapter();

  return useTable(stateAdapter);
};

export type TTable = ReturnType<typeof useTable>;
