/// <reference types="react-scripts" />

// "any" usage explanation: Typescript's Parameters utility doesn't work with the "Function" type, only works with the type which described below
type TBaseHandler<R = any> = (...args: any) => R;

type TAction<T, P> = {
  type: T;
  payload: P;
}

type TStateReducers<S extends Record<string, unknown>, P extends Record<string, unknown>> = {
  [Property in keyof P]: (arg0: S, arg1: TAction<Property, P[Property]>) => S;
}

type TStateActions<P extends Record<string, unknown>> = {
  [Property in keyof P]: (arg0: P[Property]) => void;
}
