import { useCallback, useMemo } from 'react';
import noop from 'lodash/noop';

import { TTableMethodParams } from './types';

const useSettingsOpener = ({ actions, emit }: TTableMethodParams) => {
  return useCallback((value: boolean) => {
    actions.changeSettingsOpened(value);

    emit('openSettings', value);
  }, [emit, actions]);
};

export const useTableMethods = (methodParams: TTableMethodParams) => {
  const openSettings = useSettingsOpener(methodParams);

  return useMemo(() => ({
    openSettings
  }), [openSettings]);
};

export type TTableMethods = ReturnType<typeof useTableMethods>;

export const DEFAULT_METHODS_CONTEXT: TTableMethods = {
  openSettings: noop,
};
