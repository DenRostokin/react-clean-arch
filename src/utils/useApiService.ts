import { createContext, useCallback } from 'react';

// TODO create useApiTransport which returns a transport (restTransport, grpcTransporn, websocketTransport, mokingTransport)

export const useApiService = () => {
  return useCallback(async () => {}, []);
};

const defaultApiService = async () => {};

export const ApiServiceContext = createContext<ReturnType<typeof useApiService>>(defaultApiService);

export type TApiService = () => Promise<{}>;
