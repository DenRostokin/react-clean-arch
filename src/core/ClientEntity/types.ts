import { TDataFetchingState, TDataFetchingAdapter } from 'core/DataFetchingAdapter';

export type TClientData = {
  id: string;
  name: string;
  age: string;
}

export type TClientState = {
  clientList: TDataFetchingState<TClientData[]>;
  clientInfo: TDataFetchingState<TClientData>;
}

export type TClientAdapter = {
  clientList: TDataFetchingAdapter<TClientData[]>;
  clientInfo: TDataFetchingAdapter<TClientData>;
}
