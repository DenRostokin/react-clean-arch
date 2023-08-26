import { TEmitterType } from 'utils/useEmitter';

import { TTableAdapter } from './adapters';
import { TTableRegistry, TTableHiddenColumns } from './types';

export type TTableMethodsParams<D extends Record<string, unknown>> = Omit<TTableAdapter<D>, 'selectors'> & Omit<TEmitterType<TTableRegistry<D>>, 'useRenderingSubscription'>;

const getSettingsOpener = <D extends Record<string, unknown>>({ actions, emit }: TTableMethodsParams<D>) => {
  return (value: boolean) => {
    actions.setSettingsOpened(value);

    emit('openSettings', value);
  };
};

const getHiddenColumnsSetter = <D extends Record<string, unknown>>({ actions, emit }: TTableMethodsParams<D>) => {
  return (value: TTableHiddenColumns<D>) => {
    actions.setHiddenColumns(value);

    emit('hideColumns', value);
  };
};

export const getTableMethods = <D extends Record<string, unknown>>(params: TTableMethodsParams<D>) => {
  const openSettings = getSettingsOpener(params);
  const hideColumns = getHiddenColumnsSetter(params);

  return {
    setData: params.actions.setData,
    setColumns: params.actions.setColumns,
    openSettings,
    hideColumns,
  };
};

export type TTableMethods<D extends Record<string, unknown>> = ReturnType<typeof getTableMethods<D>>;
