import { useEffect, useRef } from 'react';

import { useFirstRender } from '../hooks';
import { DeepPartial } from 'shared/utils/types';

import { TSlice } from './useLocalSlice';

export const useSliceUpdate = <D extends Record<string, unknown>>(slice: TSlice<D>, externalState?: DeepPartial<D>, deps: any[] = []) => {
  const isFirstRender = useFirstRender();
  const isExternalStateUpdated = useRef(false);

  useEffect(() => {
    if (!isFirstRender.current) {
      isExternalStateUpdated.current = true;

      return () => { isExternalStateUpdated.current = false };
    }
  }, [externalState, isFirstRender]);

  useEffect(() => {
    if (!isFirstRender.current && isExternalStateUpdated.current) {
      slice.actions.setState({
        ...slice.getState(),
        ...externalState,
      } as any);
    }
  }, deps); // eslint-disable-line
}
