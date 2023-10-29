import { createSlice } from '@reduxjs/toolkit';

import { TStoreReducers } from 'shared/utils/types';

import { SliceRegistry } from './registry';
import { generateKeyWithPrefix } from './utils';
import { TActionPayload } from './types';

export type TCreateSliceParams<D extends Record<string, unknown>> = {
  name: string;
  sliceSelector: (arg0: any) => D;
  initialState: D;
  externalReducers?: Partial<TStoreReducers<D, TActionPayload<D>>>;
};

export const createStoreSlice = <D extends Record<string, unknown>>({
  name,
  initialState,
  sliceSelector,
  externalReducers = {},
}: TCreateSliceParams<D>) => {
  const registry = SliceRegistry.getRegistry();
  const reducers = Object.keys(initialState).reduce((acc, key) => ({
    ...acc,
    [generateKeyWithPrefix('set', key)]: (state: any, action: any) => {
      state[key] = action.payload;
    },
  }), {
    setState: (state: any, action: any) => {
      Object.keys(initialState).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
    cleanState: (state: any) => {
      Object.entries(initialState).forEach(([key, value]) => {
        state[key] = value;
      });
    },
  } as TStoreReducers<D, TActionPayload<D>>);

  const { actions, reducer } = createSlice({
    initialState,
    name,
    reducers: {
      ...reducers,
      ...(externalReducers as TStoreReducers<D, TActionPayload<D>>),
    },
  });

  registry.registerSelector(name, sliceSelector);
  registry.registerActions(name, actions);

  return reducer;
}
