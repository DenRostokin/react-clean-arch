import { useCallback, useMemo } from 'react';

import { useEmitter } from 'utils/useEmitter';

import { useHttpTransport } from './transports';
import { TApiTransport, TApiServiceRegistry, TApiServiceRequestParams } from './types';

export const useApiService = (transport: TApiTransport) => {
  const emitter = useEmitter<TApiServiceRegistry>();

  // TODO add AbortController method to the ApiService

  const request = useCallback(async <R, P  extends TApiServiceRequestParams>(params: P) => {
    emitter.emit('requestInProgress', params);

    try {
      const response = await transport.connect<R, P>(params);

      emitter.emit('requestSuccessed', params, response);

      return response;
    } catch (error: any) {
      emitter.emit('requestFailure', params, error);

      throw error;
    }
  }, [emitter, transport]);

  return useMemo(() => ({
    request,
    ...emitter,
  }), [request, emitter]);
};

export type TApiService = ReturnType<typeof useApiService>;

export const useHttpService = (): TApiService => {
  const transport = useHttpTransport();

  return useApiService(transport);
};
