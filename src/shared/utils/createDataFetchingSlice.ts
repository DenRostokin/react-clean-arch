import { createSlice } from '@reduxjs/toolkit';

import { TDataFetchingState, DATA_FETCHING_INITIAL_STATE, getDataFetchingStoreReducers } from 'shared/model/dataFetchingAdapter';

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
