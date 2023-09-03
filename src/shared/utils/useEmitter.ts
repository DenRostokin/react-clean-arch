import { useEffect, useMemo, createContext } from 'react';
import noop from 'lodash/noop';

import { useRegistry, useRegistryEmitter, useRegistrySubscriber, TRegistryType, TRegistrySubscriber } from './useRegistry';

const useRenderingSubscriptionHook = <R extends TRegistryType,>(subscribe: TRegistrySubscriber<R>) => {
  const useRenderingSubscription = (...args: Parameters<TRegistrySubscriber<R>>) => {
    const unsubscribe = useMemo(() => {
      return subscribe(...args);
    }, [...args]); // eslint-disable-line

    useEffect(() => unsubscribe, [unsubscribe]);
  };

  return useMemo(() => useRenderingSubscription, []); // eslint-disable-line
};

export const useEmitter = <R extends TRegistryType,>() => {
  const registry = useRegistry<R>();
  const subscribe = useRegistrySubscriber(registry);
  const emit = useRegistryEmitter(registry);
  const useRenderingSubscription = useRenderingSubscriptionHook(subscribe);

  return useMemo(() => ({
    subscribe,
    emit,
    useRenderingSubscription,
  }), [subscribe, emit, useRenderingSubscription]);
};

export type TEmitterType<R extends TRegistryType> = ReturnType<typeof useEmitter<R>>;

export const DEFAULT_EMITTER_CONTEXT = {
  subscribe: () => noop,
  useRenderingSubscription: noop,
  emit: noop,
};

export const createEmitterContext = <R extends TRegistryType>() => {
  return createContext<TEmitterType<R>>(DEFAULT_EMITTER_CONTEXT);
}