/// <reference types="react-scripts" />

// "any" usage explanation: Typescript's Parameters utility doesn't work with the "Function" type, only works with the type which described below
type TBaseHandler<R = any> = (...args: any) => R;
