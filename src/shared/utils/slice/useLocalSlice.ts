import { useMemo } from 'react';

import { useLocalState } from 'shared/utils/localState';
import { TStateReducers } from 'shared/utils/types';

import { useSelectors } from './useSelectors';
import { generateKeyWithPrefix } from './utils';
import { TActionPayload } from './types';

export const useLocalSlice = <D extends Record<string, unknown>>(initialState: D, externalReducers: Partial<TStateReducers<D, TActionPayload<D>>> = {})  => {
  const reducers = useMemo(() => {
    return Object.keys(initialState).reduce((acc, key) => ({
      ...acc,
      [generateKeyWithPrefix('set', key)]: (state: D, action: any) => ({
        ...state,
        [key]: action.payload
      })
    }), {
      setState: (_, action) => action.payload,
      cleanState: () => initialState,
    } as TStateReducers<D, TActionPayload<D>>)
  }, []); // eslint-disable-line

  const { actions, getState, useSelector } = useLocalState({
    initialState,
    reducers: {
      ...reducers,
      ...externalReducers,
    }
  });

  const selectors = useSelectors(initialState, useSelector);

  return useMemo(() => ({
    actions,
    selectors,
    getState
  }), []); // eslint-disable-line
}

export type TSlice<D extends Record<string, unknown>> = ReturnType<typeof useLocalSlice<D>>;
