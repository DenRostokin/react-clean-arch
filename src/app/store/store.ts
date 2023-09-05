import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { createDataFetchingSlice } from 'shared/model/dataFetchingAdapter';
import { SUBJECT_INFO_SLICE_NAME, TCatalogSubjectInfo } from 'entities/catalog/model';

import { TRootState } from './types';

const catalogReducer = combineReducers({
  subjectInfo: createDataFetchingSlice<TRootState, TCatalogSubjectInfo>({
    name: SUBJECT_INFO_SLICE_NAME,
    sliceSelector: (state) => state.catalog.subjectInfo
  }),
});

export const store = configureStore({
  reducer: {
    catalog: catalogReducer
  }
});
