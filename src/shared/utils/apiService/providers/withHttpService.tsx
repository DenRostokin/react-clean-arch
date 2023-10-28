import { FC } from 'react';

import { useHttpServiceCreator } from '../entity';
import { HttpServiceContext } from '../context';
import { THttpTransportParams } from '../types';

export const createHttpServiceProviderHOC =
  (params?: THttpTransportParams) =>
  <P extends Record<string, unknown>>(Component: FC<P>) => {
    const HttpServiceProvider: FC<P> = (props) => {
      const httpService = useHttpServiceCreator(params);

      return (
        <HttpServiceContext.Provider value={httpService}>
          <Component {...props} />
        </HttpServiceContext.Provider>
      );
    };

    return HttpServiceProvider;
  };
