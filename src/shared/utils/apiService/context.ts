import { createContext, useContext } from 'react';
import { DEFAULT_EMITTER_CONTEXT } from 'shared/utils/emitter';
/* the next dependencies are needed for the correct type declarations denerating. DO NOT REMOVE THEM! */
import { TRegistrySubscriber, TRegistryEmitter } from 'shared/utils/registry'; // eslint-disable-line
import { ApiException } from 'shared/utils/exceptions'; // eslint-disable-line
/* end of deps*/

import { TApiService } from './entity';

const noop = () => undefined;

export const API_SERVICE_REQUEST_DESCRIPTOR = {
  // Unable to cast null to a return type of request, which is generic type
  body: null as any,
  headers: {},
  subscribe: () => noop,
  emit: noop,
};

export const API_SERVICE_CONTEXT = {
  ...DEFAULT_EMITTER_CONTEXT,
  request: async () => API_SERVICE_REQUEST_DESCRIPTOR,
  abort: () => undefined,
};

export const HttpServiceContext =
  createContext<TApiService>(API_SERVICE_CONTEXT);

export const useHttpService = () => {
  return useContext(HttpServiceContext);
};

export const WebsocketServiceContext =
  createContext<TApiService>(API_SERVICE_CONTEXT);

export const useWebsocketService = () => {
  return useContext(WebsocketServiceContext);
};

export const ODataServiceContext =
  createContext<TApiService>(API_SERVICE_CONTEXT);

export const useODataService = () => {
  return useContext(ODataServiceContext);
};
