import { CaseReducer, PayloadAction, Draft } from "@reduxjs/toolkit";

// "any" usage explanation: Typescript's Parameters utility doesn't work with the "Function" type, only works with the type which described below
export type TBaseHandler<R = any> = (...args: any[]) => R;

export type TAction<T, P> = {
  type: T;
  payload: P;
}

export type TStateReducers<S extends Record<string, unknown>, P extends Record<string, unknown>> = {
  [Property in keyof P]: (arg0: S, arg1: TAction<Property, P[Property]>) => S;
}

export type TStateActions<P extends Record<string, unknown>> = {
  [Property in keyof P]: (arg0: P[Property]) => void;
}

export type TStoreReducers<S extends Record<string, unknown>, P extends Record<string, unknown>> = {
  [Property in keyof P]: CaseReducer<S, PayloadAction<Draft<P[Property]>, string>>;
}

export type TTheme = 'light' | 'dark';

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}
