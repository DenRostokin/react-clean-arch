import { useCallback, useMemo } from 'react';
import noop from 'lodash/noop';

import { ApiException } from 'exceptions';
import { TApiTransport, TApiServiceRequestParams } from 'core/ApiService';

import mock from './mock.json';

const wait = (ms: number) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(null);
  }, ms);
});

export const useMokingTransport = (): TApiTransport => {
  const connect = useCallback(async <R>({ url, method }: TApiServiceRequestParams) => {
    await wait(1000);

    const baseRequestDescriptor = {
      headers: {},
      subscribe: () => noop,
      emit: noop,
    };

    if (method === 'GET' && url === '/client') {
      return {
        ...baseRequestDescriptor,
        body: mock.clientList as R,
      };
    }

    throw new ApiException('Unknown url or method', {
      status: 404
    });
  }, []);

  return useMemo(() => ({
    connect,
  }), []); // eslint-disable-line
};
