import { combineReducers } from '@reduxjs/toolkit';

import { TCatalogState } from 'entities/catalog/model';

import { subjectInfoSlice } from './slices';

export const reducer = combineReducers<TCatalogState>({
  subjectInfo: subjectInfoSlice.reducer,
});

