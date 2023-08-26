import { TDataFetchingSelectors } from './types';

export const getDataFetchingSelectors = <D>(): TDataFetchingSelectors<D> => ({
  selectState: (state) => state,
  selectData: (state) => state.data,
  selectInitialized: (state) => state.initialized,
  selectLoading: (state) => state.loading,
  selectError: (state) => state.error
});
