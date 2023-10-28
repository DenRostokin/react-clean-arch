import { useCallback, useMemo } from 'react';
import axios, { AxiosError, CanceledError } from 'axios';
import { useRegistry } from 'shared/utils/registry';
import { AbortException, ApiException } from 'shared/utils/exceptions';

import {
  TApiTransport,
  TApiServiceRequestParams,
  TApiServiceBody,
  THttpTransportParams,
} from '../types';

const noop = () => undefined;

export const useHttpTransport = (
  transportParams?: THttpTransportParams,
): TApiTransport => {
  const abortRegistry = useRegistry();
  const axiosInstance = useMemo(() => {
    return axios.create(transportParams);
  }, [transportParams]);

  const abort = useCallback(
    (id: symbol) => {
      const abortControllers = abortRegistry.get(id);

      if (abortControllers.length) {
        abortControllers.forEach((abort) => abort());

        abortRegistry.clear(id);
      }
    },
    [abortRegistry],
  );

  const connect = useCallback(
    async <R, B extends TApiServiceBody>({
      id,
      ...params
    }: TApiServiceRequestParams<B>) => {
      abort(id);

      const abortController = new AbortController();

      abortRegistry.add(id, abortController.abort.bind(abortController));

      try {
        const response = await axiosInstance<R>({
          method: params.method,
          url: params.url,
          data: params.body,
          headers: params.headers,
          signal: abortController.signal,
        });

        abortRegistry.clear(id);

        return {
          body: response.data,
          headers: response.headers,
          subscribe: () => noop,
          emit: noop,
        };
      } catch (error) {
        const axiosError = error as AxiosError;

        if (error instanceof CanceledError) {
          throw new AbortException();
        }

        abortRegistry.clear(id);

        throw new ApiException(axiosError.message, {
          status: axiosError.response?.status,
          data: axiosError.response?.data,
        });
      }
    },
    [axiosInstance, abort, abortRegistry],
  );

  return useMemo(
    () => ({
      connect,
      abort,
    }),
    [connect, abort],
  );
};
