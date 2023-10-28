import { useCallback, useMemo } from 'react';
import { NotFoundException } from 'shared/utils/exceptions';

import {
  TApiTransport,
  TApiServiceRequestParams,
  TMockingTransportParams,
} from '../types';

const noop = () => undefined;

const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });

export const useMockingTransport = ({
  waitingMs = 0,
  payload,
}: TMockingTransportParams): TApiTransport => {
  const connect = useCallback(
    async <R>({ url, method }: TApiServiceRequestParams) => {
      if (waitingMs) {
        await wait(waitingMs);
      }

      const baseRequestDescriptor = {
        headers: {},
        subscribe: () => noop,
        emit: noop,
      };

      const body = Array.from(payload.entries()).find(
        ([{ method: mockingMethod, url: mockingUrl }]) => {
          if (mockingMethod === method && mockingUrl === url) {
            return true;
          }

          return false;
        },
      );

      if (!body) {
        throw new NotFoundException('Unknown url or method');
      }

      return {
        ...baseRequestDescriptor,
        body: body[1] as R,
      };
    },
    [waitingMs, payload],
  );

  return useMemo(
    () => ({
      connect,
      abort: () => undefined,
    }),
    [], // eslint-disable-line
  );
};
