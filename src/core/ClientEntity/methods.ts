import { bindRequestToActions } from 'utils/bindRequestToActions';

import { TClientMethodsParams, TClientData } from './types';

const getClientListFetcher = ({ apiService, clientList }: TClientMethodsParams) => {
  const requestId = Symbol('fetchClientList');

  const clientListRequest = async () => {
    const { body } = await apiService.request<TClientData[]>({
      id: requestId,
      method: 'GET',
      url: '/client'
    });

    return body;
  };

  return bindRequestToActions(clientListRequest, clientList.actions);
};

export const getClientMethods = (params: TClientMethodsParams) => {
  return {
    fetchClientList: getClientListFetcher(params),
  };
};
