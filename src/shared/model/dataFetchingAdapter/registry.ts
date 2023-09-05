import { TDataFetchingState, TDataFetchingStateActions } from './types';

type TDataFetchingSelector<S, D> = (arg0: S) => TDataFetchingState<D>;

export class DataFetchingRegistry<S> {
  private static instance: DataFetchingRegistry<unknown>;
  private _selectors: Record<string, TDataFetchingSelector<S, any>> = {};
  private _actions: Record<string, TDataFetchingStateActions<any>> = {};

  private constructor() {}

  public static getRegistry<S>() {
    if (!DataFetchingRegistry.instance) {
      DataFetchingRegistry.instance = new DataFetchingRegistry();
    }

    return DataFetchingRegistry.instance as DataFetchingRegistry<S>;
  }

  public registerSelector<D>(name: string, selector: TDataFetchingSelector<S, D>) {
    this._selectors[name] = selector;
  }

  public registerActions<D>(name: string, actions: TDataFetchingStateActions<D>) {
    this._actions[name] = actions;
  }

  public getSelector<D>(name: string) {
    if (!(name in this._selectors)) {
      throw new Error(`Selector "${name}" isn't found!`);
    }

    return this._selectors[name] as TDataFetchingSelector<S, D>;
  }

  public getActions<D>(name: string) {
    if (!(name in this._actions)) {
      throw new Error(`Actions "${name}" aren't found!`);
    }

    return this._actions[name] as TDataFetchingStateActions<D>;
  }
}
