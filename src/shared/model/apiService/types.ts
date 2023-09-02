import { ApiException } from 'shared/exceptions';
import { TBaseHandler } from 'shared/types';

export type TApiServiceRequestMethods = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';

export type TApiServiceBody = Record<string, unknown>;

export type TApiServiceRequestParams<B extends TApiServiceBody = TApiServiceBody> = {
  /** A request identifier which is used for the request canceling */
  id: symbol;
  /** A request string with query parameters */
  url: string;
  /** A request method */
  method: TApiServiceRequestMethods;
  /** A request body which can be sent for all request methods except the "GET" one */
  body?: B;
  /** A dictionary of request headers */
  headers?: Record<string, string>;
}

export type TApiServiceResponse<R = any> = {
  body: R | null;
  headers: Record<string, any>;
}

export type TApiServiceRequestDescriptor<R> = TApiServiceResponse<R> & {
  subscribe: (arg0: string, arg1: TBaseHandler) => () => void;
  emit: (arg0: string, arg1: any) => void;
};

export type TApiTransportConnector = <R, B extends TApiServiceBody>(arg0: TApiServiceRequestParams<B>) => Promise<TApiServiceRequestDescriptor<R>>;

export type TApiTransport = {
  connect: TApiTransportConnector;
}

export type TApiServiceRegistry = {
  requestInProgress: (arg0: TApiServiceRequestParams) => void;
  requestSuccessed: (arg0: TApiServiceRequestParams, arg1: TApiServiceResponse) => void;
  requestFailure: (arg0: TApiServiceRequestParams, arg1: ApiException) => void;
}

type TMockingPayload = Map<{
  method: TApiServiceRequestMethods;
  url: string;
}, any>;

export type TMockingTransportParams = {
  waitingMs?: number;
  payload: TMockingPayload;
}
