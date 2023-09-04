import { useCallback, useMemo } from 'react';
import axios from 'axios';
import noop from 'lodash/noop';

import { TApiTransport, TApiServiceRequestParams } from '../types';

// TODO describe httpTransport params
export const useHttpTransport = (): TApiTransport => {
  const axiosInstance = useMemo(() => {
    return axios.create({});
  }, []);

  const connect = useCallback(async <R, P extends TApiServiceRequestParams>(params: P) => {
    // TODO create AbortController

    // TODO wrap the code below to the try-catch block and add an api exceptions handling
    const response = await axiosInstance<R>({
      method: params.method,
      url: params.url,
      data: params.body,
      headers: params.headers,
    });

    return {
      body: response.data,
      headers: response.headers,
      subscribe: () => noop,
      emit: noop,
    };
  }, [axiosInstance]);

  return useMemo(() => ({
    connect
  }), [connect]);
};
