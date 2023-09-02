import { useCallback, useMemo } from 'react';

import { useEmitter } from 'shared/utils/useEmitter';
import { ApiException } from 'shared/exceptions';

import { useHttpTransport } from './transports';
import { TApiTransport, TApiServiceRegistry, TApiServiceRequestParams, TApiServiceBody } from './types';

export const useApiServiceCreator = (transport: TApiTransport) => {
  const emitter = useEmitter<TApiServiceRegistry>();

  // TODO add AbortController method to the ApiService

  const request = useCallback(async <R, B extends TApiServiceBody = TApiServiceBody>(params: TApiServiceRequestParams<B>) => {
    emitter.emit('requestInProgress', params);

    try {
      const response = await transport.connect<R, B>(params);

      emitter.emit('requestSuccessed', params, response);

      return response;
    } catch (error) {
      emitter.emit('requestFailure', params, error as ApiException);

      throw error;
    }
  }, [emitter, transport]);

  return useMemo(() => ({
    request,
    ...emitter,
  }), [request, emitter]);
};

export type TApiService = ReturnType<typeof useApiServiceCreator>;

export const useHttpServiceCreator = (): TApiService => {
  const transport = useHttpTransport();

  return useApiServiceCreator(transport);
};
