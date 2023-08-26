export type TApiServiceRequestMethods = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';

export type TApiServiceRequestParams<T extends Record<string, unknown> = Record<string, unknown>> = {
  /** A request identifier which is used for the request canceling */
  id: symbol;
  /** A request string with query parameters */
  url: string;
  /** A request method */
  method: TApiServiceRequestMethods;
  /** A request body which can be sent for all request methods except the "GET" one */
  body?: T;
  /** A dictionary of request headers */
  headers?: Record<string, string>;
}

export type TApiServiceResponse<R = any> = {
  body?: R;
  headers: Record<string, any>;
}

export type TApiServiceRequestDescriptor<R> = TApiServiceResponse<R> & {
  subscribe: (arg0: string, arg1: TBaseHandler) => () => void;
  emit: (arg0: string, arg1: any) => void;
};

export type TApiTransportConnector = <R, P extends TApiServiceRequestParams>(arg0: P) => Promise<TApiServiceRequestDescriptor<R>>;

export type TApiTransport = {
  connect: TApiTransportConnector;
}

export type TApiServiceRegistry = {
  requestInProgress: (arg0: TApiServiceRequestParams) => void;
  requestSuccessed: (arg0: TApiServiceRequestParams, arg1: TApiServiceResponse) => void;
  requestFailure: (arg0: TApiServiceRequestParams, arg1: Error) => void;
}
