import { FC } from 'react';

import { useHttpServiceCreator } from '../entity';
import { WebsocketServiceContext } from '../context';

export const withWebsocketService = <P extends Record<string, unknown>>(Component: FC<P>) => {
  const WebsocketServiceProvider: FC<P> = (props) => {
    const httpService = useHttpServiceCreator();

    return (
      <WebsocketServiceContext.Provider value={httpService}>
        <Component {...props} />
      </WebsocketServiceContext.Provider>
    );
  };

  return WebsocketServiceProvider;
};
