const noop = () => undefined;

export const DATA_FETCHING_INITIAL_STATE = {
  data: null,
  loading: false,
  initialized: false,
  error: null,
};

export const DEFAULT_DATA_FETCHING_ADAPTER = {
  getState: () => DATA_FETCHING_INITIAL_STATE,
  actions: {
    setState: noop,
    setData: noop,
    setLoading: noop,
    setInitialized: noop,
    setError: noop,
    cleanState: noop,
  },
  selectors: {
    useData: () => DATA_FETCHING_INITIAL_STATE.data,
    useFetchingFlags: () => ({
      loading: DATA_FETCHING_INITIAL_STATE.loading,
      initialized: DATA_FETCHING_INITIAL_STATE.initialized,
    }),
    useError: () => DATA_FETCHING_INITIAL_STATE.error,
  },
};
