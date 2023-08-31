import { TDataFetchingState, TDataFetchingAdapter } from 'core/DataFetchingAdapter';
import { TApiService } from 'core/ApiService';

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

export type TClientGetState = () => TClientState;

export type TClientMethodsParams = TClientAdapter & {
  getState: TClientGetState;
  apiService: TApiService;
}
