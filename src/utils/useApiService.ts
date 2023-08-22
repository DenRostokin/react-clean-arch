import { createContext, useCallback } from 'react';

// TODO create useApiTransport which returns a transport (restTransport, grpcTransporn, websocketTransport, mokingTransport)

export const useApiService = () => {
  return useCallback(async () => {}, []);
};

const defaultApiService = async () => {};

export type TApiService = ReturnType<typeof useApiService>;

export const ApiServiceContext = createContext<TApiService>(defaultApiService);
