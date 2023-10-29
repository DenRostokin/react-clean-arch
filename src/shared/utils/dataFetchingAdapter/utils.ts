import { ApiException } from 'shared/utils/exceptions';
import { TBaseHandler, TStateActions } from 'shared/utils/types';
import { createStoreSlice } from 'shared/utils/slice';

import { DATA_FETCHING_INITIAL_STATE } from './consts';
import { TDataFetchingState, TDataFetchingStateData, TDataFetchingStateError } from './types';

type TCreateFetchingSliceParams<D> = {
  name: string;
  sliceSelector: (arg0: any) => TDataFetchingState<D>;
  initialState?: Partial<TDataFetchingState<D>>;
};

export const createDataFetchingSlice = <D>({
  name,
  sliceSelector,
  initialState,
}: TCreateFetchingSliceParams<D>) => {
  return createStoreSlice({
    name,
    initialState: {
      ...DATA_FETCHING_INITIAL_STATE,
      ...initialState,
    },
    sliceSelector
  });
};

type TResponse<F> = F extends (...args: any) => infer R ? Awaited<R> : never;

type TRequestParams<F> = F extends () => any
  ? void
  : F extends (arg0: infer P) => any
  ? P
  : never;

type TActionPayload<D> = {
  setState: TDataFetchingState<D>;
  cleanState: void;
  setData: TDataFetchingStateData<D>;
  setInitialized: boolean;
  setLoading: boolean;
  setError: TDataFetchingStateError<ApiException>;
};

type TDataFetchingStateActions<D> = TStateActions<TActionPayload<D>>;

export const bindRequestToActions = <F extends TBaseHandler<Promise<any>>>(
  request: F,
  actions: TDataFetchingStateActions<TResponse<F>>,
) => {
  return async (params: TRequestParams<F>) => {
    actions.setLoading(true);

    try {
      const response = await request(params);

      actions.setData(response);
      actions.setError(null);
    } catch (error) {
      actions.setError(error as ApiException);
    } finally {
      actions.setInitialized(true);
      actions.setLoading(false);
    }
  };
};
