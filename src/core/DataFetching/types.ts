export type TDataFetchingStateData<D> = D | null;
export type TDataFetchingStateError<E> = E | null;

export type TDataFetchingState<D> = {
  data: TDataFetchingStateData<D>;
  loading: boolean;
  initialized: boolean;
  error: TDataFetchingStateError<Error>;
}

export const enum EDataFetchingAction {
  SET_STATE = 'setState',
  SET_DATA = 'setData',
  SET_LOADING = 'selLoading',
  SET_INITIALIZED = 'setInitialized',
  SET_ERROR = 'setError'
};

export type TActionPayload<D> = {
  [EDataFetchingAction.SET_STATE]: TDataFetchingState<D>;
  [EDataFetchingAction.SET_DATA]: TDataFetchingStateData<D>;
  [EDataFetchingAction.SET_INITIALIZED]: boolean;
  [EDataFetchingAction.SET_LOADING]: boolean;
  [EDataFetchingAction.SET_ERROR]: TDataFetchingStateError<Error>;
}

export type TDataFetchingSelectors<D> = {
  selectState: (state: TDataFetchingState<D>) => TDataFetchingState<D>;
  selectData: (state: TDataFetchingState<D>) => TDataFetchingStateData<D>;
  selectLoading: (state: TDataFetchingState<D>) => boolean;
  selectInitialized: (state: TDataFetchingState<D>) => boolean;
  selectError: (state: TDataFetchingState<D>) => TDataFetchingStateError<Error>;
}
