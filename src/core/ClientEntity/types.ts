import { TDataFetchingState, TDataFetchingLocalAdapter } from 'core/DataFetchingAdapter';

export type TClientData = {
  id: string;
  name: string;
  age: string;
}

export type TClientState = {
  clientList: TDataFetchingState<TClientData[]>;
  clientInfo: TDataFetchingState<TClientData>;
}

export type TClientStateAdapter = {
  clientList: TDataFetchingLocalAdapter<TClientData[]>;
  clientInfo: TDataFetchingLocalAdapter<TClientData>;
}
