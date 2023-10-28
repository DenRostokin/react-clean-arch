import { useCallback, useMemo } from 'react';
import buildQuery from 'odata-query';

import {
  TApiTransport,
  TApiServiceRequestParams,
  TApiServiceBody,
  THttpTransportParams,
} from '../types';

import { useHttpTransport } from './httpTransport';

export const useODataTransport = (
  transportParams?: THttpTransportParams,
): TApiTransport => {
  const httpTransport = useHttpTransport(transportParams);

  const connect = useCallback(
    <R, B extends TApiServiceBody>(params: TApiServiceRequestParams<B>) => {
      const query = buildQuery(params.body);
      const body = params.method === 'GET' ? undefined : params.body;

      return httpTransport.connect<R, B>({
        ...params,
        url: `${params.url}${query}`,
        body,
      });
    },
    [httpTransport],
  );

  return useMemo(
    () => ({
      ...httpTransport,
      connect,
    }),
    [connect, httpTransport],
  );
};
