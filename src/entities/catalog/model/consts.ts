import { DATA_FETCHING_INITIAL_STATE, DEFAULT_DATA_FETCHING_ADAPTER } from 'shared/utils/dataFetchingAdapter';

import { TCatalog } from './entity';
import { TCatalogState } from './types';

export const CATALOG_INITIAL_STATE: TCatalogState = {
  subjectInfo: DATA_FETCHING_INITIAL_STATE,
}

export const CATALOG_DEFAULT_CONTEXT: TCatalog = {
  getState: () => CATALOG_INITIAL_STATE,
  subjectInfoSelectors: DEFAULT_DATA_FETCHING_ADAPTER.selectors,
  fetchSubjectInfo: async () => undefined,
};

export const SUBJECT_INFO_SLICE_NAME = 'catalogSubjectInfo';
