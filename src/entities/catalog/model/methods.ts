import { bindRequestToActions } from 'shared/utils/bindRequestToActions';

import { TCatalogMethodsParams, TCatalogSubjectInfo } from './types';

const getSubjectInfoFetcher = ({ apiService, subjectInfo }: TCatalogMethodsParams) => {
  const requestId = Symbol('fetchSubjectInfo');

  const fetchSubjectInfo = async (id: string) => {
    const { body } = await apiService.request<TCatalogSubjectInfo>({
      id: requestId,
      url: `/catalog/subject/${id}`,
      method: 'GET'
    });

    return body;
  };

  return bindRequestToActions(fetchSubjectInfo, subjectInfo.actions);
};

export const getCatalogMethods = (params: TCatalogMethodsParams) => {
  return {
    fetchSubjectInfo: getSubjectInfoFetcher(params),
  };
};
