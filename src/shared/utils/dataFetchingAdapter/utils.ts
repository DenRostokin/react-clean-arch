import { createSlice } from '@reduxjs/toolkit';

import { ApiException } from 'shared/utils/exceptions';
import { TBaseHandler } from 'shared/utils/types';

import { getDataFetchingStoreReducers } from './reducers';
import { DATA_FETCHING_INITIAL_STATE } from './consts';
import { DataFetchingRegistry } from './registry';
import { TDataFetchingState, TDataFetchingStateActions } from './types';

type TCreateFetchingSliceParams<S, D> = {
  name: string;
  sliceSelector: (arg0: S) => TDataFetchingState<D>;
  initialState?: Partial<TDataFetchingState<D>>;
};

export const createDataFetchingSlice = <S, D>({
  name,
  initialState,
  sliceSelector,
}: TCreateFetchingSliceParams<S, D>) => {
  const reducers = getDataFetchingStoreReducers<D>();
  const registry = DataFetchingRegistry.getRegistry<S>();

  const { actions, reducer } = createSlice({
    initialState: {
      ...DATA_FETCHING_INITIAL_STATE,
      ...initialState,
    },
    name,
    reducers,
  });

  registry.registerSelector(name, sliceSelector);
  // TODO figure out how to type store actions to avoid the "as" casting
  registry.registerActions(name, actions as TDataFetchingStateActions<D>);

  return reducer;
};

type TResponse<F> = F extends (...args: any) => infer R ? Awaited<R> : never;
type TRequestParams<F> = F extends () => any
  ? void
  : F extends (arg0: infer P) => any
  ? P
  : never;

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
