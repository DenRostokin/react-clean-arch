import { createDataFetchingSlice } from 'shared/utils/createDataFetchingSlice';

import { TCatalogSubjectInfo } from 'entities/catalog/model';

export const subjectInfoSlice = createDataFetchingSlice<TCatalogSubjectInfo>({
  name: 'catalogSubjectInfo'
});
