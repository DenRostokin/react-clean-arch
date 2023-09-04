import { createContext, useContext } from 'react';
import noop from 'lodash/noop';

import { DEFAULT_EMITTER_CONTEXT } from 'shared/utils/useEmitter';

import { TApiService } from './entity';

export const API_SERVICE_REQUEST_DESCRIPTOR = {
  body: null,
  headers: {},
  subscribe: () => noop,
  emit: noop,
};

export const API_SERVICE_CONTEXT = {
  ...DEFAULT_EMITTER_CONTEXT,
  request: async () => API_SERVICE_REQUEST_DESCRIPTOR,
};

export const HttpServiceContext = createContext<TApiService>(API_SERVICE_CONTEXT);

export const useHttpService = () => {
  return useContext(HttpServiceContext);
};

export const WebsocketServiceContext = createContext<TApiService>(API_SERVICE_CONTEXT);

export const useWebsocketService = () => {
  return useContext(WebsocketServiceContext);
};

export const ODataServiceContext = createContext<TApiService>(API_SERVICE_CONTEXT);

export const useODataService = () => {
  return useContext(ODataServiceContext);
}
