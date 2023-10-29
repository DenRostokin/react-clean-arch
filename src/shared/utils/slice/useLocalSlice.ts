import { useMemo } from 'react';

import { useLocalState } from 'shared/utils/localState';
import { TStateReducers } from 'shared/utils/types';

type TActionPayload<D extends Record<string, unknown>> = {
  [P in keyof D as `set${Capitalize<string & P>}`]: D[P];
} & {
  setState: D;
};

type TSelectorHooks<D extends Record<string, unknown>> = {
  [P in keyof D as `use${Capitalize<string & P>}`]: () => D[P];
} & {
  useState: () => D;
}

const generateKeyWithPrefix = (prefix: string, key: string) => prefix + key.charAt(0).toUpperCase() + key.slice(1);

export const useLocalSlice = <D extends Record<string, unknown>>(initialSlice: D, externalReducers?: TStateReducers<D, TActionPayload<D>>)  => {
  const reducers = useMemo(() => {
    return Object.keys(initialSlice).reduce((acc, key) => ({
      ...acc,
      [generateKeyWithPrefix('set', key)]: (state: D, action: any) => ({
        ...state,
        [key]: action.payload
      })
    }), {
      setState: (_, action) => action.payload,
    } as TStateReducers<D, TActionPayload<D>>)
  }, []); // eslint-disable-line

  const { actions, getState, useSelector } = useLocalState({
    initialState: initialSlice,
    reducers: {
      ...reducers,
      ...(externalReducers || {})
    }
  });

  const selectors = useMemo(() => {
    return Object.keys(initialSlice).reduce((acc, key) => ({
      ...acc,
      // eslint-disable-next-line
      [generateKeyWithPrefix('use', key)]: () => useSelector((state) => state[key]),
    }), {
      useState: () => useSelector((state) => state),
    } as TSelectorHooks<D>)
  }, []); // eslint-disable-line

  return useMemo(() => (
    { actions, selectors, getState }
  ), []); // eslint-disable-line
}

export type TSlice<D extends Record<string, unknown>> = ReturnType<typeof useLocalSlice<D>>;
