import { useCallback, useMemo, useEffect, useRef, useReducer, useState } from 'react';

import { TStateReducers, TAction, TStateActions } from 'types';

import { useEmitter } from './useEmitter';
import { useFirstRender } from './useFirstRender';

export type TUseLocalStateParams<S extends Record<string, unknown>, P extends Record<string, unknown>> = {
  initialState: S;
  reducers: TStateReducers<S, P>;
}

type TLocalStateRegistry<S extends Record<string, unknown>> = {
  changeState: (arg0: S) => void;
}

const useLocalReducer = <S extends Record<string, unknown>, P extends Record<string, unknown>>(reducers: TStateReducers<S, P>) => {
  return useCallback((state: S, action: TAction<keyof P, P[keyof P]>) => {
    if (!(action.type in reducers)) {
      return state;
    }

    return reducers[action.type](state, action);
  }, []); // eslint-disable-line
};

export const useLocalState = <S extends Record<string, unknown>, P extends Record<string, unknown>>({
  initialState,
  reducers
}: TUseLocalStateParams<S, P>) => {
  const { emit, subscribe } = useEmitter<TLocalStateRegistry<S>>();
  const reducer = useLocalReducer(reducers);
  const [state, dispatch] = useReducer(reducer, initialState);
  const stateRef = useRef(state);
  const firstRender = useFirstRender();

  useEffect(() => {
    if (!firstRender.current) {
      stateRef.current = state;

      emit('changeState', state);
    }
  }, [state]); // eslint-disable-line

  const getState = useCallback(() => {
    return stateRef.current;
  }, []);

  type TSelector<R> = (arg0: S) => R;

  const useSelector = useCallback(function useSelector<R>(selector: TSelector<R>) {
    const [selectorState, setSelectorState] = useState(selector(getState()));

    useEffect(() => subscribe(
      'changeState',
      (newState) => setSelectorState(selector(newState))
    ), [selector]);

    return selectorState;
  }, []); // eslint-disable-line

  const actions = useMemo(() => {
    return (Object.keys(reducers)).reduce((acc, type: keyof P) => ({
      ...acc,
      [type]: (payload: P[keyof P]) => {
        dispatch({
          type,
          payload
        });
      }
    }), {} as TStateActions<P>);
  }, []); // eslint-disable-line

  return useMemo(() => ({
    getState,
    useSelector,
    actions
  }), []) // eslint-disable-line
};
