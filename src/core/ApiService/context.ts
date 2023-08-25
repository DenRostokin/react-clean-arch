import { createContext } from 'react';
import noop from 'lodash/noop';

import { DEFAULT_EMITTER_CONTEXT } from 'utils/useEmitter';

import { TApiService } from './entity';

export const DEFAULT_API_SERVICE_REQUEST_DESCRIPTOR = {
  body: undefined,
  headers: {},
  subscribe: () => noop,
  emit: noop,
};

export const DEFAULT_API_SERVICE_CONTEXT = {
  ...DEFAULT_EMITTER_CONTEXT,
  request: async () => DEFAULT_API_SERVICE_REQUEST_DESCRIPTOR,
};

export const ApiServiceContext = createContext<TApiService>(DEFAULT_API_SERVICE_CONTEXT);

export const WebsocketServiceContext = createContext(ApiServiceContext);

export const GrpcServiceContext = createContext(ApiServiceContext);
