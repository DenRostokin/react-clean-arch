import { FC } from 'react';

import { useODataServiceCreator } from '../entity';
import { ODataServiceContext } from '../context';
import { THttpTransportParams } from '../types';

export const createODataServiceProviderHOC =
  (params?: THttpTransportParams) =>
  <P extends Record<string, unknown>>(Component: FC<P>) => {
    const ODataServiceProvider: FC<P> = (props) => {
      const oDataService = useODataServiceCreator(params);

      return (
        <ODataServiceContext.Provider value={oDataService}>
          <Component {...props} />
        </ODataServiceContext.Provider>
      );
    };

    return ODataServiceProvider;
  };
