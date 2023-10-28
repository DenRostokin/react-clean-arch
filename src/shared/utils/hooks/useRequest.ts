import { useCallback, useState } from 'react';
import { ApiException } from 'shared/utils/exceptions';

// Typescript can't infer Array from Parameters of typing variable
// eslint-disable-next-line
type Fetcher<A extends any[], R> = (...arg: A) => Promise<R>;

export const useRequest = <T extends Fetcher<Parameters<T>, Awaited<ReturnType<T>>>>(fetcher: T) => {
  type TData = Required<Awaited<ReturnType<T>>>;

  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<ApiException | null>(null);

  const request = useCallback(async (...arg: Parameters<T>) => {
    try {
      setLoading(true);

      const response = await fetcher(...arg);

      setData(response || null);
      setError(null);
    } catch (externalError) {
      setError(externalError as ApiException);
    } finally {
      setInitialized(true);
      setLoading(false);
    }
  }, [fetcher]);

  const clearError = useCallback(() => setError(null), []);

  return {
    initialized, loading, data, error, request, clearError
  };
};
