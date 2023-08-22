import { useEffect, useMemo } from 'react';
import noop from 'lodash/noop';

import { useRegistry, useRegistryEmitter, useRegistrySubscriber, TRegistryType, TRegistrySubscriber } from './useRegistry';

const useRenderingSubscriberHook = <R extends TRegistryType,>(subscribe: TRegistrySubscriber<R>) => {
  const useRenderingSubscribe = (...args: Parameters<TRegistrySubscriber<R>>) => {
    const unsubscribe = useMemo(() => {
      return subscribe(...args);
    }, [...args]); // eslint-disable-line

    useEffect(() => unsubscribe, [unsubscribe]);
  };

  return useMemo(() => useRenderingSubscribe, []); // eslint-disable-line
};

export const useEntity = <R extends TRegistryType,>() => {
  const registry = useRegistry<R>();
  const subscribe = useRegistrySubscriber(registry);
  const emit = useRegistryEmitter(registry);
  const useRenderingSubscribe = useRenderingSubscriberHook(subscribe);

  return useMemo(() => ({
    subscribe,
    emit,
    useRenderingSubscribe,
  }), [subscribe, emit, useRenderingSubscribe]);
};

export type TEntityType<R extends TRegistryType> = ReturnType<typeof useEntity<R>>;

export const DEFAULT_ENTITY_CONTEXT = {
  subscribe: () => noop,
  useRenderingSubscribe: noop,
  emit: noop,
};
