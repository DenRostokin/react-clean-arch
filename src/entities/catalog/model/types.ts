import { TDataFetchingState } from 'shared/utils/dataFetchingAdapter';
import { TApiService } from 'shared/utils/apiService';

import { TCatalogAdapter } from './adapters';

export type TCatalogSubjectInfo = {
  id: string;
  info: string;
}

export type TCatalogState = {
  subjectInfo: TDataFetchingState<TCatalogSubjectInfo>;
}

export type TCatalogGetState = () => TCatalogState;

export type TCatalogMethodsParams = TCatalogAdapter & {
  getState: TCatalogGetState;
  apiService: TApiService;
}
