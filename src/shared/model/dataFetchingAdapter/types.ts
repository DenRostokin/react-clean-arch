import { ApiException } from 'shared/exceptions';
import { TStateActions } from 'shared/types';

export type TDataFetchingStateData<D> = D | null;
export type TDataFetchingStateError<E> = E | null;

export type TDataFetchingState<D> = {
  data: TDataFetchingStateData<D>;
  loading: boolean;
  initialized: boolean;
  error: TDataFetchingStateError<ApiException>;
}

export const enum EDataFetchingAction {
  SET_STATE = 'setState',
  CLEAN_STATE = 'cleanState',
  SET_DATA = 'setData',
  SET_LOADING = 'setLoading',
  SET_INITIALIZED = 'setInitialized',
  SET_ERROR = 'setError'
};

export type TActionPayload<D> = {
  [EDataFetchingAction.SET_STATE]: TDataFetchingState<D>;
  [EDataFetchingAction.CLEAN_STATE]: void;
  [EDataFetchingAction.SET_DATA]: TDataFetchingStateData<D>;
  [EDataFetchingAction.SET_INITIALIZED]: boolean;
  [EDataFetchingAction.SET_LOADING]: boolean;
  [EDataFetchingAction.SET_ERROR]: TDataFetchingStateError<ApiException>;
}

export type TDataFetchingActions<D> = TStateActions<TActionPayload<D>>;

export type TDataFetchingSelectors<D> = {
  selectState: (state: TDataFetchingState<D>) => TDataFetchingState<D>;
  selectData: (state: TDataFetchingState<D>) => TDataFetchingStateData<D>;
  selectLoading: (state: TDataFetchingState<D>) => boolean;
  selectInitialized: (state: TDataFetchingState<D>) => boolean;
  selectError: (state: TDataFetchingState<D>) => TDataFetchingStateError<ApiException>;
}

export type TDataFetchingSelectorHooks<D> = {
  useData(): TDataFetchingStateData<D>;
  useFetchingFlags(): {
    loading: boolean;
    initialized: boolean;
  };
  useError(): TDataFetchingStateError<ApiException>;
}

export type TDataFetchingAdapter<D> = {
  actions: TStateActions<TActionPayload<D>>;
  selectors: TDataFetchingSelectorHooks<D>;
  getState(): TDataFetchingState<D>;
}
