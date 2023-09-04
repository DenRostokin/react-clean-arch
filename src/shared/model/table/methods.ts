import { TEmitterType } from 'shared/utils/useEmitter';

import { TTableAdapter } from './adapters';
import { TTableRegistry, TTableHiddenColumns, TTableDataExtension } from './types';

export type TTableMethodsParams<D extends TTableDataExtension> = Omit<TTableAdapter<D>, 'selectors'> & Omit<TEmitterType<TTableRegistry<D>>, 'useRenderingSubscription'>;

const getSettingsOpener = <D extends TTableDataExtension>({ actions, emit }: TTableMethodsParams<D>) => {
  return (value: boolean) => {
    actions.setSettingsOpened(value);

    emit('openSettings', value);
  };
};

const getHiddenColumnsSetter = <D extends TTableDataExtension>({ actions, emit }: TTableMethodsParams<D>) => {
  return (value: TTableHiddenColumns<D>) => {
    actions.setHiddenColumns(value);

    emit('hideColumns', value);
  };
};

export const getTableMethods = <D extends TTableDataExtension>(params: TTableMethodsParams<D>) => {
  const openSettings = getSettingsOpener(params);
  const hideColumns = getHiddenColumnsSetter(params);

  return {
    setData: params.actions.setData,
    setColumns: params.actions.setColumns,
    openSettings,
    hideColumns,
  };
};

export type TTableMethods<D extends TTableDataExtension> = ReturnType<typeof getTableMethods<D>>;
