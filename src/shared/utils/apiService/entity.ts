import { useCallback, useMemo } from 'react';
import { useEmitter } from 'shared/utils/emitter';
import { ApiException } from 'shared/utils/exceptions';
// the next dependencies are needed for the correct type declarations denerating. DO NOT REMOVE THEM!
import { TRegistrySubscriber, TRegistryEmitter } from 'shared/utils/registry'; // eslint-disable-line

import { useHttpTransport, useODataTransport } from './transports';
import {
  TApiTransport,
  TApiServiceRegistry,
  TApiServiceRequestParams,
  TApiServiceBody,
  THttpTransportParams,
} from './types';

export const useApiServiceCreator = (transport: TApiTransport) => {
  const emitter = useEmitter<TApiServiceRegistry>();

  const request = useCallback(
    async <R, B extends TApiServiceBody = TApiServiceBody>(
      params: TApiServiceRequestParams<B>,
    ) => {
      emitter.emit('requestInProgress', params);

      try {
        const response = await transport.connect<R, B>(params);

        emitter.emit('requestSuccessed', params, response);

        return response;
      } catch (error) {
        emitter.emit('requestFailure', params, error as ApiException);

        throw error;
      }
    },
    [emitter, transport],
  );

  return useMemo(
    () => ({
      request,
      ...emitter,
      abort: transport.abort,
    }),
    [request, emitter, transport],
  );
};

export type TApiService = ReturnType<typeof useApiServiceCreator>;

export const useHttpServiceCreator = (
  params?: THttpTransportParams,
): TApiService => {
  const transport = useHttpTransport(params);

  return useApiServiceCreator(transport);
};

export const useODataServiceCreator = (
  params?: THttpTransportParams,
): TApiService => {
  const transport = useODataTransport(params);

  return useApiServiceCreator(transport);
};
