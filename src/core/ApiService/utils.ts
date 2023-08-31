type TActions<R> = {
  setData: (arg0: R) => void;
  setLoading: (arg0: boolean) => void;
  setInitialized: (arg0: boolean) => void;
  setError: (arg0: Error | null) => void;
}

type TResponse<F> = F extends () => infer R ? Awaited<R> : never;
type TRequestParams<F> = F extends (arg0: infer P) => any ? P : never;

export const bindRequestToActions = <F extends TBaseHandler<Promise<any>>, R extends TResponse<F>, P extends TRequestParams<F>>(request: F, actions: TActions<R>) => {
  return async (params?: P) => {
    actions.setLoading(true);

    try {
      const response = await request(params);

      actions.setData(response);
      actions.setError(null);
    } catch (error) {
      actions.setError(error as Error);
    } finally {
      actions.setInitialized(true);
      actions.setLoading(false);
    }
  };
};
