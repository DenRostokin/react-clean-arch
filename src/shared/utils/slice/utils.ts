import { useEffect, useRef } from 'react';

import { DeepPartial } from 'shared/utils/types';

import { TSlice } from './useLocalSlice';

export const useSliceUpdate = <D extends Record<string, unknown>>(slice: TSlice<D>, externalState?: DeepPartial<D>, deps: any[] = []) => {
  const isExternalStateUpdated = useRef(false);

  useEffect(() => {
    isExternalStateUpdated.current = true;

    return () => { isExternalStateUpdated.current = false };
  }, [externalState]);

  useEffect(() => {
    if (isExternalStateUpdated.current) {
      slice.actions.setState({
        ...slice.getState(),
        ...externalState,
      } as any);
    }
  }, deps); // eslint-disable-line
}
