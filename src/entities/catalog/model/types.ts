import { TDataFetchingState } from 'shared/model/dataFetchingAdapter';
import { TApiService } from 'shared/model/apiService';

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
