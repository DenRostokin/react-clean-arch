export type TApiServiceRequestMethods = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';

export type TApiServiceRequestParams<T extends Record<string, unknown> = Record<string, unknown>> = {
  id: symbol;
  url: string;
  method: TApiServiceRequestMethods;
  body?: T;
  headers?: Record<string, string>;
}

export type TApiServiceResponse<R = any> = {
  body?: R;
  headers: Record<string, any>;
}

export type TApiServiceRequestDescriptor<R> = TApiServiceResponse<R> & {
  subscribe: (arg0: string, arg1: Function) => () => void;
  emit: (arg0: string, arg1: any) => void;
};

export type TApiTransportConnector = <R>(arg0: TApiServiceRequestParams) => Promise<TApiServiceRequestDescriptor<R>>;

export type TApiTransport = {
  connect: TApiTransportConnector;
}

export type TApiServiceRegistry = {
  requestInProgress: (arg0: TApiServiceRequestParams) => void;
  requestSuccessed: (arg0: TApiServiceRequestParams, arg1: TApiServiceResponse) => void;
  requestFailure: (arg0: TApiServiceRequestParams, arg1: Error) => void;
}
