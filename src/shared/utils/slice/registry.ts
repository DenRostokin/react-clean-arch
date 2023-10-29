import { TStateActions } from 'shared/utils/types';

import { TActionPayload } from './types';

type TSliceSelector<D extends Record<string, unknown>> = (arg0: any) => D;

export class SliceRegistry {
  private static instance: SliceRegistry;
  private _selectors: Record<string, any> = {};
  private _actions: Record<string, any> = {};

  private constructor() {}

  public static getRegistry() {
    if (!SliceRegistry.instance) {
      SliceRegistry.instance = new SliceRegistry();
    }

    return SliceRegistry.instance;
  }

  public registerSelector(
    name: string,
    selector: any,
  ) {
    if (name in this._selectors) {
      throw new Error(`Selectors "${name}" are already registered. The name "${name}" was already used in an another call of the "createSlice"`);
    }

    this._selectors[name] = selector;
  }

  public registerActions(
    name: string,
    actions: any,
  ) {
    if (name in this._actions) {
      throw new Error(`Actions "${name}" are already registered. The name "${name}" was already used in an another call of the "createSlice"`);
    }

    this._actions[name] = actions;
  }

  public getSelector<D extends Record<string, unknown>>(name: string) {
    if (!(name in this._selectors)) {
      throw new Error(`Selector "${name}" isn't found! You probably forget to create a store slice with the "createSlice" function.`);
    }

    return this._selectors[name] as TSliceSelector<D>;
  }

  public getActions<D extends Record<string, unknown>>(name: string) {
    if (!(name in this._actions)) {
      throw new Error(`Actions "${name}" aren't found! You probably forget to create a store slice with the "createSlice" function.`);
    }

    return this._actions[name] as TStateActions<TActionPayload<D>>;
  }
}
