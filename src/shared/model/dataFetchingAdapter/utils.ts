import { createSlice } from '@reduxjs/toolkit';

import { getDataFetchingStoreReducers } from './reducers';
import { DATA_FETCHING_INITIAL_STATE } from './consts';
import { TDataFetchingState } from './types';

type TCreateFetchingSliceParams<D> = {
  name: string;
  initialState?: Partial<TDataFetchingState<D>>;
}

export const createDataFetchingSlice = <D>({
  name, initialState
}: TCreateFetchingSliceParams<D>) => {
  const reducers = getDataFetchingStoreReducers<D>();

  return createSlice({
    initialState: {
      ...DATA_FETCHING_INITIAL_STATE,
      ...initialState
    },
    name,
    reducers
  });
};
