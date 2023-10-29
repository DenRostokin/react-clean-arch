import { ApiException } from 'shared/utils/exceptions';

export type TDataFetchingStateData<D> = D | null;
export type TDataFetchingStateError<E> = E | null;

export type TDataFetchingState<D> = {
  data: TDataFetchingStateData<D>;
  loading: boolean;
  initialized: boolean;
  error: TDataFetchingStateError<ApiException>;
};
