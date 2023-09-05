import { createSlice } from '@reduxjs/toolkit';

import { getDataFetchingStoreReducers } from './reducers';
import { DATA_FETCHING_INITIAL_STATE } from './consts';
import { DataFetchingRegistry } from './registry';
import { TDataFetchingState, TActionPayload } from './types';
import {TStateActions} from 'shared/types';

type TCreateFetchingSliceParams<S, D> = {
  name: string;
  sliceSelector: (arg0: S) => TDataFetchingState<D>;
  initialState?: Partial<TDataFetchingState<D>>;
}

export const createDataFetchingSlice = <S, D>({
  name, initialState, sliceSelector
}: TCreateFetchingSliceParams<S, D>) => {
  const reducers = getDataFetchingStoreReducers<D>();
  const registry = DataFetchingRegistry.getRegistry<S>();

  const { actions, reducer } = createSlice({
    initialState: {
      ...DATA_FETCHING_INITIAL_STATE,
      ...initialState
    },
    name,
    reducers
  });

  registry.registerSelector(name, sliceSelector);
  // TODO figure out how to type store actions to avoid the "as" custing
  registry.registerActions(name, actions as TStateActions<TActionPayload<D>>);

  return reducer;
};
